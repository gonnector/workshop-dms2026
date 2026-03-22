# AI Agent Guide — DMS 2026 Workshop

이 문서는 AI 에이전트(Claude Code, OpenCode 등)가 이 프로젝트를 이해하고 작업할 수 있도록 작성된 가이드입니다.

## 프로젝트 개요
DMS 2026 워크숍용 이커머스 행동 데이터 분석 프로젝트. 3가지 자산으로 구성:

1. **KOMMA 이커머스 사이트** — Next.js 14 + Tailwind CSS, Vercel 배포
2. **봇 시뮬레이션 스크립트** — Playwright 기반 5개 페르소나 행동 시뮬레이션
3. **워크숍 슬라이드** — reveal.js 기반

## 사이트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 홈 (히어로 배너, 카테고리, 상품 그리드)
│   ├── category/[slug]/    # 카테고리 (필터, 정렬, 상품 목록)
│   ├── product/[id]/       # 상품 상세 (이미지, 옵션, 리뷰, 장바구니)
│   ├── cart/               # 장바구니 (수량, 쿠폰, 주문)
│   ├── checkout/           # 체크아웃 (배송정보, 결제수단)
│   ├── order-complete/     # 주문 완료
│   ├── mypage/             # 마이페이지 (주문내역, 위시리스트, 쿠폰)
│   ├── events/             # 이벤트/프로모션 (타임딜, 세일)
│   └── search/             # 검색 결과
├── components/
│   ├── Header.tsx          # 헤더 (네비, 검색, 장바구니 아이콘)
│   ├── Footer.tsx          # 푸터
│   ├── ProductCard.tsx     # 상품 카드 컴포넌트
│   └── ClarityInit.tsx     # Clarity 초기화 (data_source 관리)
├── data/
│   └── products.ts         # 45개 상품, 5개 카테고리, 165개 리뷰 데이터
└── lib/
    ├── clarity.ts          # Clarity API 헬퍼 (태그, 이벤트)
    └── cart.ts             # 장바구니/위시리스트 (localStorage)
```

## 상품 데이터 구조

- **5개 카테고리**: beauty, fashion, living, food, tech (각 9개 상품)
- **평점 4사분면**: 고평점+다리뷰(12), 고평점+소리뷰(8), 저평점+다리뷰(8), 저평점+소리뷰(8)
- **165개 리뷰**: 평점에 맞는 톤 (고평점=긍정, 저평점=불만)
- 이미지: Unsplash CDN

## Microsoft Clarity 연동

### 태깅 체계
```
Custom Tags:
- pageType: home | category | product | cart | checkout | order-complete | mypage | event | search
- category_interest: beauty | fashion | living | food | tech
- cart_value: high | medium | low
- funnel_stage: awareness | consideration | decision | purchase
- data_source: test | simulation | organic
- cohort: cohort_A | cohort_B | cohort_C | cohort_D | cohort_E
- wishlist_count: empty | few | many
- cart_item_count: empty | few | many
- search_keyword: (검색어)
- search_result_count: no_result | few | many
- sort_by: 인기순 | 낮은 가격순 | 높은 가격순 | 평점순 | 최신순
- price_filter: all | under-20k | 20k-50k | 50k-100k | over-100k

Custom Events:
- search_performed, product_viewed, add_to_cart, add_to_wishlist
- coupon_applied, checkout_started, purchase_completed
- review_read, filter_used, banner_clicked, popup_interacted, share_clicked
```

### data_source 관리
- `?mode=test` URL 파라미터 → sessionStorage에 저장 → 전 페이지 유지
- 봇 시뮬레이션 → `simulation` 태깅
- 파라미터 없음 → `organic`
- 구현: layout.tsx의 vanilla JS에서 history.pushState 인터셉트

### Clarity 설정
- Project ID: `vzqk2qmx8p`
- Bot Detection: OFF
- 마스킹: 편안함 (최소)
- Copilot: ON

## 봇 시뮬레이션

### 5개 페르소나

| 코호트 | 페르소나 | 비율 | 핵심 행동 | 전환율 |
|--------|---------|------|----------|--------|
| cohort_A | 가성비 헌터 | 25% | SALE 직행, 쿠폰, 빠른 구매 | ~85% |
| cohort_B | 신중한 연구자 | 20% | 리뷰 정독, 비교, 찜하기, 검색 | ~22% |
| cohort_C | 트렌드 팔로워 | 20% | 배너 클릭, NEW 필터, 모바일(50%) | ~40% |
| cohort_D | 충성 고객 | 15% | 상품 직행, 즉시 구매, 리뷰 스킵 | ~90% |
| cohort_E | 윈도우 쇼퍼 | 20% | 많이 봄, 찜 많음, 장바구니 이탈, 검색 | ~5% |

### 실행 방법
```bash
cd scripts
npm install
npx playwright install chromium

# 특정 코호트 테스트
HEADLESS=false TOTAL_SESSIONS=1 COHORT=cohort_B npx tsx simulate-traffic.ts

# 전체 시뮬레이션
TOTAL_SESSIONS=100 CONCURRENCY=3 npx tsx simulate-traffic.ts
```

### 환경변수
- `BASE_URL`: 사이트 URL (기본: https://workshop.gonnector.com/ecommerce)
- `TOTAL_SESSIONS`: 세션 수 (기본: 100)
- `HEADLESS`: 헤드리스 모드 (기본: true)
- `CONCURRENCY`: 동시 실행 수 (기본: 3)
- `COHORT`: 특정 코호트 강제 (예: cohort_A)

## 데이터 분석 가이드

### Clarity에서 Export 가능한 데이터
- **세션 CSV**: 최대 10만 세션 (세션URL, 체류시간, 페이지수, 디바이스, 커스텀태그)
- **히트맵 CSV**: 클릭(엘리먼트별), 스크롤(5% 단위)
- **퍼널 데이터**: 대시보드 위젯 CSV

### 분석 시나리오
1. **세그멘테이션(S)**: 코호트별 행동 통계 비교 → 특성 추정 → 클러스터링 검증
2. **타겟팅(T)**: 전환율 × 객단가 × 세그먼트 크기 → ROI 우선순위
3. **포지셔닝(P)**: 세그먼트별 관심 카테고리/콘텐츠 패턴 → 맞춤 전략

### AI가 분석할 때 유의사항
- CSV export 시 코호트 태그를 포함하려면 Clarity에서 **코호트별 필터 적용 후 각각 export** 해야 함
- 세션 데이터는 집계 수준이므로 raw event stream은 제공되지 않음
- Clarity MCP Server (`@microsoft/clarity-mcp-server`)로 직접 쿼리 가능하나 일 10회 제한

## 배포

### 사이트 (Vercel)
- basePath: `/ecommerce`
- 환경변수: `NEXT_PUBLIC_CLARITY_PROJECT_ID=vzqk2qmx8p`
- 도메인: workshop.gonnector.com

### 슬라이드
- `slides/index.html` — 로컬에서 브라우저로 열기
- reveal.js CDN 사용, 방향키로 네비게이션

## 새 사이트 만들기 (AI 에이전트용)

이 프로젝트를 참고하여 새로운 이커머스 사이트를 만들려면:

1. 이 레포를 fork/clone
2. `src/data/products.ts` — 상품 데이터 수정 (카테고리, 상품, 리뷰)
3. `src/lib/clarity.ts` — Clarity Project ID 변경
4. `next.config.js` — basePath 변경
5. `scripts/personas/` — 페르소나 행동 패턴 수정
6. Vercel 배포 → Clarity 프로젝트 생성 → Bot Detection OFF → 시뮬레이션 실행
