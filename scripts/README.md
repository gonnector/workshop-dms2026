# KOMMA Traffic Simulator

Playwright-based bot simulation that generates realistic customer behavior data on the KOMMA e-commerce site for Microsoft Clarity analysis.

## 5 Customer Personas

| Cohort | Persona | Traffic % | Session Length | Conversion |
|--------|---------|-----------|---------------|------------|
| cohort_A | Deal Hunter (가성비 헌터) | 25% | Short (30-60s) | High |
| cohort_B | Researcher (신중한 연구자) | 20% | Long (3-5 min) | Medium |
| cohort_C | Trend Follower (트렌드 팔로워) | 20% | Medium (1-2 min) | Medium |
| cohort_D | Loyal Buyer (충성 고객) | 15% | Short (30-60s) | Very High |
| cohort_E | Window Shopper (윈도우 쇼퍼) | 20% | Long (2-4 min) | Very Low |

## Setup

```bash
cd scripts
npm install
npx playwright install chromium
```

## Usage

### Default (100 sessions, headless)
```bash
npm run simulate
```

### Headed mode (watch the browser)
```bash
npm run simulate:headed
```

### Small batch for testing
```bash
npm run simulate:small    # 10 sessions
npm run simulate:debug    # 5 sessions, headed
```

### Custom configuration
```bash
BASE_URL=http://localhost:3000/ecommerce TOTAL_SESSIONS=50 HEADLESS=false CONCURRENCY=2 npx tsx simulate-traffic.ts
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://workshop.gonnector.com/ecommerce` | Site base URL (including basePath) |
| `TOTAL_SESSIONS` | `100` | Total number of bot sessions to run |
| `HEADLESS` | `true` | Run browsers headless (`true`/`false`) |
| `CONCURRENCY` | `3` | Max parallel browser sessions |

## How It Works

1. **Session planning**: Distributes sessions across 5 cohorts according to traffic percentages, then shuffles the order for realistic interleaving.

2. **Each session**:
   - Opens a new browser context with randomized viewport (desktop/mobile) and user agent
   - Navigates the site according to the persona's behavioral pattern
   - Sets Clarity tags: `data_source=simulation` and `cohort=cohort_X`
   - Performs interactions (clicks, scrolls, form fills) with human-like delays
   - Closes the context (Clarity records it as a separate session)

3. **Clarity tagging**: The simulator sets `sessionStorage.komma_data_source = 'simulation'` and calls `window.clarity('set', ...)` to tag each session. The existing site code in `ClarityInit.tsx` reads `sessionStorage` to persist the data source across page navigations.

## Persona Behaviors

### cohort_A (Deal Hunter)
- Enters via Events page or with price filters
- Applies WELCOME10 coupon
- Quick add-to-cart and checkout on sale items
- Focus: food, living categories

### cohort_B (Researcher)
- Browses multiple products in detail
- Clicks Reviews tab, reads reviews, clicks "도움돼요"
- Checks Description and Q&A tabs
- Compares by going back and forth between products
- Adds to wishlist for comparison
- Focus: tech, beauty categories

### cohort_C (Trend Follower)
- Clicks hero banners on homepage
- Applies "NEW" filter, sorts by newest
- Shares products
- 50% chance of mobile viewport
- Focus: fashion, beauty categories

### cohort_D (Loyal Buyer)
- Goes directly to specific product pages
- No reviews, no comparison — straight to cart
- Selects options and checks out quickly
- Prefers best-seller products
- Focus: all categories

### cohort_E (Window Shopper)
- Browses many products across multiple categories
- Adds to wishlist frequently
- Adds to cart then removes items (cart abandonment)
- Long sessions with deep scrolling
- Almost never completes purchase (~5%)
- Focus: fashion, living categories

## Important Notes

- **Clarity Bot Detection**: Must be turned OFF in Clarity Settings > Setup > Advanced Settings before running the simulation.
- **Rate limiting**: Sessions include random delays between actions and between sessions to avoid overwhelming the server.
- **Error resilience**: If a single session fails, the simulator continues with remaining sessions and reports the failure at the end.
