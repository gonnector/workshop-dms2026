# 슬라이드 디자인 핸드오프

## 상황
DMS 2026 워크숍 슬라이드 (`slides/index.html`)의 디자인 피드백 반영 중.
기능/콘텐츠는 완료. **디자인만 남음.**

## 기술 스택
- reveal.js 5.1.0 (CDN)
- 1920x1080 캔버스 (16:9)
- Noto Sans KR 폰트
- 브랜드 색: 짙은 보라 (#6d28d9 메인, #8b5cf6 밝은, #5b21b6 어두운)

## 현재 CSS 설정
- 베이스 폰트: 40px
- h1: 2.4em, h2: 1.7em (margin-bottom: 1em)
- box: padding 0.7em, border-radius 10px
- 전환: slide (좌우), controls: edges

## 해결된 이슈
- S1: 타이틀 센터링 ✓
- S2: 2열 아젠다 (max-width 1600px, column gap 4em, font-size 0.75em) ✓
- S4: 제목 "아이스 브레이킹"으로 변경 ✓
- S6: 고객 여정 박스 여백 확대 ✓
- S7: 4열 레이아웃으로 변경 ✓
- 전체: h2 margin-bottom 1em ✓
- Targeting/Positioning 슬라이드 추가 (정답 공개 다음) ✓

## 남은 디자인 이슈 (Dylan 피드백 기반)

### 전체 공통
- **1920x1080 캔버스에 콘텐츠가 넘치면 안 됨** — 모든 슬라이드 1장에 다 보여야 함
- **제목(h2)과 콘텐츠 사이 여백** — 너무 붙으면 안 됨 (현재 1em 설정)
- **박스 가로폭** — 너무 넓으면 내부 여백이 과해 보임
- **텍스트 줄바꿈** — 박스 안에서 줄바꿈이 생기면 안 됨 (폭 조절 또는 폰트 축소)
- **중앙 정렬** — reveal.js center:true 활용, 커스텀 flex 오버라이드 금지

### 개별 슬라이드 (S8~S41 미확인)
- 콘텐츠가 많은 슬라이드는 폰트 축소 or 레이아웃 변경 필요
- 테이블이 있는 슬라이드는 특히 주의 (폭 넘침)
- QR 코드 슬라이드는 QR 크기 + 텍스트 밸런스 확인

## 참고 디자인
- `E:/project/gonnector-slides/slide-template.html` — Gonnector 슬라이드 디자인 시스템
  - content max-width: clamp(760px, 65vw, 1300px)
  - slide padding: 6rem 4rem 5rem
  - CSS 변수 기반 다크/라이트 테마
  - 반응형 폰트: clamp(16px, 1.25vw, 26px)

## 작업 방법
1. `slides/index.html` 수정
2. 브라우저에서 dev tools 1920x1080으로 확인
3. 슬라이드 하나씩 넘기면서 넘침/정렬 체크
4. 커밋 → push (vercel 재배포 불필요, 슬라이드는 로컬 파일)

## Dylan 피드백 스타일
- 스크린샷으로 문제 보여줌
- "잘림", "중심 안맞음", "여백 없음", "줄바꿈됨" 등 직관적 피드백
- 수정 후 바로 새로고침해서 확인
