/**
 * Cohort D — "충성 고객" (Loyal Buyer)
 *
 * Behavior: Goes directly to specific products (knows what they want),
 *           quick checkout, skips reviews.
 * Session:  Short (30-60s), few page views, direct path.
 * Focus:    All categories
 * Cart:     High value
 * Conversion: Very high
 */
import { Page } from 'playwright';
import {
  SessionConfig, PersonaRunner,
  PRODUCT_IDS, BEST_PRODUCT_IDS, CATEGORIES,
  pickRandom, randInt,
  navigateTo, initClarityTags, dismissPopupQuick,
  humanDelay, shortDelay,
  gradualScroll, naturalClick,
  CategorySlug,
} from '../shared';

const runCohortD: PersonaRunner = async (page: Page, config: SessionConfig) => {
  const { baseUrl, cohort } = config;

  // --- Entry: goes directly to a product they already know ---
  // Loyal buyers have a mental list; they go straight to what they want.
  const entryChoice = Math.random();

  // Pick 1-2 products from any category (loyal buyers span all categories)
  const category = pickRandom(CATEGORIES);
  const catProducts = PRODUCT_IDS[category];
  // Prefer best-sellers (items they've bought before and trust)
  const bestInCat = catProducts.filter(id => BEST_PRODUCT_IDS.includes(id));
  const targetProduct = bestInCat.length > 0 ? pickRandom(bestInCat) : pickRandom(catProducts);

  if (entryChoice < 0.6) {
    // Direct to product page (bookmark / recent purchase behavior)
    await navigateTo(page, baseUrl, `/product/${targetProduct}`);
    await initClarityTags(page, cohort);
    await dismissPopupQuick(page);
  } else if (entryChoice < 0.85) {
    // Via home, but quickly navigate to product
    await navigateTo(page, baseUrl, '/');
    await initClarityTags(page, cohort);
    await dismissPopupQuick(page);
    await shortDelay();
    await navigateTo(page, baseUrl, `/product/${targetProduct}`);
  } else {
    // Via category page, but don't filter — they know what to find
    await navigateTo(page, baseUrl, `/category/${category}`);
    await initClarityTags(page, cohort);
    await dismissPopupQuick(page);
    await shortDelay();
    // Quick scroll and click into the product
    await gradualScroll(page, 0.3);
    await shortDelay();
    await navigateTo(page, baseUrl, `/product/${targetProduct}`);
  }

  await shortDelay();

  // --- Product page: minimal browsing, straight to add-to-cart ---
  // Loyal buyers don't read reviews or compare — they know the product

  // Select options quickly if available
  const colorBtns = page.locator('label:has-text("색상") ~ div button');
  if (await colorBtns.count() > 1) {
    // They have a preferred color — pick consistently
    try { await colorBtns.first().click(); } catch { /* ok */ }
    await shortDelay();
  }

  const sizeBtns = page.locator('label:has-text("사이즈") ~ div button');
  if (await sizeBtns.count() > 1) {
    // Pick their usual size
    try { await sizeBtns.nth(Math.min(1, (await sizeBtns.count()) - 1)).click(); } catch { /* ok */ }
    await shortDelay();
  }

  // Possibly increase quantity (loyal buyers sometimes bulk-buy)
  if (Math.random() < 0.3) {
    const plusBtn = page.locator('button:has-text("+")').first();
    if (await plusBtn.isVisible({ timeout: 500 })) {
      const clicks = randInt(1, 2);
      for (let i = 0; i < clicks; i++) {
        await plusBtn.click();
        await page.waitForTimeout(200);
      }
    }
  }

  // Add to cart
  await naturalClick(page, 'button:has-text("장바구니 담기")');
  await shortDelay();

  // --- Maybe add one more product (30% chance — replenishment) ---
  if (Math.random() < 0.30) {
    const secondCategory = pickRandom(CATEGORIES);
    const secondProducts = PRODUCT_IDS[secondCategory];
    const secondBest = secondProducts.filter(id => BEST_PRODUCT_IDS.includes(id));
    const secondProduct = secondBest.length > 0 ? pickRandom(secondBest) : pickRandom(secondProducts);

    await navigateTo(page, baseUrl, `/product/${secondProduct}`);
    await shortDelay();
    await naturalClick(page, 'button:has-text("장바구니 담기")');
    await shortDelay();
  }

  // --- Cart → Checkout (very high conversion: ~90%) ---
  if (Math.random() < 0.90) {
    // Sometimes use "바로 구매" instead of going through cart
    if (Math.random() < 0.4) {
      // "Buy Now" button on product page — already navigated to checkout
      // If we just came from adding to cart, go to cart first
      await navigateTo(page, baseUrl, '/cart');
      await shortDelay();
      await naturalClick(page, 'button:has-text("주문하기")');
    } else {
      await navigateTo(page, baseUrl, '/cart');
      await shortDelay();
      await naturalClick(page, 'button:has-text("주문하기")');
    }

    await page.waitForLoadState('domcontentloaded');
    await shortDelay();

    // Fill checkout form quickly — loyal buyers have their info memorized
    await fillCheckoutForm(page);

    // Select payment method (loyal buyers have a preferred method)
    if (Math.random() < 0.5) {
      await naturalClick(page, 'button:has-text("간편결제")');
    }
    await shortDelay();

    // Complete purchase
    await naturalClick(page, 'button:has-text("결제하기")');
    await page.waitForLoadState('domcontentloaded');
    await humanDelay(500, 1000);
  }
};

async function fillCheckoutForm(page: Page): Promise<void> {
  // Loyal buyers always use the same info
  const names = ['고영혁', '김태희', '이상현', '박은정', '최재원'];
  const addresses = ['서울특별시 강남구 삼성동 123-45', '서울특별시 서초구 반포동 67-8', '경기도 과천시 별양동 99'];
  const phones = ['010-8888-1234', '010-5678-9012', '010-1357-2468'];
  const zipcodes = ['06158', '06578', '13820'];

  try {
    await page.locator('input[name="name"]').fill(pickRandom(names));
    await page.locator('input[name="phone"]').fill(pickRandom(phones));
    await page.locator('input[name="zipcode"]').fill(pickRandom(zipcodes));
    await page.locator('input[name="address"]').fill(pickRandom(addresses));

    // Delivery memo — loyal buyers always set their preference
    await page.locator('select[name="memo"]').selectOption('door');
  } catch { /* form fields might not be available */ }
}

export default runCohortD;
