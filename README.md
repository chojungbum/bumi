# 광수호텔 공식 홈페이지 (kwangsuhotel.com)

> **개발자 인수인계용 안내**
>
> - `production` 브랜치(이 브랜치): 실제 오픈용 전체 코드 — 결제 승인 서버(Cloudflare Pages Functions), 예약 저장(KV), 관리자 페이지 포함
> - `main` 브랜치: 테스트 사이트(test.kwangsuhotel.com, GitHub Pages) — 결제 서버·관리자 페이지 제외, 결제는 토스 테스트창까지만 동작
> - 정적 HTML/CSS/바닐라 JS(ES 모듈), 빌드 과정 없음. 결제는 토스페이먼츠 결제위젯 v2
> - 금액은 `js/pricing.js` 한 곳에서 계산하며, 브라우저와 서버(`functions/api/*.js`)가 같은 파일을 import해 서버에서 재계산·검증함
> - 로컬 실행: `npx wrangler pages dev . --kv RESERVATIONS --binding TOSS_SECRET_KEY=<test_gsk...> --binding ADMIN_TOKEN=<임의값>`
> - 요금·객실 구성·사업자 정보·약관은 임시값/초안 — 확정 필요


국·영·일·중 4개 국어, 객실 예약과 토스페이먼츠 결제까지 포함된 홈페이지입니다.
**Cloudflare Pages**(무료 플랜 가능)에 올리는 것을 기준으로 만들었습니다.

## 1. 폴더 구성

| 경로 | 내용 |
|---|---|
| `index.html` | 메인 (첫 화면 안내 팝업 포함) |
| `booking/` | 예약 → 결제 → 완료/실패 화면 |
| `policy.html` | 취소·환불 규정, 이용약관, 개인정보처리방침 (**초안**) |
| `admin/` | 예약 목록 조회·CSV 저장 (관리자 토큰 필요) |
| `js/config.js` | **회사 정보·연락처·결제 키·팝업 설정** |
| `js/pricing.js` | **객실·요금·예약 가능 시작일·성수기** (서버도 이 파일로 금액 검증) |
| `js/i18n.js` | 4개 국어 문구 |
| `functions/api/` | 결제 서버 (주문 생성, 결제 승인, 예약 조회) |
| `images/` | 사진 (웹용 압축본, 총 1.3MB) |

## 2. 배포 전에 채울 항목

1. `js/config.js` → `bizNo`(사업자번호), `mailOrderNo`(통신판매업 신고번호), `lodgingNo`(숙박업 영업신고번호), `phone`, `email`
2. `js/pricing.js`
   - `openFrom`: **점유 확보 예정일**을 넣으면 그 전 날짜로는 예약이 들어오지 않습니다. 예: `'2026-11-01'`
   - 객실별 요금(`weekday`/`weekend`/`peak`), 인원, 침대, `allotment`(홈페이지에 배정할 1일 판매 객실 수)
3. `policy.html` → 환불 규정·약관은 초안이므로 법률 검토 후 확정

## 3. Cloudflare Pages 배포

```bash
npm i -g wrangler
wrangler login
wrangler kv namespace create RESERVATIONS        # 출력되는 id 메모
wrangler pages project create kwangsuhotel
wrangler pages deploy . --project-name kwangsuhotel
```

그다음 Cloudflare 대시보드 → Workers & Pages → kwangsuhotel → **설정**에서:

- **바인딩** → KV 네임스페이스 추가: 변수명 `RESERVATIONS` → 위에서 만든 KV 선택
- **환경 변수(암호화)**
  - `TOSS_SECRET_KEY` : 토스페이먼츠 시크릿 키 (테스트: `test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6`)
  - `ADMIN_TOKEN` : 관리자 페이지용 임의의 긴 비밀번호
  - `NOTIFY_WEBHOOK_URL` (선택) : 예약 발생 시 알림받을 Slack/Discord 웹훅 주소
- **사용자 지정 도메인** → `kwangsuhotel.com`, `www.kwangsuhotel.com` 연결 (도메인 네임서버를 Cloudflare로 변경하거나 CNAME 지정)
- 설정 변경 후 한 번 더 `wrangler pages deploy .`

> 대시보드에 zip을 끌어다 놓는 방식은 결제 서버(functions)가 동작하지 않으니 반드시 위 명령어나 GitHub 연동으로 배포하세요.

## 4. 실제 결제 전환 절차

1. **통신판매업 신고** (해운대구청, ㈜광수호텔 명의): 온라인으로 결제를 받으려면 필수입니다.
2. **토스페이먼츠 가맹 계약** (㈜광수호텔 사업자) → 결제위젯 **live 클라이언트 키 / 시크릿 키** 발급
3. `js/config.js`의 `clientKey`를 live 키로 교체하고 `testMode: false`로 변경
4. Cloudflare 환경변수 `TOSS_SECRET_KEY`를 live 시크릿 키로 교체한 뒤 재배포
5. 외국 카드·PayPal 결제는 토스페이먼츠에 해외결제를 별도로 신청해야 합니다.

## 5. 운영

- 예약 조회: `https://kwangsuhotel.com/admin/` → ADMIN_TOKEN 입력 → 조회 / CSV 저장
- 취소·환불: 토스페이먼츠 상점관리자에서 결제 취소
- 재고: 결제가 완료되면 객실 타입·날짜별 판매 수가 자동으로 줄어들고, `allotment`를 넘으면 해당 날짜는 "마감"으로 처리됩니다. OTA 판매분과는 연동되지 않으니 `allotment`로 홈페이지 판매분을 나눠 관리하세요.
- 사진 교체: `images/` 안의 같은 파일명으로 덮어쓰면 됩니다. 가로형 권장, 장당 200KB 이하
- 안내 팝업: `js/config.js`의 `NOTICE_POPUP.enabled`로 켜고 끕니다. 문구는 `js/i18n.js`의 `pop.body`에서 수정합니다.
