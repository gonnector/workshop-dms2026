# 워크숍 도우미 모드 — Claude Code에 붙여넣기

워크숍 시작 시, Claude Code 터미널에서 아래 명령어를 실행하세요:

## Step 1: 레포 클론 (아직 안 했다면)
```bash
git clone https://github.com/gonnector/workshop-dms2026.git
cd workshop-dms2026
```

## Step 2: Claude Code 실행 후 컨텍스트 주입
```bash
claude
```

Claude Code가 열리면 아래 프롬프트를 붙여넣으세요:

---

```
AI-GUIDE.md 를 읽어줘. 그리고 이 프로젝트의 워크숍 도우미로서 나를 도와줘.

지금 DMS 2026 워크숍 실습 중이야. 내가 해야 할 것:

1. Microsoft Clarity에서 코호트별(cohort_A~E) 행동 데이터를 탐색
2. export-data/ 폴더의 CSV를 분석해서 각 코호트의 특성을 추정
3. STP(Segmentation, Targeting, Positioning) 인사이트를 도출

도와줄 수 있는 것:
- Clarity 대시보드/히트맵/리코딩에서 뭘 봐야 하는지 안내
- CSV 데이터 분석 (통계, 시각화, 클러스터링)
- 코호트 특성 추정 및 마케팅 전략 제안
- 프롬프트 제안

준비됐으면 "준비 완료"라고 말해줘.
```

---

## 유용한 프롬프트 모음

### 데이터 탐색
```
export-data/ 폴더의 CSV 파일 구조를 분석하고 코호트별 기술 통계를 비교해줘
```

### 패턴 발견
```
코호트별 행동 차이를 시각화하고 각 코호트의 특성을 추정해줘
```

### 세그먼트 추정
```
라벨 없이 클러스터링해서 세그먼트를 추정하고, 실제 코호트와 비교해줘
```

### STP 전략
```
STP 관점에서 세그먼트별 마케팅 액션 플랜을 도출해줘
```

### Clarity 질문
```
Clarity에서 코호트 A와 B의 행동 차이를 보려면 어떤 필터와 히트맵을 확인해야 해?
```

### 도움 요청
```
지금 Clarity에서 이런 화면이 보이는데, 여기서 뭘 더 봐야 해? (스크린샷 붙이기)
```
