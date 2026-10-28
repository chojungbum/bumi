// 4개 국어 문구 — {old}, {new} 등은 자동 치환됩니다.
export const LANGS = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
];

export const DICT = {
  ko: {
    'meta.title': '광수호텔 해운대 | 공식 홈페이지',
    'nav.about': '호텔 소개', 'nav.rooms': '객실', 'nav.facilities': '부대시설', 'nav.location': '오시는 길', 'nav.book': '예약하기',
    'hero.eyebrow': 'HAEUNDAE · BUSAN',
    'hero.title': '바다와 도시 사이,<br>해운대의 하루를 머무는 곳',
    'hero.sub': '해운대해수욕장 도보 5분, 광수호텔 공식 홈페이지 예약',
    'bar.checkin': '체크인', 'bar.checkout': '체크아웃', 'bar.adults': '성인', 'bar.children': '아동', 'bar.search': '객실 검색',
    'about.eyebrow': 'ABOUT', 'about.title': '해운대의 중심에서 만나는 편안한 휴식',
    'about.lead': '광수호텔은 해운대해수욕장과 해운대역 사이에 위치해 휴양과 쇼핑, 비즈니스를 모두 가까이 누릴 수 있는 호텔입니다. 공식 홈페이지에서 가장 합리적인 요금으로 예약하세요.',
    'about.k1t': '해운대해수욕장 도보 5분', 'about.k1d': '바다까지 산책하듯 걸어서',
    'about.k2t': '해운대역 도보 6분', 'about.k2d': '지하철 2호선으로 편리한 이동',
    'about.k3t': '벡스코·센텀시티 차량 5분', 'about.k3d': '전시·쇼핑·비즈니스 접근성',
    'rooms.eyebrow': 'ROOMS', 'rooms.title': '객실 안내', 'rooms.lead': '모든 객실에 무료 Wi-Fi, 스마트 TV, 냉장고, 전기포트, 개인 금고가 구비되어 있습니다.',
    'rooms.bed': '침대', 'rooms.capacity': '기준 인원', 'rooms.size': '면적', 'rooms.from': '1박 최저', 'rooms.people': '{n}명', 'rooms.book': '이 객실 예약',
    'fac.eyebrow': 'FACILITIES', 'fac.title': '부대시설',
    'fac.f1t': '조식 레스토랑', 'fac.f1d': '2층 · 07:00–10:00 (입장 마감 09:30)<br>성인 {bfa} / 아동 {bfc}',
    'fac.f2t': '카페 라운지', 'fac.f2d': '24시간 운영되는 셀프 카페 라운지',
    'fac.f3t': '편의점', 'fac.f3d': '호텔 내 24시간 편의점',
    'fac.f4t': '주차', 'fac.f4d': '선착순 유료 주차 (1박 차량 1대 10,000원)',
    'fac.note': '전 객실 및 건물 전체 금연입니다.',
    'loc.eyebrow': 'LOCATION', 'loc.title': '오시는 길', 'loc.addr': '주소', 'loc.tel': '전화', 'loc.time': '체크인 / 체크아웃',
    'loc.t1': '지하철 2호선 해운대역 도보 약 6분', 'loc.t2': '김해국제공항에서 차량 약 40분', 'loc.t3': 'KTX 부산역에서 차량 약 35분',
    'loc.map': '지도에서 보기',
    'ft.company': '상호', 'ft.ceo': '대표이사', 'ft.biz': '사업자등록번호', 'ft.mail': '통신판매업 신고', 'ft.lodging': '숙박업 영업신고', 'ft.addr': '주소', 'ft.tel': '대표전화', 'ft.email': '이메일',
    'ft.terms': '이용약관', 'ft.privacy': '개인정보처리방침', 'ft.refund': '취소·환불 규정', 'ft.official': '공식 홈페이지',
    'pop.title': '공식 홈페이지 안내',
    'pop.body': '광수호텔의 <b>숙박업 영업신고 명의자는 주식회사 광수호텔</b>이며, 공식 홈페이지는 <b>{new}</b> 입니다.<br><br>기존 도메인 <b>{old}</b> 및 해당 사이트의 예약 페이지는 <b>당사가 운영하지 않는 사이트</b>입니다. 해당 사이트를 통한 예약·결제는 당사와 무관하오니, 예약 전 반드시 공식 홈페이지 여부를 확인해 주시기 바랍니다.',
    'pop.today': '오늘 하루 보지 않기', 'pop.close': '닫기',
    // booking
    'bk.title': '객실 예약', 'bk.test': '테스트 결제 모드 — 실제 청구되지 않습니다',
    'bk.s1': '일정 선택', 'bk.s2': '객실 선택', 'bk.s3': '투숙객 정보', 'bk.s4': '결제',
    'bk.searchBtn': '예약 가능한 객실 보기', 'bk.nights': '{n}박', 'bk.select': '선택', 'bk.selected': '선택됨', 'bk.totalFor': '{n}박 총액',
    'bk.soldout': '마감', 'bk.overCap': '인원 초과',
    'bk.name': '예약자 성명', 'bk.namePh': '여권 또는 신분증상의 이름', 'bk.phone': '휴대전화', 'bk.phonePh': '숫자만 입력 (해외 번호는 국가번호 포함)', 'bk.email': '이메일', 'bk.request': '요청 사항 (선택)',
    'bk.breakfast': '조식 추가', 'bk.breakfastNote': '1인 1박 성인 {bfa} / 아동 {bfc}',
    'bk.agree': '<a href="/policy.html#refund" target="_blank">취소·환불 규정</a>, <a href="/policy.html#terms" target="_blank">이용약관</a> 및 <a href="/policy.html#privacy" target="_blank">개인정보 수집·이용</a>에 동의합니다.',
    'bk.toPay': '결제 단계로', 'bk.pay': '{amount} 결제하기', 'bk.back': '이전',
    'bk.sum': '예약 요약', 'bk.room': '객실', 'bk.dates': '일정', 'bk.guests': '인원', 'bk.roomTotal': '객실 요금', 'bk.bfTotal': '조식', 'bk.total': '총 결제 금액',
    'bk.adultsN': '성인 {a}', 'bk.childrenN': '아동 {c}',
    'bk.weekday': '주중', 'bk.weekend': '주말', 'bk.peak': '성수기',
    'bk.openFrom': '{date} 체크인부터 예약하실 수 있습니다.',
    'err.DATE': '날짜를 확인해 주세요.', 'err.TOO_EARLY': '선택하신 날짜는 예약할 수 없습니다.', 'err.TOO_FAR': '예약 가능 기간을 초과했습니다.',
    'err.NIGHTS': '숙박 기간은 1박 이상 {max}박 이하로 선택해 주세요.', 'err.GUESTS': '인원이 객실 기준을 초과합니다.', 'err.ROOM': '객실을 선택해 주세요.',
    'err.SOLD_OUT': '선택하신 기간에 해당 객실이 마감되었습니다.', 'err.NAME': '성명을 입력해 주세요.', 'err.PHONE': '휴대전화 번호를 확인해 주세요.', 'err.EMAIL': '이메일을 확인해 주세요.',
    'err.AGREE': '약관에 동의해 주세요.', 'err.NETWORK': '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    'ok.title': '예약이 완료되었습니다', 'ok.desc': '입력하신 이메일로 예약 내용을 안내해 드립니다. 아래 예약번호를 보관해 주세요.',
    'ok.no': '예약번호', 'ok.paid': '결제 금액', 'ok.receipt': '영수증 보기', 'ok.home': '홈으로', 'ok.confirming': '결제를 확인하고 있습니다…',
    'ng.title': '결제가 완료되지 않았습니다', 'ng.desc': '결제가 취소되었거나 오류가 발생했습니다. 다시 시도해 주세요.', 'ng.retry': '다시 예약하기',
  },

  en: {
    'meta.title': 'Kwangsu Hotel Haeundae | Official Website',
    'nav.about': 'About', 'nav.rooms': 'Rooms', 'nav.facilities': 'Facilities', 'nav.location': 'Location', 'nav.book': 'Book Now',
    'hero.eyebrow': 'HAEUNDAE · BUSAN',
    'hero.title': 'Between the sea and the city,<br>your stay in Haeundae',
    'hero.sub': '5 minutes on foot to Haeundae Beach — best rates on our official website',
    'bar.checkin': 'Check-in', 'bar.checkout': 'Check-out', 'bar.adults': 'Adults', 'bar.children': 'Children', 'bar.search': 'Search Rooms',
    'about.eyebrow': 'ABOUT', 'about.title': 'Comfort at the heart of Haeundae',
    'about.lead': 'Located between Haeundae Beach and Haeundae Station, Kwangsu Hotel puts the beach, shopping and business districts within easy reach. Book here for our best available rates.',
    'about.k1t': '5 min walk to Haeundae Beach', 'about.k1d': 'A short stroll to the sea',
    'about.k2t': '6 min walk to Haeundae Station', 'about.k2d': 'Easy access via Metro Line 2',
    'about.k3t': '5 min drive to BEXCO & Centum City', 'about.k3d': 'Exhibitions, shopping and business',
    'rooms.eyebrow': 'ROOMS', 'rooms.title': 'Rooms', 'rooms.lead': 'Every room includes free Wi-Fi, smart TV, refrigerator, electric kettle and in-room safe.',
    'rooms.bed': 'Bed', 'rooms.capacity': 'Occupancy', 'rooms.size': 'Size', 'rooms.from': 'From', 'rooms.people': '{n} guests', 'rooms.book': 'Book this room',
    'fac.eyebrow': 'FACILITIES', 'fac.title': 'Facilities',
    'fac.f1t': 'Breakfast Restaurant', 'fac.f1d': '2F · 07:00–10:00 (last entry 09:30)<br>Adult {bfa} / Child {bfc}',
    'fac.f2t': 'Café Lounge', 'fac.f2d': 'Self-service café lounge, open 24 hours',
    'fac.f3t': 'Convenience Store', 'fac.f3d': 'In-house convenience store, open 24 hours',
    'fac.f4t': 'Parking', 'fac.f4d': 'Paid parking, first come first served (KRW 10,000 per car per night)',
    'fac.note': 'All rooms and the entire building are non-smoking.',
    'loc.eyebrow': 'LOCATION', 'loc.title': 'Location', 'loc.addr': 'Address', 'loc.tel': 'Phone', 'loc.time': 'Check-in / Check-out',
    'loc.t1': 'About 6 min walk from Haeundae Station (Line 2)', 'loc.t2': 'About 40 min by car from Gimhae International Airport', 'loc.t3': 'About 35 min by car from Busan KTX Station',
    'loc.map': 'View on map',
    'ft.company': 'Company', 'ft.ceo': 'CEO', 'ft.biz': 'Business Reg. No.', 'ft.mail': 'E-commerce Reg. No.', 'ft.lodging': 'Lodging Business Reg.', 'ft.addr': 'Address', 'ft.tel': 'Phone', 'ft.email': 'Email',
    'ft.terms': 'Terms of Use', 'ft.privacy': 'Privacy Policy', 'ft.refund': 'Cancellation Policy', 'ft.official': 'Official website',
    'pop.title': 'Official Website Notice',
    'pop.body': 'The <b>registered lodging business operator of Kwangsu Hotel is Kwangsu Hotel Co., Ltd. (주식회사 광수호텔)</b>, and our official website is <b>{new}</b>.<br><br>The former domain <b>{old}</b> and its booking pages are <b>not operated by us</b>. Reservations and payments made through that site are not affiliated with us. Please make sure you are on the official website before booking.',
    'pop.today': "Don't show again today", 'pop.close': 'Close',
    'bk.title': 'Reservation', 'bk.test': 'TEST PAYMENT MODE — you will not be charged',
    'bk.s1': 'Dates', 'bk.s2': 'Room', 'bk.s3': 'Guest details', 'bk.s4': 'Payment',
    'bk.searchBtn': 'Show available rooms', 'bk.nights': '{n} night(s)', 'bk.select': 'Select', 'bk.selected': 'Selected', 'bk.totalFor': 'Total for {n} night(s)',
    'bk.soldout': 'Sold out', 'bk.overCap': 'Over capacity',
    'bk.name': 'Guest name', 'bk.namePh': 'As shown on passport / ID', 'bk.phone': 'Mobile', 'bk.phonePh': 'Digits only, include country code', 'bk.email': 'Email', 'bk.request': 'Special requests (optional)',
    'bk.breakfast': 'Add breakfast', 'bk.breakfastNote': 'Per person per night: adult {bfa} / child {bfc}',
    'bk.agree': 'I agree to the <a href="/policy.html#refund" target="_blank">cancellation policy</a>, <a href="/policy.html#terms" target="_blank">terms</a> and <a href="/policy.html#privacy" target="_blank">privacy policy</a>.',
    'bk.toPay': 'Continue to payment', 'bk.pay': 'Pay {amount}', 'bk.back': 'Back',
    'bk.sum': 'Summary', 'bk.room': 'Room', 'bk.dates': 'Dates', 'bk.guests': 'Guests', 'bk.roomTotal': 'Room', 'bk.bfTotal': 'Breakfast', 'bk.total': 'Total',
    'bk.adultsN': '{a} adult(s)', 'bk.childrenN': '{c} child(ren)',
    'bk.weekday': 'Weekday', 'bk.weekend': 'Weekend', 'bk.peak': 'Peak',
    'bk.openFrom': 'Bookings are available for check-in from {date}.',
    'err.DATE': 'Please check the dates.', 'err.TOO_EARLY': 'The selected date is not available.', 'err.TOO_FAR': 'The selected date is beyond the booking window.',
    'err.NIGHTS': 'Please select between 1 and {max} nights.', 'err.GUESTS': 'The number of guests exceeds room occupancy.', 'err.ROOM': 'Please select a room.',
    'err.SOLD_OUT': 'This room is sold out for the selected dates.', 'err.NAME': 'Please enter your name.', 'err.PHONE': 'Please check your phone number.', 'err.EMAIL': 'Please check your email.',
    'err.AGREE': 'Please accept the terms.', 'err.NETWORK': 'A temporary error occurred. Please try again shortly.',
    'ok.title': 'Your reservation is confirmed', 'ok.desc': 'A confirmation will be sent to your email. Please keep your reservation number.',
    'ok.no': 'Reservation No.', 'ok.paid': 'Amount paid', 'ok.receipt': 'View receipt', 'ok.home': 'Home', 'ok.confirming': 'Confirming your payment…',
    'ng.title': 'Payment was not completed', 'ng.desc': 'The payment was cancelled or an error occurred. Please try again.', 'ng.retry': 'Try again',
  },

  ja: {
    'meta.title': 'クァンスホテル 海雲台 | 公式ホームページ',
    'nav.about': 'ホテル紹介', 'nav.rooms': '客室', 'nav.facilities': '館内施設', 'nav.location': 'アクセス', 'nav.book': 'ご予約',
    'hero.eyebrow': 'HAEUNDAE · BUSAN',
    'hero.title': '海と街のあいだで、<br>海雲台の一日を過ごす',
    'hero.sub': '海雲台海水浴場まで徒歩5分 — 公式サイト予約がおすすめです',
    'bar.checkin': 'チェックイン', 'bar.checkout': 'チェックアウト', 'bar.adults': '大人', 'bar.children': '子供', 'bar.search': '空室検索',
    'about.eyebrow': 'ABOUT', 'about.title': '海雲台の中心で、心地よい休息を',
    'about.lead': 'クァンスホテルは海雲台海水浴場と海雲台駅の間に位置し、リゾート・ショッピング・ビジネスのいずれにも便利なホテルです。公式サイトから最もお得な料金でご予約ください。',
    'about.k1t': '海雲台海水浴場まで徒歩5分', 'about.k1d': '散歩気分で海へ',
    'about.k2t': '海雲台駅まで徒歩6分', 'about.k2d': '地下鉄2号線で快適移動',
    'about.k3t': 'BEXCO・センタムシティまで車で5分', 'about.k3d': '展示会・ショッピング・ビジネスに便利',
    'rooms.eyebrow': 'ROOMS', 'rooms.title': '客室のご案内', 'rooms.lead': '全客室に無料Wi-Fi、スマートTV、冷蔵庫、電気ケトル、セーフティボックスを完備しています。',
    'rooms.bed': 'ベッド', 'rooms.capacity': '定員', 'rooms.size': '広さ', 'rooms.from': '1泊', 'rooms.people': '{n}名', 'rooms.book': 'この客室を予約',
    'fac.eyebrow': 'FACILITIES', 'fac.title': '館内施設',
    'fac.f1t': '朝食レストラン', 'fac.f1d': '2階 · 07:00–10:00(最終入場 09:30)<br>大人 {bfa} / 子供 {bfc}',
    'fac.f2t': 'カフェラウンジ', 'fac.f2d': '24時間営業のセルフカフェラウンジ',
    'fac.f3t': 'コンビニ', 'fac.f3d': '館内24時間営業のコンビニ',
    'fac.f4t': '駐車場', 'fac.f4d': '先着順・有料(1泊1台 10,000ウォン)',
    'fac.note': '全客室および館内全域禁煙です。',
    'loc.eyebrow': 'LOCATION', 'loc.title': 'アクセス', 'loc.addr': '住所', 'loc.tel': '電話', 'loc.time': 'チェックイン / チェックアウト',
    'loc.t1': '地下鉄2号線 海雲台駅から徒歩約6分', 'loc.t2': '金海国際空港から車で約40分', 'loc.t3': 'KTX釜山駅から車で約35分',
    'loc.map': '地図で見る',
    'ft.company': '商号', 'ft.ceo': '代表取締役', 'ft.biz': '事業者登録番号', 'ft.mail': '通信販売業申告', 'ft.lodging': '宿泊業営業申告', 'ft.addr': '住所', 'ft.tel': '代表電話', 'ft.email': 'メール',
    'ft.terms': '利用規約', 'ft.privacy': '個人情報処理方針', 'ft.refund': 'キャンセル・返金規定', 'ft.official': '公式ホームページ',
    'pop.title': '公式ホームページのご案内',
    'pop.body': 'クァンスホテルの<b>宿泊業営業申告の名義人は株式会社クァンスホテル(주식회사 광수호텔)</b>であり、公式ホームページは <b>{new}</b> です。<br><br>旧ドメイン <b>{old}</b> および同サイトの予約ページは<b>当社が運営するものではありません</b>。同サイトを通じたご予約・お支払いは当社とは関係ございませんので、ご予約前に必ず公式ホームページであることをご確認ください。',
    'pop.today': '今日は表示しない', 'pop.close': '閉じる',
    'bk.title': '客室予約', 'bk.test': 'テスト決済モード — 実際には請求されません',
    'bk.s1': '日程選択', 'bk.s2': '客室選択', 'bk.s3': 'ご宿泊者情報', 'bk.s4': 'お支払い',
    'bk.searchBtn': '空室を表示', 'bk.nights': '{n}泊', 'bk.select': '選択', 'bk.selected': '選択中', 'bk.totalFor': '{n}泊 合計',
    'bk.soldout': '満室', 'bk.overCap': '定員超過',
    'bk.name': 'ご予約者名', 'bk.namePh': 'パスポート・身分証の表記どおり', 'bk.phone': '携帯電話', 'bk.phonePh': '数字のみ(国番号を含む)', 'bk.email': 'メールアドレス', 'bk.request': 'ご要望(任意)',
    'bk.breakfast': '朝食を追加', 'bk.breakfastNote': '1名1泊 大人 {bfa} / 子供 {bfc}',
    'bk.agree': '<a href="/policy.html#refund" target="_blank">キャンセル規定</a>・<a href="/policy.html#terms" target="_blank">利用規約</a>・<a href="/policy.html#privacy" target="_blank">個人情報の取扱い</a>に同意します。',
    'bk.toPay': 'お支払いへ進む', 'bk.pay': '{amount} を支払う', 'bk.back': '戻る',
    'bk.sum': 'ご予約内容', 'bk.room': '客室', 'bk.dates': '日程', 'bk.guests': '人数', 'bk.roomTotal': '客室料金', 'bk.bfTotal': '朝食', 'bk.total': 'お支払い合計',
    'bk.adultsN': '大人 {a}名', 'bk.childrenN': '子供 {c}名',
    'bk.weekday': '平日', 'bk.weekend': '週末', 'bk.peak': '繁忙期',
    'bk.openFrom': '{date} チェックイン分からご予約いただけます。',
    'err.DATE': '日付をご確認ください。', 'err.TOO_EARLY': '選択された日付はご予約いただけません。', 'err.TOO_FAR': '予約可能期間を超えています。',
    'err.NIGHTS': '1泊以上{max}泊以下でお選びください。', 'err.GUESTS': '人数が客室定員を超えています。', 'err.ROOM': '客室をお選びください。',
    'err.SOLD_OUT': '選択された期間は満室です。', 'err.NAME': 'お名前をご入力ください。', 'err.PHONE': '電話番号をご確認ください。', 'err.EMAIL': 'メールアドレスをご確認ください。',
    'err.AGREE': '規約に同意してください。', 'err.NETWORK': '一時的なエラーが発生しました。しばらくしてから再度お試しください。',
    'ok.title': 'ご予約が完了しました', 'ok.desc': 'ご入力のメールアドレスへ予約内容をお送りします。予約番号を保管してください。',
    'ok.no': '予約番号', 'ok.paid': 'お支払い金額', 'ok.receipt': '領収書を見る', 'ok.home': 'ホームへ', 'ok.confirming': 'お支払いを確認しています…',
    'ng.title': 'お支払いが完了しませんでした', 'ng.desc': '決済がキャンセルされたか、エラーが発生しました。もう一度お試しください。', 'ng.retry': 'もう一度予約する',
  },

  zh: {
    'meta.title': 'Kwangsu Hotel 海云台 | 官方网站',
    'nav.about': '酒店介绍', 'nav.rooms': '客房', 'nav.facilities': '酒店设施', 'nav.location': '交通指南', 'nav.book': '立即预订',
    'hero.eyebrow': 'HAEUNDAE · BUSAN',
    'hero.title': '在海与城之间，<br>留宿海云台的每一天',
    'hero.sub': '步行5分钟即达海云台海水浴场 — 官网预订享最优价格',
    'bar.checkin': '入住', 'bar.checkout': '退房', 'bar.adults': '成人', 'bar.children': '儿童', 'bar.search': '搜索客房',
    'about.eyebrow': 'ABOUT', 'about.title': '在海云台中心，享受舒适休憩',
    'about.lead': 'Kwangsu Hotel位于海云台海水浴场与海云台站之间，度假、购物与商务出行皆十分便利。欢迎通过官方网站以最优惠的价格预订。',
    'about.k1t': '步行5分钟至海云台海水浴场', 'about.k1d': '散步即可抵达海边',
    'about.k2t': '步行6分钟至海云台站', 'about.k2d': '地铁2号线出行便捷',
    'about.k3t': '驾车5分钟至BEXCO·Centum City', 'about.k3d': '会展、购物、商务皆方便',
    'rooms.eyebrow': 'ROOMS', 'rooms.title': '客房介绍', 'rooms.lead': '所有客房均配备免费Wi-Fi、智能电视、冰箱、电热水壶及保险箱。',
    'rooms.bed': '床型', 'rooms.capacity': '入住人数', 'rooms.size': '面积', 'rooms.from': '每晚最低', 'rooms.people': '{n}人', 'rooms.book': '预订此房型',
    'fac.eyebrow': 'FACILITIES', 'fac.title': '酒店设施',
    'fac.f1t': '早餐餐厅', 'fac.f1d': '2层 · 07:00–10:00(最晚入场 09:30)<br>成人 {bfa} / 儿童 {bfc}',
    'fac.f2t': '咖啡休息区', 'fac.f2d': '24小时开放的自助咖啡休息区',
    'fac.f3t': '便利店', 'fac.f3d': '酒店内24小时便利店',
    'fac.f4t': '停车场', 'fac.f4d': '收费停车，先到先得(每车每晚10,000韩元)',
    'fac.note': '所有客房及整栋建筑全面禁烟。',
    'loc.eyebrow': 'LOCATION', 'loc.title': '交通指南', 'loc.addr': '地址', 'loc.tel': '电话', 'loc.time': '入住 / 退房',
    'loc.t1': '地铁2号线海云台站步行约6分钟', 'loc.t2': '金海国际机场驾车约40分钟', 'loc.t3': 'KTX釜山站驾车约35分钟',
    'loc.map': '在地图中查看',
    'ft.company': '公司名称', 'ft.ceo': '代表理事', 'ft.biz': '营业执照号', 'ft.mail': '通信销售业申报', 'ft.lodging': '住宿业营业申报', 'ft.addr': '地址', 'ft.tel': '代表电话', 'ft.email': '邮箱',
    'ft.terms': '使用条款', 'ft.privacy': '隐私政策', 'ft.refund': '取消与退款规定', 'ft.official': '官方网站',
    'pop.title': '官方网站公告',
    'pop.body': 'Kwangsu Hotel的<b>住宿业营业申报名义人为주식회사 광수호텔(Kwangsu Hotel Co., Ltd.)</b>，官方网站为 <b>{new}</b>。<br><br>原域名 <b>{old}</b> 及该网站的预订页面<b>并非由本公司运营</b>。通过该网站进行的预订及付款与本公司无关，预订前请务必确认是否为官方网站。',
    'pop.today': '今天不再显示', 'pop.close': '关闭',
    'bk.title': '客房预订', 'bk.test': '测试支付模式 — 不会实际扣款',
    'bk.s1': '选择日期', 'bk.s2': '选择客房', 'bk.s3': '入住人信息', 'bk.s4': '支付',
    'bk.searchBtn': '查看可订客房', 'bk.nights': '{n}晚', 'bk.select': '选择', 'bk.selected': '已选择', 'bk.totalFor': '{n}晚合计',
    'bk.soldout': '已满房', 'bk.overCap': '超出人数',
    'bk.name': '预订人姓名', 'bk.namePh': '与护照/身份证一致', 'bk.phone': '手机号码', 'bk.phonePh': '仅限数字(含国家代码)', 'bk.email': '邮箱', 'bk.request': '特殊要求(选填)',
    'bk.breakfast': '添加早餐', 'bk.breakfastNote': '每人每晚 成人 {bfa} / 儿童 {bfc}',
    'bk.agree': '我同意<a href="/policy.html#refund" target="_blank">取消与退款规定</a>、<a href="/policy.html#terms" target="_blank">使用条款</a>及<a href="/policy.html#privacy" target="_blank">个人信息收集与使用</a>。',
    'bk.toPay': '前往支付', 'bk.pay': '支付 {amount}', 'bk.back': '上一步',
    'bk.sum': '预订摘要', 'bk.room': '客房', 'bk.dates': '日期', 'bk.guests': '人数', 'bk.roomTotal': '房费', 'bk.bfTotal': '早餐', 'bk.total': '支付总额',
    'bk.adultsN': '成人 {a}', 'bk.childrenN': '儿童 {c}',
    'bk.weekday': '平日', 'bk.weekend': '周末', 'bk.peak': '旺季',
    'bk.openFrom': '可预订 {date} 起入住的客房。',
    'err.DATE': '请确认日期。', 'err.TOO_EARLY': '所选日期无法预订。', 'err.TOO_FAR': '超出可预订期限。',
    'err.NIGHTS': '请选择1晚至{max}晚。', 'err.GUESTS': '人数超出客房标准。', 'err.ROOM': '请选择客房。',
    'err.SOLD_OUT': '所选期间该房型已满房。', 'err.NAME': '请输入姓名。', 'err.PHONE': '请确认手机号码。', 'err.EMAIL': '请确认邮箱。',
    'err.AGREE': '请同意相关条款。', 'err.NETWORK': '发生临时错误，请稍后再试。',
    'ok.title': '预订成功', 'ok.desc': '预订详情将发送至您填写的邮箱，请妥善保管预订编号。',
    'ok.no': '预订编号', 'ok.paid': '支付金额', 'ok.receipt': '查看收据', 'ok.home': '返回首页', 'ok.confirming': '正在确认支付…',
    'ng.title': '支付未完成', 'ng.desc': '支付已取消或发生错误，请重试。', 'ng.retry': '重新预订',
  },
};

// ── helpers ──────────────────────────────────────────────────
const LOCALE = { ko: 'ko-KR', en: 'en-US', ja: 'ja-JP', zh: 'zh-CN' };
let current = 'ko';

export function detectLang() {
  const q = new URLSearchParams(location.search).get('lang');
  if (q && DICT[q]) return q;
  try { const s = localStorage.getItem('ks_lang'); if (s && DICT[s]) return s; } catch (e) {}
  const nav = (navigator.language || 'ko').slice(0, 2).toLowerCase();
  return DICT[nav] ? nav : 'ko';
}
export function setLang(l) {
  current = DICT[l] ? l : 'ko';
  try { localStorage.setItem('ks_lang', current); } catch (e) {}
  document.documentElement.lang = current === 'zh' ? 'zh-CN' : current;
}
export const lang = () => current;
export const won = (n) => '₩' + Number(n).toLocaleString('ko-KR');
export function t(key, vars = {}) {
  let s = (DICT[current] && DICT[current][key]) ?? DICT.ko[key] ?? key;
  for (const [k, v] of Object.entries(vars)) s = s.split('{' + k + '}').join(v);
  return s;
}
export function fmtDay(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(LOCALE[current], { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' });
}
export function applyI18n(root = document, vars = {}) {
  root.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n, vars); });
  root.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh, vars); });
  const title = t('meta.title');
  if (title !== 'meta.title' && !document.body.dataset.keepTitle) document.title = title;
}
export function langSelect(el, onChange) {
  el.innerHTML = LANGS.map((l) => `<option value="${l.code}">${l.label}</option>`).join('');
  el.value = current;
  el.addEventListener('change', () => { setLang(el.value); onChange(); });
}
