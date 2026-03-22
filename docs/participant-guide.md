# DMS 2026 워크숍 참가자 가이드

## 사전 준비

### 필수 설치
1. **Claude Code** (또는 OpenCode + Gemini/ChatGPT)
   - https://claude.ai/claude-code 에서 설치
   - 설치 확인: 터미널에서 `claude --version`

2. **Node.js** (v18 이상)
   - https://nodejs.org 에서 LTS 버전 설치
   - 설치 확인: `node --version`

3. **Git**
   - https://git-scm.com 에서 설치
   - 설치 확인: `git --version`

### 레포지토리 클론
```bash
git clone https://github.com/gonnector/workshop-dms2026.git
cd workshop-dms2026
npm install
```

---

## 워크숍 실습 흐름

### Phase 1: Clarity 탐색 (15분)

#### Clarity 접속
- 워크숍에서 공유하는 Clarity 프로젝트 URL로 접속
- Viewer 권한으로 별도 가입 없이 바로 사용 가능

#### 해볼 것
1. **대시보드** — 전체 지표 훑어보기 (세션 수, 페이지뷰, UX 문제 신호)
2. **필터 → 사용자 지정 태그 → cohort** — 코호트별 전환하며 지표 비교
3. **히트맵** — 홈페이지/상품 페이지의 클릭/스크롤 패턴 관찰
4. **히트맵 비교 모드** — cohort_A vs cohort_B 나란히 비교
5. **세션 리코딩** — 코호트별 2~3개 세션 재생하며 행동 패턴 관찰
6. **퍼널** — Main Purchase Funnel에서 코호트별 전환율 차이 확인

#### 목표
각 코호트의 행동 특성을 관찰하고, "cohort_A는 ~한 유형"이라는 가설 세우기

---

### Phase 2: Claude Code 분석 (25분)

#### 데이터 다운로드
워크숍에서 제공하는 CSV 파일을 `export-data/` 폴더에 저장
(또는 Clarity에서 직접 CSV export)

#### Claude Code 실행
```bash
cd workshop-dms2026
claude
```

#### 프롬프트 라이브러리

**Level 1 — 기본 탐색**
```
export-data/ 폴더의 CSV 파일을 분석해서 코호트별 기술 통계를 비교해줘.
세션 수, 평균 체류시간, 페이지뷰, 전환율을 표로 정리해줘.
```

**Level 2 — 패턴 발견**
```
코호트별 행동 차이를 시각화해줘.
- 세션 체류시간 분포
- 페이지뷰 분포
- 카테고리 관심도 비교
각 코호트의 특성을 3줄로 요약해줘.
```

**Level 3 — 세그먼트 추정**
```
코호트 라벨 없이 행동 변수만으로 K-means 클러스터링을 수행해줘.
엘보우 메서드로 최적 k를 결정하고,
각 클러스터의 특성을 정리한 후 실제 코호트와 매칭해봐.
```

**Level 4 — STP 전략**
```
분석 결과를 바탕으로 STP 관점에서 마케팅 전략을 도출해줘:
1. Segmentation: 각 세그먼트 특성 요약
2. Targeting: ROI 기준 우선순위
3. Positioning: 세그먼트별 맞춤 마케팅 메시지
표 형태로 정리하고, 즉시 실행 가능한 액션 아이템 3개씩.
```

> 이 프롬프트를 기반으로 자유롭게 변형해보세요!

---

### Phase 3: 인사이트 공유 (10분)

FigJam 보드에 포스트잇으로 등록:
- 발견한 세그먼트 특성 (S)
- 타겟 우선순위 판단 (T)
- 마케팅 전략 제안 (P)

---

## 봇 시뮬레이션 직접 해보기 (선택)

### 설치
```bash
cd scripts
npm install
npx playwright install chromium
```

### 실행
```bash
# 특정 코호트 1개 테스트 (브라우저 보이게)
HEADLESS=false TOTAL_SESSIONS=1 COHORT=cohort_A npx tsx simulate-traffic.ts

# Windows PowerShell의 경우
$env:HEADLESS="false"; $env:TOTAL_SESSIONS="1"; $env:COHORT="cohort_A"; npx tsx simulate-traffic.ts
```

### 코호트 목록
| 코호트 | 환경변수 | 설명 |
|--------|---------|------|
| 가성비 헌터 | `COHORT=cohort_A` | SALE 직행, 쿠폰, 빠른 구매 |
| 신중한 연구자 | `COHORT=cohort_B` | 리뷰 정독, 비교, 찜하기 |
| 트렌드 팔로워 | `COHORT=cohort_C` | 배너, NEW, 모바일 |
| 충성 고객 | `COHORT=cohort_D` | 상품 직행, 즉시 구매 |
| 윈도우 쇼퍼 | `COHORT=cohort_E` | 많이 보고 안 삼, 장바구니 이탈 |

---

## 자료 & 링크
- **사이트**: https://workshop.gonnector.com/ecommerce
- **GitHub**: https://github.com/gonnector/workshop-dms2026
- **슬라이드**: `slides/index.html` (로컬에서 열기)
- **연락처**: gonnector@gonnector.com
