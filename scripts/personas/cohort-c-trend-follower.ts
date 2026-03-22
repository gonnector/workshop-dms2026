/**
 * Cohort C — "트렌드 팔로워" (Trend Follower)
 *
 * Behavior: Clicks banners, browses new/trending items, shares products.
 * Session:  Medium (1-2 min), moderate page views, often mobile viewport.
 * Focus:    fashion, beauty
 * Conversion: Medium
 */
import { Page } from 'playwright';
import {
  SessionConfig, PersonaRunner,
  PRODUCT_IDS, NEW_PRODUCT_IDS, BEST_PRODUCT_IDS,
  pickRandom, pickRandomN, randInt,
  navigateTo, initClarityTags, dismissPopup,
  humanDelay, shortDelay, mediumDelay,
  gradualScroll, naturalClick,
  CategorySlug,
} from '../shared';

const PREFERRED_CATEGORIES: CategorySlug[] = ['fashion', 'beauty'];

const runCohortC: PersonaRunner = async (page: Page, config: SessionConfig) => {
  const { baseUrl, cohort } = config;

  // --- Entry: via home page (attracted by banners) ---
  await navigateTo(page, baseUrl, '/');
  await initClarityTags(page, cohort);
  await dismissPopup(page);
  await mediumDelay();

  // Click a banner dot or the main banner CTA (trend followers interact with banners)
  const bannerChoice = Math.random();
  if (bannerChoice < 0.4) {
    // Click banner CTA button
    const ctaClicked = await naturalClick(page, 'section a.btn-primary');
    if (ctaClicked) {
      await page.waitForLoadState('domcontentloaded');
      await shortDelay();
    }
  } else if (bannerChoice < 0.7) {
    // Click a banner dot to browse banners
    const dots = page.locator('section button.rounded-full');
    const dotCount = await dots.count();
    if (dotCount > 1) {
      await dots.nth(randInt(1, dotCount - 1)).click();
      await mediumDelay();
      // Then click the CTA
      await naturalClick(page, 'section a.btn-primary');
      await page.waitForLoadState('domcontentloaded');
      await shortDelay();
    }
  }

  // Scroll through homepage — look at trending/new sections
  await gradualScroll(page, 0.5);
  await shortDelay();

  // Navigate to a preferred category or continue browsing
  const cat = pickRandom(PREFERRED_CATEGORIES);

  // Sometimes enter category via homepage category grid, sometimes direct
  if (Math.random() < 0.6) {
    const catLink = page.locator(`a[href="/ecommerce/category/${cat}"]`).first();
    if (await catLink.isVisible({ timeout: 2000 })) {
      await catLink.click();
      await page.waitForLoadState('domcontentloaded');
    } else {
      await navigateTo(page, baseUrl, `/category/${cat}`);
    }
  } else {
    await navigateTo(page, baseUrl, `/category/${cat}`);
  }
  await shortDelay();

  // Apply "NEW" filter (trend followers love new items)
  await naturalClick(page, 'button:has-text("NEW")');
  await shortDelay();

  // Sort by newest
  try {
    await page.locator('select').selectOption('newest');
    await shortDelay();
  } catch { /* ok */ }

  // Scroll through results
  await gradualScroll(page, 0.6);
  await mediumDelay();

  // --- Browse 2-3 trending/new products ---
  const catProducts = PRODUCT_IDS[cat];
  const newInCat = catProducts.filter(id => NEW_PRODUCT_IDS.includes(id) || BEST_PRODUCT_IDS.includes(id));
  const browselist = newInCat.length >= 2 ? pickRandomN(newInCat, randInt(2, 3)) : pickRandomN(catProducts, randInt(2, 3));

  for (const productId of browselist) {
    await navigateTo(page, baseUrl, `/product/${productId}`);
    await shortDelay();

    // Scroll moderately — trend followers scan visually, don't deep read
    await gradualScroll(page, 0.5);
    await mediumDelay();

    // Share product (trend followers love sharing)
    if (Math.random() < 0.5) {
      // The share button exists on order-complete page; on product page,
      // we look for any share-related element or just add to wishlist as social signal
      const shareBtn = page.locator('button:has-text("공유")');
      if (await shareBtn.isVisible({ timeout: 500 })) {
        await shareBtn.click();
        await shortDelay();
      }
    }

    // Add to wishlist as a trend-following behavior
    if (Math.random() < 0.6) {
      const wishlistBtn = page.locator('button svg path[d*="4.318 6.318"]').locator('..');
      if (await wishlistBtn.count() > 0) {
        try {
          await wishlistBtn.first().click();
          await shortDelay();
        } catch { /* ok */ }
      }
    }

    await shortDelay();
  }

  // --- Sometimes browse a second category ---
  if (Math.random() < 0.4) {
    const secondCat = PREFERRED_CATEGORIES.find(c => c !== cat) || 'living';
    await navigateTo(page, baseUrl, `/category/${secondCat}`);
    await shortDelay();
    await naturalClick(page, 'button:has-text("NEW")');
    await shortDelay();
    await gradualScroll(page, 0.4);
    await shortDelay();

    // Quick look at one product
    const secondProducts = PRODUCT_IDS[secondCat as CategorySlug];
    const peekId = pickRandom(secondProducts);
    await navigateTo(page, baseUrl, `/product/${peekId}`);
    await mediumDelay();
    await gradualScroll(page, 0.4);
  }

  // --- Conversion (medium: ~40%) ---
  if (Math.random() < 0.40) {
    // Go back to a liked product and buy
    const buyId = pickRandom(browselist);
    await navigateTo(page, baseUrl, `/product/${buyId}`);
    await shortDelay();

    // Select options if present
    const colorBtns = page.locator('label:has-text("색상") ~ div button');
    if (await colorBtns.count() > 1) {
      const idx = randInt(0, (await colorBtns.count()) - 1);
      try { await colorBtns.nth(idx).click(); } catch { /* ok */ }
      await shortDelay();
    }

    // Add to cart
    await naturalClick(page, 'button:has-text("장바구니 담기")');
    await shortDelay();

    // Go to cart and checkout
    await navigateTo(page, baseUrl, '/cart');
    await shortDelay();
    await naturalClick(page, 'button:has-text("주문하기")');
    await page.waitForLoadState('domcontentloaded');
    await shortDelay();

    // Fill form
    await fillCheckoutForm(page);
    await naturalClick(page, 'button:has-text("결제하기")');
    await page.waitForLoadState('domcontentloaded');
    await shortDelay();

    // On order complete page, click share
    const shareBtn = page.locator('button:has-text("공유하기")');
    if (await shareBtn.isVisible({ timeout: 2000 })) {
      await shareBtn.click();
      await shortDelay();
    }
  }
};

async function fillCheckoutForm(page: Page): Promise<void> {
  const names = ['김예린', '이하늘', '장서윤', '오지호', '백다은'];
  const addresses = ['서울특별시 강남구 청담동', '서울특별시 성동구 성수동', '서울특별시 용산구 이태원동'];
  const phones = ['010-1111-2222', '010-3333-8888', '010-7777-9999'];
  const zipcodes = ['06075', '04773', '04340'];

  try {
    await page.locator('input[name="name"]').fill(pickRandom(names));
    await page.locator('input[name="phone"]').fill(pickRandom(phones));
    await page.locator('input[name="zipcode"]').fill(pickRandom(zipcodes));
    await page.locator('input[name="address"]').fill(pickRandom(addresses));
  } catch { /* form fields might not be available */ }
}

export default runCohortC;
