# Clarity 태깅 테스트 시나리오

## 사전 조건
- Vercel에 배포 완료
- Clarity 프로젝트 생성 + Project ID 환경변수 설정 완료
- Bot Detection OFF

## 테스트 방법
1. `https://workshop.gonnector.com/ecommerce?mode=test` 로 접속 (test 태깅)
2. 아래 시나리오를 순서대로 수행
3. 5~10분 후 Clarity 대시보드에서 세션 확인
4. Recordings에서 해당 세션 찾기 → Custom Tags 필터: `data_source = test`

## 테스트 시나리오

### TC-01: 페이지 타입 태깅
**행동**: 홈 → 카테고리(뷰티) → 상품상세 → 장바구니 → 체크아웃 → 주문완료 순서로 이동
**검증할 태그**: `pageType` 값이 각 페이지에서 변경되는지
- home → category → product → cart → checkout → order-complete
**검증할 태그**: `data_source = test` (전 페이지에서 유지되는지)

### TC-02: 카테고리 관심도
**행동**: 뷰티 카테고리 → 패션 카테고리 → 테크 카테고리 순서로 이동
**검증할 태그**: `category_interest` 값 변화 (beauty → fashion → tech)

### TC-03: 검색 이벤트
**행동**: 검색바에 "세럼" 입력 → 검색
**검증할 태그**:
- `search_keyword = 세럼`
- `search_result_count = few` 또는 `many`
**검증할 이벤트**: `search_performed`

**행동**: 검색바에 "존재하지않는상품" 입력 → 검색
**검증할 태그**: `search_result_count = no_result`

### TC-04: 상품 조회 + 리뷰 읽기
**행동**: 아무 상품 클릭 → 리뷰 탭 클릭
**검증할 이벤트**: `product_viewed`, `review_read`
**검증할 태그**: `funnel_stage = consideration`

### TC-05: 장바구니 담기
**행동**: 상품 상세에서 옵션 선택 → "장바구니 담기" 클릭
**검증할 이벤트**: `add_to_cart`
**검증할 태그**:
- `funnel_stage = decision`
- `cart_item_count = few`

### TC-06: 찜하기
**행동**: 상품 상세에서 하트 버튼 클릭 (3개 이상 상품)
**검증할 이벤트**: `add_to_wishlist`
**검증할 태그**: `wishlist_count` 변화 (empty → few → many)

### TC-07: 쿠폰 적용
**행동**: 장바구니 → 쿠폰 코드 "WELCOME10" 입력 → 적용
**검증할 이벤트**: `coupon_applied`

### TC-08: 체크아웃 + 구매 완료
**행동**: 장바구니 → 주문하기 → 배송정보 입력 → 결제하기
**검증할 이벤트**: `checkout_started`, `purchase_completed`
**검증할 태그**: `funnel_stage = purchase`

### TC-09: 필터/정렬 사용
**행동**: 카테고리 페이지 → 가격 필터 "2~5만원" 클릭 → 정렬 "낮은 가격순"
**검증할 이벤트**: `filter_used`

### TC-10: 프로모션 팝업
**행동**: 새 시크릿 창에서 `?mode=test`로 접속 → 2초 후 팝업 표시 → "쿠폰 받기" 클릭
**검증할 이벤트**: `popup_interacted`

### TC-11: 배너 클릭
**행동**: 홈페이지 히어로 배너에서 "컬렉션 보기" 클릭
**검증할 이벤트**: `banner_clicked`

### TC-12: 이벤트 페이지
**행동**: EVENT 메뉴 클릭 → 타임딜 상품 클릭
**검증할 태그**: `pageType = event`

## 검증 방법 (Clarity 대시보드)

### 세션 찾기
1. Clarity → Recordings
2. Filters → Custom Tags → `data_source` = `test`
3. 최근 세션 클릭 → 재생

### 태그 확인
- 세션 재생 화면 우측의 Session details에서 Custom Tags 확인
- 또는 Dashboard → Filters에서 각 태그 값으로 필터링 → 세션 수 확인

### 이벤트 확인
- Dashboard → Smart Events 섹션에서 커스텀 이벤트 카운트 확인
- Recordings → Filters → Smart Events → 해당 이벤트 선택 → 세션 존재 확인

## 자동 테스트 (Claude Code)
```bash
# Playwright로 위 시나리오를 자동 실행하는 스크립트
# scripts/tagging-test.ts 참조
```

## 예상 소요 시간
- 수동 테스트: 15~20분
- Clarity 반영 대기: 5~30분 (보통 5분 내)
