/**
 * Cohort E — "윈도우 쇼퍼" (Window Shopper)
 *
 * Behavior: Browses many products, adds to wishlist, adds to cart then removes,
 *           never completes purchase.
 * Session:  Long (2-4 min), high page views, high scroll depth.
 * Focus:    fashion, living
 * Conversion: Very low (almost never buys)
 */
import { Page } from 'playwright';
import {
  SessionConfig, PersonaRunner,
  PRODUCT_IDS, CATEGORIES,
  pickRandom, pickRandomN, randInt,
  navigateTo, initClarityTags, dismissPopup,
  shortDelay, mediumDelay, longDelay,
  gradualScroll, scrollToElement, naturalClick, humanType,
  logAction, CategorySlug,
} from '../shared';

const PREFERRED_CATEGORIES: CategorySlug[] = ['fashion', 'living'];

const runCohortE: PersonaRunner = async (page: Page, config: SessionConfig) => {
  const { baseUrl, cohort } = config;

  logAction('홈페이지 진입 → 느긋하게 전체 스크롤');
  await navigateTo(page, baseUrl, '/');
  await initClarityTags(page, cohort);
  await dismissPopup(page);
  await mediumDelay();

  // Leisurely scroll through the entire homepage
  await gradualScroll(page, 1.0);
  await mediumDelay();

  // Sometimes scroll back up to look at something again
  if (Math.random() < 0.4) {
    await page.evaluate(`window.scrollTo({ top: 0, behavior: 'smooth' })`);
    await mediumDelay();
    await gradualScroll(page, 0.5);
  }

  // Window shoppers search random things out of curiosity
  if (Math.random() < 0.5) {
    const searchTerms = ['가방', '쿠션', '코트', '캔들', '선물', '인테리어'];
    const term = pickRandom(searchTerms);
    logAction(`검색: "${term}" → 결과 구경 (안 삼)`);
    await humanType(page, 'input[placeholder="상품을 검색해보세요"]', term);
    await page.locator('form button[type="submit"]').click();
    await page.waitForLoadState('domcontentloaded');
    await mediumDelay();
    await gradualScroll(page, 0.6);
    await mediumDelay();
  }

  const cat1 = pickRandom(PREFERRED_CATEGORIES);
  logAction(`카테고리(${cat1}) 이동 → 전체 탐색`);
  await navigateTo(page, baseUrl, `/category/${cat1}`);
  await shortDelay();

  // Window shoppers browse all filters for fun
  if (Math.random() < 0.5) {
    await naturalClick(page, 'button:has-text("2~5만원")');
    await shortDelay();
  }

  // Scroll through all results
  await gradualScroll(page, 1.0);
  await mediumDelay();

  // --- Visit many products (the browsing pattern) ---
  const cat1Products = PRODUCT_IDS[cat1];
  const browseList = pickRandomN(cat1Products, randInt(4, 6));

  const cartItems: string[] = []; // track what we add to cart

  logAction(`상품 ${browseList.length}개 구경: ${browseList.join(', ')}`);
  for (let i = 0; i < browseList.length; i++) {
    const productId = browseList[i];
    logAction(`상품 ${productId} 구경 (${i+1}/${browseList.length})`);
    await navigateTo(page, baseUrl, `/product/${productId}`);
    await shortDelay();

    // Deep scroll — window shoppers look at everything
    await gradualScroll(page, 0.8);
    await mediumDelay();

    // Add to wishlist
    if (Math.random() < 0.75) {
      logAction(`찜하기 ♥ ${productId}`);
      const wishlistBtn = page.locator('button svg path[d*="4.318 6.318"]').locator('..');
      if (await wishlistBtn.count() > 0) {
        try {
          await wishlistBtn.first().click();
          await shortDelay();
        } catch { /* ok */ }
      }
    }

    if (Math.random() < 0.45) {
      logAction(`장바구니 담기 ${productId} (나중에 삭제할 거임)`);
      // Select options if available
      const colorBtns = page.locator('label:has-text("색상") ~ div button');
      if (await colorBtns.count() > 1) {
        const idx = randInt(0, (await colorBtns.count()) - 1);
        try { await colorBtns.nth(idx).click(); } catch { /* ok */ }
        await shortDelay();
      }

      await naturalClick(page, 'button:has-text("장바구니 담기")');
      cartItems.push(productId);
      await shortDelay();
    }

    // Check reviews sometimes (not as thorough as researcher)
    if (Math.random() < 0.3) {
      await naturalClick(page, 'button:has-text("리뷰")');
      await mediumDelay();
    }

    // Look at related products
    await scrollToElement(page, 'text=관련 상품');
    await shortDelay();

    await shortDelay();
  }

  const cat2 = PREFERRED_CATEGORIES.find(c => c !== cat1) || pickRandom(CATEGORIES.filter(c => c !== cat1));
  logAction(`두 번째 카테고리(${cat2}) 이동 → 추가 탐색`);
  await navigateTo(page, baseUrl, `/category/${cat2}`);
  await shortDelay();
  await gradualScroll(page, 0.7);
  await mediumDelay();

  // Visit 1-2 more products
  const cat2Products = PRODUCT_IDS[cat2 as CategorySlug];
  const extraBrowse = pickRandomN(cat2Products, randInt(1, 2));
  for (const productId of extraBrowse) {
    await navigateTo(page, baseUrl, `/product/${productId}`);
    await shortDelay();
    await gradualScroll(page, 0.6);
    await mediumDelay();

    // Wishlist
    if (Math.random() < 0.7) {
      const wishlistBtn = page.locator('button svg path[d*="4.318 6.318"]').locator('..');
      if (await wishlistBtn.count() > 0) {
        try {
          await wishlistBtn.first().click();
          await shortDelay();
        } catch { /* ok */ }
      }
    }

    // Add to cart
    if (Math.random() < 0.4) {
      await naturalClick(page, 'button:has-text("장바구니 담기")');
      cartItems.push(productId);
      await shortDelay();
    }
  }

  if (cartItems.length > 0) {
    logAction(`장바구니 확인 (${cartItems.length}개) → 고민하다 삭제 (장바구니 이탈)`);
    await navigateTo(page, baseUrl, '/cart');
    await mediumDelay();
    await gradualScroll(page, 0.8);
    await mediumDelay();

    // Remove items from cart (cart abandonment pattern)
    // Remove some or all items
    const removeButtons = page.locator('button svg path[d*="6 18L18 6"]').locator('..');
    const removeCount = await removeButtons.count();

    if (removeCount > 0) {
      // Remove at least one item (the indecisive shopper pattern)
      const itemsToRemove = randInt(1, Math.max(1, removeCount));
      for (let i = 0; i < itemsToRemove; i++) {
        try {
          // Always remove the first visible one (list shifts after removal)
          const btn = page.locator('button svg path[d*="6 18L18 6"]').locator('..').first();
          if (await btn.isVisible({ timeout: 1000 })) {
            await btn.click();
            await shortDelay();
          }
        } catch { break; }
      }
    }

    await mediumDelay();

    // Look at the cart total, hesitate
    await gradualScroll(page, 0.5);
    await longDelay(); // long hesitation

    // Very rarely actually purchase (5% — almost never)
    if (Math.random() < 0.05) {
      await naturalClick(page, 'button:has-text("주문하기")');
      await page.waitForLoadState('domcontentloaded');
      await shortDelay();
      await fillCheckoutForm(page);
      await naturalClick(page, 'button:has-text("결제하기")');
      await page.waitForLoadState('domcontentloaded');
    } else {
      // Leave the cart — window shopper exits
      // Sometimes go back to browsing one more product before leaving
      if (Math.random() < 0.5) {
        await naturalClick(page, 'a:has-text("쇼핑 계속하기")');
        await page.waitForLoadState('domcontentloaded');
        await mediumDelay();
        await gradualScroll(page, 0.4);
      }
    }
  }

  // Maybe check events page on the way out
  if (Math.random() < 0.3) {
    await navigateTo(page, baseUrl, '/events');
    await shortDelay();
    await gradualScroll(page, 0.5);
    await mediumDelay();
  }
};

async function fillCheckoutForm(page: Page): Promise<void> {
  const names = ['송지은', '임현수', '유하영', '권민재'];
  const addresses = ['서울특별시 마포구 상수동', '서울특별시 영등포구 여의도동'];
  const phones = ['010-9999-0000', '010-1212-3434'];
  const zipcodes = ['04060', '07321'];

  try {
    await page.locator('input[name="name"]').fill(pickRandom(names));
    await page.locator('input[name="phone"]').fill(pickRandom(phones));
    await page.locator('input[name="zipcode"]').fill(pickRandom(zipcodes));
    await page.locator('input[name="address"]').fill(pickRandom(addresses));
  } catch { /* form fields might not be available */ }
}

export default runCohortE;
