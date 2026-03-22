/**
 * Cohort A — "가성비 헌터" (Deal Hunter)
 *
 * Behavior: Goes straight to sale/event pages, uses price filters,
 *           applies coupons, quick purchases of cheap items.
 * Session:  Short (30-60s), direct navigation, few page views.
 * Focus:    food, living (cheaper items)
 * Cart:     Low value
 * Conversion: High (when discounted)
 */
import { Page } from 'playwright';
import {
  SessionConfig, PersonaRunner,
  SALE_PRODUCT_IDS, CHEAP_PRODUCT_IDS, PRODUCT_IDS,
  pickRandom, randInt,
  navigateTo, initClarityTags, dismissPopupQuick,
  humanDelay, shortDelay, mediumDelay,
  gradualScroll, naturalClick, humanType,
  logAction, CategorySlug,
} from '../shared';

const PREFERRED_CATEGORIES: CategorySlug[] = ['food', 'living'];

const runCohortA: PersonaRunner = async (page: Page, config: SessionConfig) => {
  const { baseUrl, cohort } = config;

  // --- Entry: go straight to events page or a category sale page ---
  const entryChoice = Math.random();

  if (entryChoice < 0.5) {
    logAction('이벤트/SALE 페이지로 직행');
    await navigateTo(page, baseUrl, '/events');
    await initClarityTags(page, cohort);
    await dismissPopupQuick(page);
    await shortDelay();

    // Scroll through deals
    await gradualScroll(page, 0.6);
    await shortDelay();

    const saleId = pickRandom(SALE_PRODUCT_IDS);
    logAction(`할인 상품 클릭: ${saleId}`);
    await navigateTo(page, baseUrl, `/product/${saleId}`);
    await shortDelay();

  } else if (entryChoice < 0.8) {
    logAction('홈 → 이벤트 페이지로 이동');
    await navigateTo(page, baseUrl, '/');
    await initClarityTags(page, cohort);
    await dismissPopupQuick(page);
    await shortDelay();

    // Click "전체 세일" link on homepage
    const clicked = await naturalClick(page, 'a[href="/ecommerce/events"]');
    if (clicked) {
      await page.waitForLoadState('domcontentloaded');
    } else {
      await navigateTo(page, baseUrl, '/events');
    }
    await shortDelay();
    await gradualScroll(page, 0.5);

    // Pick a sale item
    const saleId = pickRandom(SALE_PRODUCT_IDS);
    await navigateTo(page, baseUrl, `/product/${saleId}`);
    await shortDelay();

  } else {
    const cat = pickRandom(PREFERRED_CATEGORIES);
    logAction(`카테고리(${cat}) → 가격 필터 적용`);
    await navigateTo(page, baseUrl, `/category/${cat}`);
    await initClarityTags(page, cohort);
    await dismissPopupQuick(page);
    await shortDelay();

    // Apply "under 2만원" price filter
    const filterClicked = await naturalClick(page, 'button:has-text("~2만원")');
    if (!filterClicked) {
      // Try the "2~5만원" filter as fallback
      await naturalClick(page, 'button:has-text("2~5만원")');
    }
    await shortDelay();

    // Also apply "SALE" tag filter
    await naturalClick(page, 'button:has-text("SALE")');
    await shortDelay();

    // Pick a cheap product from this category
    const catProducts = PRODUCT_IDS[cat];
    const cheapInCat = catProducts.filter(id => CHEAP_PRODUCT_IDS.includes(id) || SALE_PRODUCT_IDS.includes(id));
    const productId = cheapInCat.length > 0 ? pickRandom(cheapInCat) : pickRandom(catProducts);
    await navigateTo(page, baseUrl, `/product/${productId}`);
    await shortDelay();
  }

  logAction('상품 페이지 — 빠르게 훑고 장바구니 담기');
  await gradualScroll(page, 0.3);
  await shortDelay();

  // Add to cart
  await naturalClick(page, 'button:has-text("장바구니 담기")');
  await shortDelay();

  // Maybe view one more sale product (50% chance)
  if (Math.random() < 0.5) {
    const anotherSaleId = pickRandom(SALE_PRODUCT_IDS);
    await navigateTo(page, baseUrl, `/product/${anotherSaleId}`);
    await shortDelay();
    await gradualScroll(page, 0.3);
    await naturalClick(page, 'button:has-text("장바구니 담기")');
    await shortDelay();
  }

  logAction('장바구니 → 쿠폰(WELCOME10) 적용 → 결제');
  await navigateTo(page, baseUrl, '/cart');
  await shortDelay();

  // Apply WELCOME10 coupon
  const couponInput = page.locator('input[placeholder="쿠폰 코드"]');
  if (await couponInput.isVisible({ timeout: 2000 })) {
    await humanType(page, 'input[placeholder="쿠폰 코드"]', 'WELCOME10');
    await shortDelay();
    await naturalClick(page, 'button:has-text("적용")');
    await shortDelay();
  }

  // Proceed to checkout (high conversion for deal hunters)
  if (Math.random() < 0.85) {
    await naturalClick(page, 'button:has-text("주문하기")');
    await page.waitForLoadState('domcontentloaded');
    await shortDelay();

    // Fill checkout form quickly
    await fillCheckoutForm(page);
    await shortDelay();

    // Complete purchase
    await naturalClick(page, 'button:has-text("결제하기")');
    await page.waitForLoadState('domcontentloaded');
    await humanDelay(500, 1000);
  }
};

async function fillCheckoutForm(page: Page): Promise<void> {
  const names = ['김민수', '이수진', '박지영', '정현우', '최은비', '강도현', '윤서연'];
  const addresses = ['서울특별시 강남구 역삼동', '서울특별시 마포구 합정동', '경기도 성남시 분당구', '부산광역시 해운대구'];
  const phones = ['010-1234-5678', '010-9876-5432', '010-5555-7777', '010-3333-4444'];
  const zipcodes = ['06241', '04100', '13561', '48094'];

  try {
    await page.locator('input[name="name"]').fill(pickRandom(names));
    await page.locator('input[name="phone"]').fill(pickRandom(phones));
    await page.locator('input[name="zipcode"]').fill(pickRandom(zipcodes));
    await page.locator('input[name="address"]').fill(pickRandom(addresses));
  } catch {
    // Form fields might not be available
  }
}

export default runCohortA;
