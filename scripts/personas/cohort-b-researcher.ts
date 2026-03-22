/**
 * Cohort B — "신중한 연구자" (Researcher)
 *
 * Behavior: Reads reviews carefully, checks all product tabs, compares
 *           multiple products, adds to wishlist.
 * Session:  Long (3-5 min), many page views, deep scrolling.
 * Focus:    tech, beauty (expensive items)
 * Cart:     High (when they buy)
 * Conversion: Medium (after much deliberation)
 */
import { Page } from 'playwright';
import {
  SessionConfig, PersonaRunner,
  PRODUCT_IDS, BEST_PRODUCT_IDS,
  pickRandom, pickRandomN, randInt,
  navigateTo, initClarityTags, dismissPopup,
  humanDelay, shortDelay, mediumDelay, longDelay,
  gradualScroll, scrollToElement, naturalClick,
  CategorySlug,
} from '../shared';

const PREFERRED_CATEGORIES: CategorySlug[] = ['tech', 'beauty'];

const runCohortB: PersonaRunner = async (page: Page, config: SessionConfig) => {
  const { baseUrl, cohort } = config;

  // --- Entry: usually via home, then browse into a category ---
  await navigateTo(page, baseUrl, '/');
  await initClarityTags(page, cohort);
  await dismissPopup(page);
  await mediumDelay();

  // Browse homepage — scroll through featured products
  await gradualScroll(page, 0.7);
  await mediumDelay();

  // Go to a preferred category
  const mainCategory = pickRandom(PREFERRED_CATEGORIES);
  await navigateTo(page, baseUrl, `/category/${mainCategory}`);
  await mediumDelay();

  // Use rating sort
  try {
    await page.locator('select').selectOption('rating');
    await shortDelay();
  } catch { /* select might not be visible */ }

  // Use price filter for expensive items
  if (Math.random() < 0.5) {
    await naturalClick(page, 'button:has-text("5~10만원")');
    await shortDelay();
  }

  // Scroll through the category results
  await gradualScroll(page, 0.8);
  await mediumDelay();

  // --- Deep-dive into multiple products (the researcher pattern) ---
  const categoryProducts = PRODUCT_IDS[mainCategory];
  const productsToCompare = pickRandomN(categoryProducts, randInt(3, 5));

  for (let i = 0; i < productsToCompare.length; i++) {
    const productId = productsToCompare[i];
    await navigateTo(page, baseUrl, `/product/${productId}`);
    await shortDelay();

    // 1) Read product info — scroll through the top section
    await gradualScroll(page, 0.4);
    await mediumDelay();

    // 2) Click reviews tab — this is the key researcher behavior
    const reviewTabClicked = await naturalClick(page, 'button:has-text("리뷰")');
    if (reviewTabClicked) {
      await mediumDelay();

      // Scroll through reviews section
      await gradualScroll(page, 0.8);
      await longDelay(); // reading reviews carefully

      // Click "도움돼요" on a review (if available)
      const helpfulButtons = page.locator('button:has-text("도움돼요")');
      const count = await helpfulButtons.count();
      if (count > 0) {
        const idx = randInt(0, Math.min(count - 1, 2));
        try {
          await helpfulButtons.nth(idx).scrollIntoViewIfNeeded();
          await helpfulButtons.nth(idx).click();
          await shortDelay();
        } catch { /* button might not be interactable */ }
      }

      // Read more reviews — scroll more
      if (count > 2) {
        await gradualScroll(page, 1.0);
        await longDelay();
      }
    }

    // 3) Check description tab
    await naturalClick(page, 'button:has-text("상품 설명")');
    await mediumDelay();
    await gradualScroll(page, 0.5);
    await shortDelay();

    // 4) Check Q&A tab
    if (Math.random() < 0.4) {
      await naturalClick(page, 'button:has-text("Q&A")');
      await shortDelay();
    }

    // 5) Add to wishlist (researchers save for later comparison)
    if (Math.random() < 0.7) {
      // Click the heart icon (wishlist button on product page)
      const wishlistBtn = page.locator('button svg path[d*="4.318 6.318"]').locator('..');
      if (await wishlistBtn.count() > 0) {
        try {
          await wishlistBtn.first().click();
          await shortDelay();
        } catch { /* wishlist button interaction failed */ }
      }
    }

    // 6) Scroll to related products section
    await scrollToElement(page, 'text=관련 상품');
    await mediumDelay();

    // Pause longer between product comparisons (researcher thinking time)
    if (i < productsToCompare.length - 1) {
      await longDelay();
    }
  }

  // --- Sometimes go back to compare (back-and-forth behavior) ---
  if (productsToCompare.length >= 3 && Math.random() < 0.6) {
    // Go back to an earlier product for re-evaluation
    const revisitId = productsToCompare[0];
    await navigateTo(page, baseUrl, `/product/${revisitId}`);
    await mediumDelay();

    // Re-read reviews
    await naturalClick(page, 'button:has-text("리뷰")');
    await longDelay();
    await gradualScroll(page, 0.6);
    await mediumDelay();
  }

  // --- Maybe also explore a second category ---
  if (Math.random() < 0.4) {
    const secondCategory = PREFERRED_CATEGORIES.find(c => c !== mainCategory) || 'living';
    await navigateTo(page, baseUrl, `/category/${secondCategory}`);
    await mediumDelay();
    await gradualScroll(page, 0.5);

    // Quick look at one product
    const secondCatProducts = PRODUCT_IDS[secondCategory as CategorySlug];
    const peekProduct = pickRandom(secondCatProducts);
    await navigateTo(page, baseUrl, `/product/${peekProduct}`);
    await mediumDelay();

    // Read reviews here too
    await naturalClick(page, 'button:has-text("리뷰")');
    await longDelay();
  }

  // --- Decision phase: sometimes adds to cart and purchases ---
  if (Math.random() < 0.45) {
    // Go back to a favored product
    const favoredProduct = pickRandom(productsToCompare);
    await navigateTo(page, baseUrl, `/product/${favoredProduct}`);
    await shortDelay();

    // Select options if available
    const colorBtns = page.locator('label:has-text("색상") ~ div button');
    if (await colorBtns.count() > 1) {
      const idx = randInt(0, (await colorBtns.count()) - 1);
      try { await colorBtns.nth(idx).click(); } catch { /* ok */ }
      await shortDelay();
    }
    const sizeBtns = page.locator('label:has-text("사이즈") ~ div button');
    if (await sizeBtns.count() > 1) {
      const idx = randInt(0, (await sizeBtns.count()) - 1);
      try { await sizeBtns.nth(idx).click(); } catch { /* ok */ }
      await shortDelay();
    }

    // Add to cart
    await naturalClick(page, 'button:has-text("장바구니 담기")');
    await mediumDelay();

    // Go to cart
    await navigateTo(page, baseUrl, '/cart');
    await mediumDelay();

    // 50% of the time, actually check out
    if (Math.random() < 0.5) {
      await naturalClick(page, 'button:has-text("주문하기")');
      await page.waitForLoadState('domcontentloaded');
      await mediumDelay();

      // Fill form
      await fillCheckoutForm(page);
      await shortDelay();

      await naturalClick(page, 'button:has-text("결제하기")');
      await page.waitForLoadState('domcontentloaded');
      await shortDelay();
    }
  }
};

async function fillCheckoutForm(page: Page): Promise<void> {
  const names = ['김서현', '이준혁', '박소연', '정도윤', '한지민'];
  const addresses = ['서울특별시 서초구 방배동', '서울특별시 송파구 잠실동', '경기도 용인시 수지구'];
  const phones = ['010-2222-3333', '010-4444-5555', '010-6666-7777'];
  const zipcodes = ['06571', '05510', '16890'];

  try {
    await page.locator('input[name="name"]').fill(pickRandom(names));
    await page.locator('input[name="phone"]').fill(pickRandom(phones));
    await page.locator('input[name="zipcode"]').fill(pickRandom(zipcodes));
    await page.locator('input[name="address"]').fill(pickRandom(addresses));
  } catch { /* form fields might not be available */ }
}

export default runCohortB;
