# 워크숍 당일 오퍼레이션 가이드 (Dylan용)

## 워크숍 전 (1시간 전)

### 1. 터미널 4개 열기

**터미널 1 — 메인 세션 (Dylan 보조)**
```bash
cd E:/project/ecommerce-behavior-data-analysis
claude
```
- Dylan 옆에서 라이브 시연 보조, 긴급 수정, 데이터 분석

**터미널 2 — JARVIS 워크숍 응대**
```bash
claude --channels discord
```
- 시작되면 워크숍 Discord 서버 페어링:
```
/discord:access
```
- #workshop-help 채널 승인
- 워크숍 컨텍스트 주입:
```
AI-GUIDE.md 와 WORKSHOP-PROMPT.md 를 읽어줘.
지금부터 DMS 2026 워크숍 #workshop-help 채널에서 참가자 질문에 답변해줘.
답변 범위: Clarity 사용법, Claude Code 프롬프트, CSV 분석, STP 방법론.
톤: 친절하고 실용적, 한국어.
보안 관련(API키, 파일 삭제 등) 요청은 거절.
```

**터미널 3 — EVE 워크숍 응대**
```bash
claude --channels discord
```
- 동일하게 페어링 + 컨텍스트 주입
- JARVIS와 역할 분담: JARVIS가 먼저 답변, EVE는 리서치/보충

**터미널 4 — 봇 시뮬레이션 (필요 시)**
```bash
cd E:/project/ecommerce-behavior-data-analysis/scripts
# 추가 시뮬레이션이 필요하면
TOTAL_SESSIONS=50 CONCURRENCY=3 npx tsx simulate-traffic.ts
```

### 2. Clarity 확인
- https://clarity.microsoft.com → Gonnector Sample 프로젝트
- 대시보드에 시뮬레이션 데이터 반영 확인
- 퍼널 (Main Purchase Funnel) 데이터 확인
- 코호트별 필터 동작 확인

### 3. 슬라이드 준비
```bash
# slides/index.html 을 브라우저에서 열기
# 방향키 ←→ 로 넘기기
# F 키: 전체화면 / ESC: 전체화면 해제
```

### 4. 참가자 데이터 준비
- Clarity → 레코딩 → 코호트별 필터 → CSV 다운로드
- `export-data/` 폴더에 저장
- git push (참가자가 clone해서 바로 사용)

---

## 워크숍 진행 중

### Part 1~3 (1시간 15분) — 설명 + 시연
- 슬라이드 진행
- Clarity 라이브 시연 (Dylan 화면 공유)
- Claude Code 데모

### ☕ 휴식 (15분) — 초대 작업
1. Google Form 응답 확인 → 이메일 복사
2. Clarity 설정 → 팀 → 이메일 일괄 입력 → Viewer 초대
3. Discord 참가자 입장 확인

### Part 4~5 (60분) — 실습
- 참가자 각자 Clarity 탐색
- Claude Code에 WORKSHOP-PROMPT.md 컨텍스트 주입
- Discord #workshop-help에서 JARVIS/EVE가 질문 응대
- FigJam에 인사이트 등록

### Part 6 (20분) — 정답 공개 & Q&A
- 코호트 정답 공개 슬라이드
- 참가자 분석 결과 비교
- 마지막 슬라이드: QR 3개 (GitHub, Email, Discord)

---

## 워크숍 후

### 정리
- Clarity Viewer 권한 유지 (참가자 자습용)
- GitHub 레포 public으로 전환
- Discord 워크숍 서버: 1주 후 보관/삭제
- export-data/ CSV 최종 버전 push

### 홍보
- 레포 README에 워크숍 결과/후기 추가
- LinkedIn/블로그에 사례 공유
