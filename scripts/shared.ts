/**
 * Shared types, constants, and utility functions for the KOMMA traffic simulator.
 */
import { Page } from 'playwright';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CohortId = 'cohort_A' | 'cohort_B' | 'cohort_C' | 'cohort_D' | 'cohort_E';
export type CategorySlug = 'beauty' | 'fashion' | 'living' | 'food' | 'tech';

export interface SessionConfig {
  cohort: CohortId;
  sessionIndex: number;
  baseUrl: string;
  headless: boolean;
}

export interface PersonaRunner {
  (page: Page, config: SessionConfig): Promise<void>;
}

// ---------------------------------------------------------------------------
// Site data — mirrors src/data/products.ts (IDs only, enough for navigation)
// ---------------------------------------------------------------------------

export const CATEGORIES: CategorySlug[] = ['beauty', 'fashion', 'living', 'food', 'tech'];

/** Product IDs grouped by category */
export const PRODUCT_IDS: Record<CategorySlug, string[]> = {
  beauty:  ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'],
  fashion: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9'],
  living:  ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9'],
  food:    ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
  tech:    ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9'],
};

/** Sale items (have originalPrice) */
export const SALE_PRODUCT_IDS = ['b2', 'b5', 'b8', 'f2', 'f6', 'l2', 'l5', 'd2', 'd5', 'd8', 't2', 't5', 't8'];

/** New items (tagged 'new') */
export const NEW_PRODUCT_IDS = ['b4', 'b7', 'f4', 'f7', 'f9', 'l4', 'l9', 'd6', 'd9', 't3', 't7'];

/** Best items (tagged 'best') */
export const BEST_PRODUCT_IDS = ['b1', 'b3', 'b8', 'f1', 'f3', 'l1', 'l3', 'l8', 'd1', 'd2', 'd4', 'd8', 't1', 't4', 't8'];

/** Cheap items (price < 20000) */
export const CHEAP_PRODUCT_IDS = ['b4', 'b7', 'b8', 'b9', 'd2', 'd4', 'd5', 'd7', 'd9', 'l6'];

/** Expensive items (price >= 80000) */
export const EXPENSIVE_PRODUCT_IDS = ['f1', 'f2', 'f4', 't1', 't7', 't8', 'l2'];

// ---------------------------------------------------------------------------
// Random helpers
// ---------------------------------------------------------------------------

/** Returns a random integer in [min, max] inclusive */
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Pick a random element from an array */
export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Pick N unique random elements from an array */
export function pickRandomN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

/** Shuffle an array in place (Fisher-Yates) */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Realistic delay helpers
// ---------------------------------------------------------------------------

/** Human-like pause between actions */
export async function humanDelay(minMs = 500, maxMs = 2500): Promise<void> {
  const ms = randInt(minMs, maxMs);
  await new Promise(r => setTimeout(r, ms));
}

/** Short pause (e.g. between clicks in quick succession) */
export async function shortDelay(): Promise<void> {
  await humanDelay(1500, 3000);
}

/** Medium pause (reading a section, considering a product) */
export async function mediumDelay(): Promise<void> {
  await humanDelay(3000, 6000);
}

/** Long pause (reading reviews carefully, comparing products) */
export async function longDelay(): Promise<void> {
  await humanDelay(6000, 12000);
}

/** Log a bot action to console */
export function logAction(action: string): void {
  console.log(`    → ${action}`);
}

// ---------------------------------------------------------------------------
// Page interaction helpers
// ---------------------------------------------------------------------------

/** Navigate to a page under the basePath */
export async function navigateTo(page: Page, baseUrl: string, path: string): Promise<void> {
  const url = path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(500); // let Clarity script load
}

/** Scroll the page gradually to simulate human reading */
export async function gradualScroll(page: Page, scrollFraction = 1.0): Promise<void> {
  const totalHeight = await page.evaluate('document.body.scrollHeight');
  const viewportHeight = await page.evaluate('window.innerHeight');
  const targetScroll = totalHeight * scrollFraction;

  let currentScroll = 0;
  while (currentScroll < targetScroll) {
    const step = randInt(150, 400);
    currentScroll = Math.min(currentScroll + step, targetScroll);
    await page.evaluate(`window.scrollTo({ top: ${currentScroll}, behavior: 'smooth' })`);
    await page.waitForTimeout(randInt(100, 300));
  }
}

/** Scroll to a specific element to bring it into view */
export async function scrollToElement(page: Page, selector: string): Promise<void> {
  const el = page.locator(selector).first();
  if (await el.count() > 0) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(randInt(200, 500));
  }
}

/** Move mouse to an element and click it (more natural than direct click) */
export async function naturalClick(page: Page, selector: string): Promise<boolean> {
  try {
    const el = page.locator(selector).first();
    if (await el.count() === 0) return false;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(randInt(100, 300));
    await el.hover();
    await page.waitForTimeout(randInt(50, 200));
    await el.click();
    return true;
  } catch {
    return false;
  }
}

/** Type text with human-like delays between keystrokes */
export async function humanType(page: Page, selector: string, text: string): Promise<void> {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await el.click();
  for (const char of text) {
    await el.pressSequentially(char, { delay: randInt(30, 120) });
  }
}

/**
 * Initialize Clarity tags for this simulation session.
 * Sets data_source=simulation and cohort tag via page.evaluate.
 */
export async function initClarityTags(page: Page, cohort: CohortId): Promise<void> {
  await page.evaluate(`
    (function() {
      sessionStorage.setItem('komma_data_source', 'simulation');
      var trySet = function() {
        if (typeof window.clarity === 'function') {
          window.clarity('set', 'data_source', 'simulation');
          window.clarity('set', 'cohort', '${cohort}');
          return true;
        }
        return false;
      };
      if (!trySet()) {
        var attempts = 0;
        var iv = setInterval(function() {
          if (trySet() || ++attempts > 20) clearInterval(iv);
        }, 250);
      }
    })()
  `);
}

/**
 * Dismiss the welcome popup if it appears.
 */
export async function dismissPopup(page: Page): Promise<void> {
  try {
    // The popup shows after 2s on first visit. Wait briefly then check.
    await page.waitForTimeout(2500);
    const popup = page.locator('text=쿠폰 받기');
    if (await popup.isVisible({ timeout: 1000 })) {
      await popup.click();
      await page.waitForTimeout(300);
    }
  } catch {
    // Popup didn't appear — that's fine
  }
}

/** Close popup quickly (no waiting for the timer) */
export async function dismissPopupQuick(page: Page): Promise<void> {
  try {
    const overlay = page.locator('text=다음에 할게요');
    if (await overlay.isVisible({ timeout: 3000 })) {
      await overlay.click();
      await page.waitForTimeout(200);
    }
  } catch {
    // Popup didn't appear
  }
}

// ---------------------------------------------------------------------------
// Viewport / User Agent randomization
// ---------------------------------------------------------------------------

export interface ViewportConfig {
  width: number;
  height: number;
  isMobile: boolean;
  userAgent: string;
}

const DESKTOP_USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
];

const MOBILE_USER_AGENTS = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 15; SM-S926B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.135 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.103 Mobile/15E148 Safari/604.1',
];

/** Generate a random desktop viewport config */
export function randomDesktopViewport(): ViewportConfig {
  return {
    width: randInt(1280, 1920),
    height: randInt(720, 1080),
    isMobile: false,
    userAgent: pickRandom(DESKTOP_USER_AGENTS),
  };
}

/** Generate a random mobile viewport config */
export function randomMobileViewport(): ViewportConfig {
  return {
    width: randInt(375, 428),
    height: randInt(667, 926),
    isMobile: true,
    userAgent: pickRandom(MOBILE_USER_AGENTS),
  };
}

/** Generate viewport config — 30% chance of mobile */
export function randomViewport(forceMobile = false): ViewportConfig {
  if (forceMobile || Math.random() < 0.3) {
    return randomMobileViewport();
  }
  return randomDesktopViewport();
}
