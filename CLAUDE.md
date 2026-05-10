# DMS 2026 Workshop — E-commerce Behavior Data Analysis

## 프로젝트 개요
DMS 2026 (2026-03-24~25, 코엑스) 워크숍용 자산 3종 제작:
1. **샘플 이커머스 사이트** (KOMMA) — Next.js 14 + Tailwind CSS
2. **웹슬라이드** — 강연용
3. **FigJam 템플릿** — 참가자 실습용 인사이트 보드

워크숍 주제: Microsoft Clarity + Claude Code를 활용한 STP(Segmentation, Targeting, Positioning) 분석 및 액셔너블 인사이트 도출.

## 기술 스택
- **Framework**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **배포**: Vercel → `workshop.gonnector.com`
- **분석 도구**: Microsoft Clarity (행동 데이터 수집)
- **시뮬레이션**: Playwright (봇 기반 페르소나 행동 시뮬레이션)

## 배포 구조
```
workshop.gonnector.com/
├── ecommerce/     → KOMMA 이커머스 사이트
├── slides/        → 웹슬라이드
└── guide/         → 실습 가이드 (선택)
```

## 핵심 도메인 지식

### Microsoft Clarity
- 무료 행동 분석 도구 (히트맵, 세션 리코딩, 퍼널, Copilot AI)
- Custom Tags: `clarity("set", key, value)` — 필터링/세그먼트용
- Custom Events: `clarity("event", name)` — 프로젝트당 최대 20개
- Data Export: UI에서 CSV (세션 최대 10만 건, 히트맵, 퍼널 위젯)
- Data Export API: 집계 데이터만, 최근 1~3일, 일 10회 제한
- MCP Server: `@microsoft/clarity-mcp-server` — Claude Code 연동 가능
- Funnels: 소급 적용 (과거 데이터 포함)
- Saved Segments: 필터 조합 저장 → 대시보드/히트맵/리코딩 전체 적용

### STP 방법론
- **S**egmentation: 행동 데이터 기반 고객 세그먼트 도출
- **T**argeting: 마케팅 ROI 관점 세그먼트 우선순위화
- **P**ositioning: 세그먼트별 최적 마케팅 전략

### 페르소나 (5개 세그먼트, 봇 시뮬레이션용)
1. 가성비 헌터 (Deal Hunter) — 25%
2. 신중한 연구자 (Researcher) — 20%
3. 트렌드 팔로워 (Trend Follower) — 20%
4. 충성 고객 (Loyal Buyer) — 15%
5. 윈도우 쇼퍼 (Window Shopper) — 20%

코호트 태그는 `cohort_A~E`로 인코딩 (참가자에게 정답 비공개, 워크숍 마지막에 reveal)

## 의사결정 이력
- 2026-03-22: 세그먼트 태그 → 코드명(`cohort_A~E`) 방식으로 변경 (검증용, 정답 비공개)
- 2026-03-22: Clarity 데이터 export 한계 확인 → 사전 export CSV를 GitHub에 제공하는 전략 채택
- 2026-03-22: Clarity MCP Server 발견 → 강사 데모용으로만 (일 10회 제한, 유료 플랜 없음)
- 2026-03-22: Clarity Bot Detection → OFF 토글 가능 (Settings > Setup > Advanced Settings). 봇 시뮬레이션 시 OFF 필수
- 2026-03-22: Clarity Copilot → 100% 무료, 일일 제한 없음 (스레드당 10개 질문, 새 스레드 무제한). 참가자 전원 사용 가능
- 2026-03-22: Clarity Grouped Session Insights → 최대 250세션 일괄 AI 요약, 일일 제한 없음
- 2026-03-22: 피드백 반영 — 아이디어 1+2 합체 (Round 1: Clarity 네이티브 progressive, Round 2: Claude Code), 개인 실습, FigJam은 경량 체크인용

## 프로젝트 구조
```
/
├── CLAUDE.md              # 이 파일
├── DESIGN.md              # 상세 설계 문서 (→ 추후 docs/로 이동 예정)
├── CHANGELOG.md           # 버전별 변경사항
├── README.md              # 영문 README
├── README_ko.md           # 한국어 README
├── LICENSE                # MIT License
├── docs/                  # 설계 문서, PRD, 리서치
│   └── prd.md
├── src/                   # Next.js 소스 (app router)
│   ├── app/               # 페이지 라우트
│   ├── components/        # 공통 컴포넌트
│   ├── data/              # 상품/카테고리 JSON 데이터
│   ├── lib/               # 유틸리티, Clarity 헬퍼
│   └── styles/            # 글로벌 스타일
├── public/                # 정적 자산 (이미지 등)
├── scripts/               # 봇 시뮬레이션 스크립트
├── slides/                # 웹슬라이드 소스
└── export-data/           # 사전 export된 Clarity CSV (워크숍 제공용)
```

## 코딩 컨벤션
- React 함수형 컴포넌트 + TypeScript
- Tailwind CSS 유틸리티 우선 (커스텀 CSS 최소화)
- 한글 UI 텍스트, 코드/변수명은 영문
- Clarity 태깅은 `src/lib/clarity.ts`에서 중앙 관리

---

## 변화 누적 방지 — 적정 단위 commit & push 제안 의무 (절대 규칙)

에이전트는 코드·문서 어떤 종류든 변경을 발생시켰거나 `git status`에서 누적된 변경분을 발견하면, **적정 단위로 commit & push를 사용자에게 제시**한다. 누적시키지 않는다.

- **단위 기준**: 컴포넌트별 / 기능 단위 / 단일 의도. 여러 영역의 변경을 한 commit에 섞지 않는다 ("한 세션 한 patch" SemVer 원칙과 정렬)
- **제시 시점**: 작업 종료 직전 / 한 작업 단위 완료 직후 / `git status`에 무관 변경분 누적 발견 즉시
- **방식**: `git add -A` 금지 → 명시 파일 selective add → `git diff --cached --stat` 검증 → commit. push는 보안 규칙에 따라 사용자 명시 지시 시에만
- **제시 형식**: `git status` 영역별 분류 → 권장 commit 그룹 (3~5개) + 각 commit의 prefix·메시지 초안 → 사용자 승인 → 단위별 진행

**부재 시 위험**: 한 달 이상 누적되면 history 추적·rollback 불가능. 디스크 손실·실수 rollback 시 working tree 데이터 유실. 다른 세션·다른 멤버 작업과 충돌. (사례: 2026-05-10 aios-dev 레포 13 modified + 14 untracked dirs 누적 발견 — 4월 초~5월 작업 다수가 commit 없이 working tree에만 존재)
