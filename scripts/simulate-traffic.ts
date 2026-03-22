/**
 * KOMMA E-commerce Traffic Simulator
 *
 * Orchestrates Playwright browser sessions to simulate 5 customer personas
 * browsing the KOMMA e-commerce site. Generates realistic behavioral data
 * for Microsoft Clarity analysis.
 *
 * Usage:
 *   npx tsx simulate-traffic.ts
 *
 * Environment Variables:
 *   BASE_URL        - Site URL (default: https://workshop.gonnector.com/ecommerce)
 *   TOTAL_SESSIONS  - Number of sessions to run (default: 100)
 *   HEADLESS        - Run headless (default: true)
 *   CONCURRENCY     - Max parallel browser sessions (default: 3)
 */

import { chromium, Browser, BrowserContext } from 'playwright';
import {
  CohortId, SessionConfig, PersonaRunner,
  randomViewport, shuffle, randInt,
} from './shared';

import runCohortA from './personas/cohort-a-deal-hunter';
import runCohortB from './personas/cohort-b-researcher';
import runCohortC from './personas/cohort-c-trend-follower';
import runCohortD from './personas/cohort-d-loyal-buyer';
import runCohortE from './personas/cohort-e-window-shopper';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const BASE_URL = process.env.BASE_URL || 'https://workshop.gonnector.com/ecommerce';
const TOTAL_SESSIONS = parseInt(process.env.TOTAL_SESSIONS || '100', 10);
const HEADLESS = (process.env.HEADLESS ?? 'true') !== 'false';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '3', 10);
const FORCE_COHORT = process.env.COHORT || ''; // e.g. 'cohort_A' to run only that cohort

/** Cohort distribution — percentages must sum to 1.0 */
const COHORT_DISTRIBUTION: { cohort: CohortId; pct: number; runner: PersonaRunner; label: string }[] = [
  { cohort: 'cohort_A', pct: 0.25, runner: runCohortA, label: '가성비 헌터 (Deal Hunter)' },
  { cohort: 'cohort_B', pct: 0.20, runner: runCohortB, label: '신중한 연구자 (Researcher)' },
  { cohort: 'cohort_C', pct: 0.20, runner: runCohortC, label: '트렌드 팔로워 (Trend Follower)' },
  { cohort: 'cohort_D', pct: 0.15, runner: runCohortD, label: '충성 고객 (Loyal Buyer)' },
  { cohort: 'cohort_E', pct: 0.20, runner: runCohortE, label: '윈도우 쇼퍼 (Window Shopper)' },
];

// ---------------------------------------------------------------------------
// Session list builder
// ---------------------------------------------------------------------------

interface SessionPlan {
  cohort: CohortId;
  runner: PersonaRunner;
  label: string;
  index: number;
}

function buildSessionPlan(total: number): SessionPlan[] {
  const sessions: SessionPlan[] = [];
  let remaining = total;

  for (let i = 0; i < COHORT_DISTRIBUTION.length; i++) {
    const { cohort, pct, runner, label } = COHORT_DISTRIBUTION[i];
    // Last cohort gets whatever is remaining (avoids rounding errors)
    const count = i === COHORT_DISTRIBUTION.length - 1
      ? remaining
      : Math.round(total * pct);

    for (let j = 0; j < count; j++) {
      sessions.push({ cohort, runner, label, index: sessions.length });
    }
    remaining -= count;
  }

  // Shuffle so cohorts are interleaved (more realistic)
  return shuffle(sessions);
}

// ---------------------------------------------------------------------------
// Single session executor
// ---------------------------------------------------------------------------

async function runSession(browser: Browser, plan: SessionPlan): Promise<{ ok: boolean; error?: string }> {
  const forceMobile = plan.cohort === 'cohort_C' && Math.random() < 0.5;
  const viewport = randomViewport(forceMobile);
  const device = viewport.isMobile ? '📱 모바일' : '🖥️  데스크톱';
  console.log(`    디바이스: ${device} (${viewport.width}x${viewport.height})`);

  let context: BrowserContext | null = null;

  try {
    context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      userAgent: viewport.userAgent,
      isMobile: viewport.isMobile,
      hasTouch: viewport.isMobile,
      locale: 'ko-KR',
      timezoneId: 'Asia/Seoul',
    });

    const page = await context.newPage();

    // Set a reasonable default timeout
    page.setDefaultTimeout(15000);

    const config: SessionConfig = {
      cohort: plan.cohort,
      sessionIndex: plan.index,
      baseUrl: BASE_URL,
      headless: HEADLESS,
    };

    // Run the persona
    await plan.runner(page, config);

    // Small delay before closing to let Clarity flush data
    await page.waitForTimeout(randInt(1000, 2000));

    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  } finally {
    if (context) {
      try { await context.close(); } catch { /* ok */ }
    }
  }
}

// ---------------------------------------------------------------------------
// Concurrency limiter
// ---------------------------------------------------------------------------

async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  maxConcurrency: number,
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const idx = nextIndex++;
      results[idx] = await tasks[idx]();
    }
  }

  const workers = Array.from({ length: Math.min(maxConcurrency, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('');
  console.log('='.repeat(60));
  console.log('  KOMMA Traffic Simulator');
  console.log('='.repeat(60));
  console.log(`  Base URL:       ${BASE_URL}`);
  console.log(`  Total sessions: ${TOTAL_SESSIONS}`);
  console.log(`  Headless:       ${HEADLESS}`);
  console.log(`  Concurrency:    ${CONCURRENCY}`);
  console.log('');

  if (FORCE_COHORT) {
    console.log(`  강제 코호트:    ${FORCE_COHORT}`);
  }
  console.log('');

  // Build plan — filter to forced cohort if specified
  let plan = buildSessionPlan(TOTAL_SESSIONS);
  if (FORCE_COHORT) {
    const forced = COHORT_DISTRIBUTION.find(c => c.cohort === FORCE_COHORT);
    if (forced) {
      plan = Array.from({ length: TOTAL_SESSIONS }, () => ({
        cohort: forced.cohort,
        runner: forced.runner,
        label: forced.label,
      }));
    }
  }
  const counts: Record<string, number> = {};
  for (const s of plan) {
    counts[s.cohort] = (counts[s.cohort] || 0) + 1;
  }
  console.log('  Session distribution:');
  for (const { cohort, label } of COHORT_DISTRIBUTION) {
    console.log(`    ${cohort} (${label}): ${counts[cohort] || 0} sessions`);
  }
  console.log('');
  console.log('-'.repeat(60));

  // Launch browser
  const browser = await chromium.launch({
    headless: HEADLESS,
    args: [
      '--disable-blink-features=AutomationControlled', // reduce bot detection
    ],
  });

  const startTime = Date.now();
  let completed = 0;
  let succeeded = 0;
  let failed = 0;

  const tasks = plan.map((session) => async () => {
    const sessionNum = ++completed;
    const tag = `[${sessionNum}/${TOTAL_SESSIONS}]`;

    console.log(`\n${tag} ========================================`);
    console.log(`${tag} 페르소나: ${session.label} (${session.cohort})`);
    console.log(`${tag} ========================================`);

    const result = await runSession(browser, session);

    if (result.ok) {
      succeeded++;
      console.log(`${tag} ✓ 완료 — ${session.label}`);
    } else {
      failed++;
      console.log(`${tag} FAIL — ${session.cohort}: ${result.error}`);
    }

    // Random pause between sessions (0.5-2s) to avoid overwhelming the server
    await new Promise(r => setTimeout(r, randInt(500, 2000)));

    return result;
  });

  await runWithConcurrency(tasks, CONCURRENCY);

  await browser.close();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('');
  console.log('='.repeat(60));
  console.log('  Simulation Complete');
  console.log('='.repeat(60));
  console.log(`  Total:     ${TOTAL_SESSIONS}`);
  console.log(`  Succeeded: ${succeeded}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Duration:  ${elapsed}s`);
  console.log('='.repeat(60));
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
