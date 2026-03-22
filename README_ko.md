[English](README.md) | [한국어](README_ko.md)

# 이커머스 행동 데이터 분석 워크숍

**DMS 2026 워크숍** — Microsoft Clarity + Claude Code를 활용한 STP 분석

## 개요

DMS 2026 (디지털 마케팅 서밋) 워크숍에 사용되는 모든 자산을 포함하는 레포지토리입니다:

1. **KOMMA** — Microsoft Clarity가 연동된 샘플 이커머스 웹사이트
2. **웹슬라이드** — 워크숍 발표 슬라이드
3. **실습 데이터** — 사전 추출된 Clarity 데이터

## 워크숍 소개

참가자들은 샘플 이커머스 사이트에서 시뮬레이션된 고객 행동 데이터를 Microsoft Clarity와 Claude Code를 활용하여 분석하고, STP(세그멘테이션, 타겟팅, 포지셔닝) 분석을 수행하여 실행 가능한 마케팅 인사이트를 도출합니다.

## 기술 스택

- **사이트**: Next.js 14 (App Router) + Tailwind CSS
- **분석**: Microsoft Clarity
- **AI 에이전트**: Claude Code
- **협업**: FigJam
- **배포**: Vercel

## 시작하기

```bash
# 레포지토리 클론
git clone https://github.com/gonnector/ecommerce-behavior-data-analysis.git
cd ecommerce-behavior-data-analysis

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 트래픽 시뮬레이션

Playwright를 활용하여 5가지 고객 페르소나의 현실적 행동 데이터를 생성합니다:

```bash
cd scripts
npm install
npx playwright install chromium
npm run simulate          # 100 세션, 헤드리스
npm run simulate:debug    # 5 세션, 브라우저 표시 (테스트용)
```

자세한 설정 및 페르소나 설명은 [scripts/README.md](scripts/README.md)를 참조하세요.

## 워크숍 자료

- [설계 문서](DESIGN.md)
- [실습 데이터](export-data/) — 사전 추출된 Clarity CSV 파일

## 라이선스

[MIT](LICENSE) — Copyright (c) 2026 Gonnector (고영혁)
