# 배포 & 설정 가이드 (내부 작업용)

## 1. Vercel 배포

```bash
# Vercel CLI 설치 (이미 있으면 스킵)
npm i -g vercel

# 프로젝트 폴더에서 배포
cd E:/project/ecommerce-behavior-data-analysis
vercel

# 프롬프트 응답:
#   Set up and deploy? → Y
#   Which scope? → gonnector 선택
#   Link to existing project? → N
#   Project name? → workshop-dms2026
#   Directory? → ./  (기본값)
#   Override settings? → N
```

### 커스텀 도메인 설정
1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. `workshop.gonnector.com` 추가
3. DNS에 CNAME 레코드: `workshop` → `cname.vercel-dns.com`

### 환경변수 설정 (Clarity ID 받은 후)
```bash
vercel env add NEXT_PUBLIC_CLARITY_PROJECT_ID
# → production 선택 → Clarity Project ID 입력

# 환경변수 적용 재배포
vercel --prod
```

**참고**: `next.config.js`에 `basePath: '/ecommerce'` 설정됨 → URL: `workshop.gonnector.com/ecommerce`

---

## 2. Clarity 프로젝트 생성

1. https://clarity.microsoft.com 접속 → Microsoft 계정 로그인
2. **+ New project** 클릭
3. **Name**: `KOMMA Workshop`
4. **Website URL**: `https://workshop.gonnector.com/ecommerce`
5. 프로젝트 생성 완료 → **Settings > Overview**에서 **Project ID** 복사
6. **Settings > Setup > Advanced Settings > Bot Detection → OFF** (필수!)
7. **Settings > Copilot** → ON 확인
8. 위 Vercel 환경변수에 Project ID 설정 후 재배포

### Clarity에서 확인할 것
- 배포 후 5~10분 내에 대시보드에 첫 세션이 잡히는지 확인
- Settings > Setup 에서 "Clarity is active" 상태 확인

---

## 3. 태깅 테스트

[docs/tagging-test-scenarios.md](tagging-test-scenarios.md) 참조.

테스트 시 반드시 `?mode=test` 파라미터로 접속:
```
https://workshop.gonnector.com/ecommerce?mode=test
```
→ Clarity에서 `data_source: test`로 필터링하여 시뮬레이션 데이터와 분리.

---

## 4. 봇 시뮬레이션 실행

```bash
cd scripts/
npm install
npm run simulate
```

환경변수:
- `BASE_URL` — 기본: https://workshop.gonnector.com/ecommerce
- `TOTAL_SESSIONS` — 기본: 100
- `HEADLESS` — 기본: true (테스트 시 false로)

---

## 5. 작업 순서 체크리스트

- [ ] Vercel 배포
- [ ] 커스텀 도메인 설정 (DNS CNAME)
- [ ] Clarity 프로젝트 생성
- [ ] Bot Detection OFF
- [ ] Vercel 환경변수에 Clarity Project ID 설정
- [ ] 재배포 (`vercel --prod`)
- [ ] 테스트 접속 (`?mode=test`) → Clarity에 세션 잡히는지 확인
- [ ] 태깅 테스트 시나리오 수행 (docs/tagging-test-scenarios.md)
- [ ] 봇 시뮬레이션 실행
- [ ] Clarity 대시보드에서 simulation 데이터 확인
- [ ] 코호트별 필터링 동작 확인
- [ ] Export CSV 다운로드 테스트
- [ ] 슬라이드 최종 리뷰
- [ ] FigJam 보드 생성 & 링크 준비
