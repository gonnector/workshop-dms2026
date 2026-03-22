/**
 * Microsoft Clarity helper functions
 * Centralized tagging for consistent tracking across the KOMMA e-commerce site
 */

declare global {
  interface Window {
    clarity: (...args: unknown[]) => void;
  }
}

// Clarity project ID (to be replaced with actual ID)
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '';

/** Set a custom tag */
export function claritySet(key: string, value: string) {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', key, value);
  }
}

/** Fire a custom event */
export function clarityEvent(name: string) {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', name);
  }
}

/** Identify a user (for cohort simulation) */
export function clarityIdentify(userId: string, sessionId?: string) {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('identify', userId, sessionId);
  }
}

// --- Page Type Tags ---
export type PageType = 'home' | 'category' | 'product' | 'cart' | 'checkout' | 'order-complete' | 'mypage' | 'event' | 'search';

export function setPageType(pageType: PageType) {
  claritySet('pageType', pageType);
}

// --- Category Interest ---
export type CategorySlug = 'beauty' | 'fashion' | 'living' | 'food' | 'tech';

export function setCategoryInterest(category: CategorySlug) {
  claritySet('category_interest', category);
}

// --- Cart Value ---
export function setCartValue(totalPrice: number) {
  if (totalPrice >= 100000) {
    claritySet('cart_value', 'high');
  } else if (totalPrice >= 30000) {
    claritySet('cart_value', 'medium');
  } else {
    claritySet('cart_value', 'low');
  }
}

// --- Funnel Stage ---
export type FunnelStage = 'awareness' | 'consideration' | 'decision' | 'purchase';

export function setFunnelStage(stage: FunnelStage) {
  claritySet('funnel_stage', stage);
}

// --- Cohort Tag (for bot simulation - validation purposes) ---
export type CohortId = 'cohort_A' | 'cohort_B' | 'cohort_C' | 'cohort_D' | 'cohort_E';

export function setCohort(cohort: CohortId) {
  claritySet('cohort', cohort);
}

// --- Custom Events ---
export const ClarityEvents = {
  searchPerformed: () => clarityEvent('search_performed'),
  productViewed: () => clarityEvent('product_viewed'),
  addToCart: () => clarityEvent('add_to_cart'),
  addToWishlist: () => clarityEvent('add_to_wishlist'),
  couponApplied: () => clarityEvent('coupon_applied'),
  checkoutStarted: () => clarityEvent('checkout_started'),
  purchaseCompleted: () => clarityEvent('purchase_completed'),
  reviewRead: () => clarityEvent('review_read'),
  filterUsed: () => clarityEvent('filter_used'),
  bannerClicked: () => clarityEvent('banner_clicked'),
  popupInteracted: () => clarityEvent('popup_interacted'),
  shareClicked: () => clarityEvent('share_clicked'),
} as const;
