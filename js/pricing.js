// ─────────────────────────────────────────────────────────────
//  광수호텔 객실·요금·예약 규칙  (브라우저와 결제 서버가 함께 사용)
//  ※ 금액은 서버에서 이 파일 기준으로 다시 계산·검증합니다.
//    요금을 바꾸려면 이 파일만 수정 후 재배포하면 됩니다.
// ─────────────────────────────────────────────────────────────

export const BOOKING = {
  // 이 날짜 이전 체크인은 예약 불가 (점유 확보 예정일). 제한 없으면 null
  openFrom: null,            // 예: '2026-11-01'
  maxNights: 14,             // 1회 최대 숙박일수
  maxAdvanceDays: 365,       // 몇 일 앞까지 예약 가능
  breakfast: { adult: 22000, child: 15000 },  // 1인 1박 조식 요금
  // 성수기 (MM-DD ~ MM-DD, 양 끝 포함)
  peakSeasons: [['07-15', '08-20'], ['12-24', '12-31']],
  // 주말요금 적용 요일(숙박일 기준): 0=일 … 5=금, 6=토
  weekendDays: [5, 6],
};

// allotment = 홈페이지에 배정하는 1일 판매 객실 수 / 요금·인원·침대는 실제에 맞게 수정하세요
const BED = {
  D1: { ko: '더블 1', en: '1 Double', ja: 'ダブル 1台', zh: '双人床 1张' },
  T2: { ko: '침대 2', en: '2 Beds', ja: 'ベッド 2台', zh: '床 2张' },
  DS: { ko: '더블 1 + 싱글 1', en: '1 Double + 1 Single', ja: 'ダブル 1台 + シングル 1台', zh: '双人床 1张 + 单人床 1张' },
  D2: { ko: '더블 2', en: '2 Doubles', ja: 'ダブル 2台', zh: '双人床 2张' },
};
const L4 = (a) => ({ ko: a[0], en: a[1], ja: a[2], zh: a[3] });
// room(id, [이름 ko,en,ja,zh], [설명 ko,en,ja,zh], 침대, 최대인원, 요금, 1일 배정객실수, 면적㎡(선택))
function room(id, name, desc, bed, capacity, rates, allotment, size = null) {
  return { id, name: L4(name), desc: L4(desc), bed, capacity, size, rates, allotment, image: `images/rooms/${id}.jpg` };
}

export const ROOMS = [
  room('superior-double', ['슈페리어 더블', 'Superior Double', 'スーペリアダブル', '高级大床房'],
    ['해운대 여행의 베이스캠프로 알맞은 아늑한 더블 객실입니다.', 'A cozy double room — the perfect base for exploring Haeundae.', '海雲台観光の拠点にぴったりの居心地よいダブルルーム。', '温馨舒适的大床房，是游览海云台的理想落脚点。'],
    BED.D1, 2, { weekday: 89000, weekend: 129000, peak: 189000 }, 10),
  room('deluxe-double', ['디럭스 더블', 'Deluxe Double', 'デラックスダブル', '豪华大床房'],
    ['넉넉한 공간과 편안한 침구로 여유로운 휴식을 제공합니다.', 'More space and plush bedding for a relaxed stay.', 'ゆとりある空間と上質な寝具でくつろぎのひとときを。', '宽敞空间与舒适床品，尽享悠闲时光。'],
    BED.D1, 2, { weekday: 99000, weekend: 139000, peak: 199000 }, 10),
  room('deluxe-double-halfocean', ['디럭스 더블 하프오션', 'Deluxe Double Partial Ocean', 'デラックスダブル パーシャルオーシャン', '豪华大床房（部分海景）'],
    ['창 너머로 해운대 바다가 부분적으로 보이는 디럭스 객실입니다.', 'A deluxe room with a partial view of the Haeundae sea.', '窓から海雲台の海が一部望めるデラックスルーム。', '可部分眺望海云台大海的豪华客房。'],
    BED.D1, 2, { weekday: 119000, weekend: 159000, peak: 229000 }, 5),
  room('deluxe-twin', ['디럭스 트윈', 'Deluxe Twin', 'デラックスツイン', '豪华双床房'],
    ['친구, 동료와 함께하는 여행에 알맞은 트윈 객실입니다.', 'Two beds — ideal for friends and colleagues.', 'ご友人や同僚との旅行に最適なツインルーム。', '两张床，适合朋友与同事结伴出行。'],
    BED.T2, 2, { weekday: 109000, weekend: 149000, peak: 209000 }, 10),
  room('deluxe-family-twin', ['디럭스 패밀리 트윈', 'Deluxe Family Twin', 'デラックスファミリーツイン', '豪华家庭双床房'],
    ['더블과 싱글 침대로 가족 여행에 알맞은 객실입니다.', 'A double and a single bed — great for small families.', 'ダブルとシングルベッドでご家族旅行に最適。', '一张双人床加一张单人床，适合小家庭出行。'],
    BED.DS, 3, { weekday: 129000, weekend: 169000, peak: 239000 }, 5),
  room('corner-family-twin', ['코너 패밀리 트윈', 'Corner Family Twin', 'コーナーファミリーツイン', '转角家庭双床房'],
    ['양면 창으로 채광이 좋은 코너 객실입니다.', 'A bright corner room with windows on two sides.', '二面の窓から光が差し込む明るいコーナールーム。', '双面采光、明亮通透的转角客房。'],
    BED.DS, 3, { weekday: 139000, weekend: 179000, peak: 249000 }, 5),
  room('corner-family-quad', ['코너 패밀리 쿼드러플', 'Corner Family Quadruple', 'コーナーファミリークアッド', '转角家庭四人房'],
    ['더블 침대 2개로 4인 가족이 함께 머물 수 있는 코너 객실입니다.', 'Two double beds in a corner room for families of four.', 'ダブルベッド2台、4名様でご利用いただけるコーナールーム。', '两张双人床，可供四口之家入住的转角客房。'],
    BED.D2, 4, { weekday: 159000, weekend: 199000, peak: 279000 }, 5),
  room('family-suite-ocean', ['패밀리 스위트 오션', 'Family Suite Ocean', 'ファミリースイート オーシャン', '家庭海景套房'],
    ['넓은 거실 공간과 바다 방향 전망을 갖춘 패밀리 스위트입니다.', 'A family suite with a spacious lounge area facing the sea.', '広いリビングスペースと海側の眺望を備えたファミリースイート。', '拥有宽敞起居空间、面朝大海的家庭套房。'],
    BED.D2, 4, { weekday: 199000, weekend: 249000, peak: 349000 }, 3),
  room('family-suite-quad', ['패밀리 스위트 쿼드러플', 'Family Suite Quadruple', 'ファミリースイート クアッド', '家庭四人套房'],
    ['소파와 라운지 공간을 갖춘 4인 스위트 객실입니다.', 'A four-guest suite with sofa and lounge area.', 'ソファとラウンジスペースを備えた4名様用スイート。', '配有沙发与休息区的四人套房。'],
    BED.D2, 4, { weekday: 189000, weekend: 239000, peak: 329000 }, 3),
  room('presidential-suite', ['프레지덴셜 스위트', 'Presidential Suite', 'プレジデンシャルスイート', '总统套房'],
    ['광수호텔에서 가장 넓은 최상위 스위트 객실입니다.', 'Our largest and most exclusive suite.', '当ホテル最大の最上級スイート。', '本酒店面积最大的顶级套房。'],
    BED.DS, 4, { weekday: 290000, weekend: 350000, peak: 490000 }, 1),
];

// ── 계산 로직 (수정 불필요) ─────────────────────────────────
const DAY = 86400000;

export function parseDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split('-').map(Number);
  const t = Date.UTC(y, m - 1, d);
  const dt = new Date(t);
  if (dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return t;
}
export const fmtDate = (t) => new Date(t).toISOString().slice(0, 10);

export function todayKST() {
  const d = new Date(Date.now() + 9 * 3600000);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
export function earliestCheckIn() {
  let t = todayKST();
  const o = BOOKING.openFrom ? parseDate(BOOKING.openFrom) : null;
  if (o && o > t) t = o;
  return t;
}
export const addDays = (t, n) => t + n * DAY;

function isPeak(t) {
  const md = fmtDate(t).slice(5);
  return BOOKING.peakSeasons.some(([a, b]) => (a <= b ? md >= a && md <= b : md >= a || md <= b));
}
export function nightlyRate(room, t) {
  if (isPeak(t)) return { type: 'peak', rate: room.rates.peak };
  if (BOOKING.weekendDays.includes(new Date(t).getUTCDay())) return { type: 'weekend', rate: room.rates.weekend };
  return { type: 'weekday', rate: room.rates.weekday };
}
export const minRate = (room) => Math.min(room.rates.weekday, room.rates.weekend, room.rates.peak);

function fail(code) { const e = new Error(code); e.code = code; return e; }
const toInt = (v) => (Number.isInteger(Number(v)) ? Number(v) : NaN);

export function quote({ roomId, checkIn, checkOut, adults, children = 0, breakfast = false }) {
  const room = ROOMS.find((r) => r.id === roomId);
  if (!room) throw fail('ROOM');
  const ci = parseDate(checkIn), co = parseDate(checkOut);
  if (ci == null || co == null) throw fail('DATE');
  if (ci < earliestCheckIn()) throw fail('TOO_EARLY');
  if (ci > addDays(todayKST(), BOOKING.maxAdvanceDays)) throw fail('TOO_FAR');
  const nights = (co - ci) / DAY;
  if (!(nights >= 1 && nights <= BOOKING.maxNights)) throw fail('NIGHTS');
  const a = toInt(adults), c = toInt(children);
  if (!(a >= 1) || !(c >= 0) || a + c > room.capacity) throw fail('GUESTS');

  const lines = [];
  let roomTotal = 0;
  for (let i = 0; i < nights; i++) {
    const t = addDays(ci, i);
    const r = nightlyRate(room, t);
    lines.push({ date: fmtDate(t), ...r });
    roomTotal += r.rate;
  }
  const bf = !!breakfast;
  const breakfastTotal = bf ? nights * (a * BOOKING.breakfast.adult + c * BOOKING.breakfast.child) : 0;
  return {
    roomId, checkIn, checkOut, nights, adults: a, children: c, breakfast: bf,
    lines, roomTotal, breakfastTotal, total: roomTotal + breakfastTotal,
  };
}
