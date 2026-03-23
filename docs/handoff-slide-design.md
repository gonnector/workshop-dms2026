# 슬라이드 디자인 핸드오프

## 상황
DMS 2026 워크숍 슬라이드 (`slides/index.html`)의 디자인 피드백 반영 중.
기능/콘텐츠는 완료. **디자인만 남음.**

## 기술 스택
- reveal.js 5.1.0 (CDN)
- 1920x1080 캔버스 (16:9)
- Noto Sans KR 폰트
- 브랜드 색: 짙은 보라 (#6d28d9 메인, #8b5cf6 밝은, #5b21b6 어두운)

## 슬라이드 레이아웃 시스템 (신규 적용됨)

### 슬라이드 분류
- **커버/간지 (9장)**: `.centered-slide` — flex 센터링, 배경색 있음
- **콘텐츠 (34장)**: `.content-slide` — 고정 타이틀 영역 + 콘텐츠 영역

### 콘텐츠 슬라이드 레이아웃
```
┌──────────────────── 1920px ────────────────────┐
│  10%  ┌──── 80% 콘텐츠 영역 ────┐  10%  │
│ 여백  │                          │ 여백  │
│       │  .slide-title (216px)    │       │  ← 상단 20%, h2 수직/수평 중앙
│       │  ─────────────────────  │       │
│       │                          │       │
│       │  .slide-content (804px)  │       │  ← 나머지, 콘텐츠 수직/수평 중앙
│       │                          │       │
│       └──────────────────────────┘       │
│  ▒▒▒▒▒ 하단 여백 60px (슬라이드 번호) ▒▒▒▒▒ │
└──────────────────────────────────────────────────┘
```

### CSS 핵심 설정
- `center: false` — reveal.js 자동 센터링 비활성화, CSS로 직접 제어
- `.content-slide`: flex column, height 100%, padding-bottom 60px
- `.slide-title`: height 216px, flex center, padding 0 10%
- `.slide-content`: flex 1, flex column, justify-content center, padding 0 10%
- `.centered-slide`: flex center (커버/간지용)

### HTML 구조 (콘텐츠 슬라이드)
```html
<section class="content-slide">
  <div class="slide-title">
    <h2>제목</h2>
  </div>
  <div class="slide-content">
    <!-- 콘텐츠 -->
  </div>
</section>
```

## 현재 CSS 설정
- 베이스 폰트: 40px
- h1: 2.4em, h2: 1.7em
- h2 margin-bottom: 1em (글로벌), 0 (slide-title 내부)
- box: padding 0.7em, border-radius 10px
- table: font-size 0.65em (글로벌 기본)
- 전환: slide (좌우), controls: edges

## 해결된 이슈
- S1: 타이틀 센터링 ✓
- S2: 2열 아젠다 (max-width 1600px, column gap 4em, font-size 0.75em) ✓
- S4: 제목 "아이스 브레이킹"으로 변경 ✓
- S6: 고객 여정 카드 확대 (이모지 1.6em, 패딩 1em, white-space:nowrap) ✓
- S6: 하단 fragment에 margin-top 1.5em 추가 ✓
- S7: 4열 레이아웃으로 변경 ✓
- S9: 테이블 폰트 0.65em → 0.95em 확대 ✓
- 전체: 타이틀 영역 (상단 20%) + 콘텐츠 영역 레이아웃 시스템 적용 ✓
- 전체: 좌우 10% 마진, 하단 60px 여백 적용 ✓
- Targeting/Positioning 슬라이드 추가 (정답 공개 다음) ✓

## 남은 디자인 이슈

### 디자인 원칙 (Dylan 확정)
- **1920x1080 캔버스에 콘텐츠가 넘치면 안 됨** — 모든 슬라이드 1장에 다 보여야 함
- **텍스트 줄바꿈** — 박스 안에서 줄바꿈이 생기면 안 됨 (폭 조절 또는 폰트 축소)
- **콘텐츠 폭을 충분히 사용** — 카드/박스가 너무 작으면 안 됨
- **테이블 텍스트 크기** — 글로벌 0.65em이 너무 작은 경우 슬라이드별로 올리기

### 개별 슬라이드 (S10~S43 미확인)
- S1~S9까지 확인 완료
- 콘텐츠가 많은 슬라이드: 폰트 축소 or 레이아웃 변경 필요
- 테이블이 있는 슬라이드: 특히 주의 (폭 넘침, 폰트 크기)
- QR 코드 슬라이드: QR 크기 + 텍스트 밸런스 확인
- 새 레이아웃 시스템 적용 후 각 슬라이드 넘침/정렬 전수 체크 필요

## 작업 방법
1. `slides/index.html` 수정
2. 브라우저에서 dev tools 1920x1080으로 확인
3. 슬라이드 하나씩 넘기면서 넘침/정렬 체크
4. 커밋 → push

## Dylan 피드백 스타일
- 스크린샷으로 문제 보여줌
- "잘림", "중심 안맞음", "여백 없음", "줄바꿈됨", "너무 작아" 등 직관적 피드백
- 수정 후 바로 새로고침해서 확인
