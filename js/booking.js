import { boot } from './common.js';
import { PAYMENT } from './config.js';
import { ROOMS, BOOKING, quote, earliestCheckIn, addDays, fmtDate } from './pricing.js';
import { t, lang, won, fmtDay } from './i18n.js';

const $ = (id) => document.getElementById(id);
const P = new URLSearchParams(location.search);
const E = earliestCheckIn();

const S = {
  in: P.get('in') || fmtDate(E),
  out: P.get('out') || fmtDate(addDays(E, 1)),
  a: Number(P.get('a') || 2),
  c: Number(P.get('c') || 0),
  roomId: ROOMS.some((r) => r.id === P.get('room')) ? P.get('room') : null,
  bf: false,
  step: 1,
  order: null,
};
let widgets = null, widgetsRendered = false;

function currentQuote(roomId = S.roomId) {
  try { return quote({ roomId, checkIn: S.in, checkOut: S.out, adults: S.a, children: S.c, breakfast: S.bf }); }
  catch (e) { return { error: e.code || 'DATE' }; }
}
const errText = (code) => t('err.' + code, { max: BOOKING.maxNights });

// ── step 1 · 2 ───────────────────────────────────────────────
function initDates() {
  const fi = $('f-in'), fo = $('f-out'), fa = $('f-a'), fc = $('f-c');
  fi.min = fmtDate(E); fo.min = fmtDate(addDays(E, 1));
  fi.max = fmtDate(addDays(E, BOOKING.maxAdvanceDays));
  fi.value = S.in; fo.value = S.out; fa.value = String(S.a); fc.value = String(S.c);
  const sync = () => {
    S.in = fi.value; S.out = fo.value; S.a = Number(fa.value); S.c = Number(fc.value);
    const d = Date.parse(S.in + 'T00:00:00Z');
    if (!isNaN(d)) { fo.min = fmtDate(addDays(d, 1)); if (S.out <= S.in) { S.out = fmtDate(addDays(d, 1)); fo.value = S.out; } }
    resetOrder(); render();
  };
  [fi, fo, fa, fc].forEach((el) => el.addEventListener('change', sync));
}

function renderRooms() {
  const L = lang();
  const base = currentQuote(ROOMS[0].id);
  const dateErr = base.error && base.error !== 'GUESTS' ? base.error : null;
  $('e-dates').textContent = dateErr ? errText(dateErr) : '';
  $('rlist').innerHTML = ROOMS.map((r, i) => {
    const q = currentQuote(r.id);
    const dis = !!q.error;
    const sel = S.roomId === r.id && !dis;
    const right = dis
      ? `<small>${q.error === 'GUESTS' ? t('bk.overCap') : ''}</small><b>—</b>`
      : `<small>${t('bk.totalFor', { n: q.nights })}</small><b>${won(q.roomTotal)}</b>
         <button class="btn ${sel ? 'btn-navy' : 'btn-ghost'}" data-room="${r.id}">${sel ? t('bk.selected') : t('bk.select')}</button>`;
    return `<div class="ritem${sel ? ' sel' : ''}${dis ? ' dis' : ''}">
      <div class="ph" style="background-image:url(/${r.image}),var(--ph-${(i % 3) + 1})"></div>
      <div><h3>${r.name[L]}</h3><p>${r.bed[L]} · ${t('rooms.people', { n: r.capacity })}</p></div>
      <div class="pr">${right}</div></div>`;
  }).join('');
  $('rlist').querySelectorAll('[data-room]').forEach((b) => b.addEventListener('click', () => {
    S.roomId = b.dataset.room; resetOrder(); render();
  }));
  if (S.roomId && currentQuote().error) S.roomId = null;
  $('to-guest').disabled = !S.roomId;
}

// ── summary ─────────────────────────────────────────────────
function renderSummary() {
  const L = lang();
  const room = ROOMS.find((r) => r.id === S.roomId);
  const q = room ? currentQuote() : null;
  $('s-room').textContent = room ? room.name[L] : '—';
  $('s-dates').innerHTML = S.in && S.out ? `${fmtDay(S.in)}<br>→ ${fmtDay(S.out)}` : '—';
  $('s-guests').textContent = t('bk.adultsN', { a: S.a }) + (S.c ? ' · ' + t('bk.childrenN', { c: S.c }) : '');
  if (q && !q.error) {
    $('s-rt').textContent = won(q.roomTotal) + ' · ' + t('bk.nights', { n: q.nights });
    $('s-bf').textContent = q.breakfast ? won(q.breakfastTotal) : '—';
    $('s-total').textContent = won(q.total);
    $('s-lines').innerHTML = q.lines.map((l) => `<div><span>${fmtDay(l.date)} · ${t('bk.' + l.type)}</span><span>${won(l.rate)}</span></div>`).join('');
    $('pay').textContent = t('bk.pay', { amount: won(q.total) });
  } else {
    ['s-rt', 's-bf', 's-total'].forEach((id) => ($(id).textContent = '—'));
    $('s-lines').innerHTML = '';
  }
}

// ── steps ───────────────────────────────────────────────────
function showStep(n) {
  S.step = n;
  $('c-dates').classList.toggle('hide', n > 2);
  $('c-rooms').classList.toggle('hide', n > 2);
  $('c-guest').classList.toggle('hide', n !== 3);
  $('c-pay').classList.toggle('hide', n !== 4);
  document.querySelectorAll('#steps li').forEach((li) => {
    const s = Number(li.dataset.s);
    const cur = n <= 2 ? (S.roomId ? 2 : 1) : n;
    li.classList.toggle('on', s === cur);
    li.classList.toggle('done', s < cur);
  });
  scrollTo({ top: 0, behavior: 'smooth' });
}
function resetOrder() { S.order = null; if (S.step === 4) showStep(3); }

// ── guest ───────────────────────────────────────────────────
function readGuest() {
  const g = {
    name: $('g-name').value.trim(),
    phone: $('g-phone').value.replace(/[^\d]/g, ''),
    email: $('g-email').value.trim(),
    request: $('g-req').value.trim(),
  };
  if (!g.name) return { err: 'NAME' };
  if (g.phone.length < 8 || g.phone.length > 15) return { err: 'PHONE' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g.email)) return { err: 'EMAIL' };
  if (!$('g-agree').checked) return { err: 'AGREE' };
  return { g };
}

async function toPayment() {
  const { g, err } = readGuest();
  $('e-guest').textContent = err ? errText(err) : '';
  if (err) return;
  const q = currentQuote();
  if (q.error) { $('e-guest').textContent = errText(q.error); return; }
  const btn = $('to-pay'); btn.disabled = true;
  try {
    const res = await fetch('/api/orders', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId: S.roomId, checkIn: S.in, checkOut: S.out, adults: S.a, children: S.c, breakfast: S.bf, guest: g, lang: lang() }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { $('e-guest').textContent = errText(data.error || 'NETWORK'); return; }
    if (data.amount !== q.total) { $('e-guest').textContent = errText('NETWORK'); return; }
    S.order = { ...data, guest: g };
    await mountWidget(data.amount);
    showStep(4);
  } catch (e) {
    console.error(e);
    $('e-guest').textContent = errText('NETWORK');
  } finally { btn.disabled = false; }
}

// ── Toss Payments 결제위젯 ──────────────────────────────────
async function mountWidget(amount) {
  if (!window.TossPayments) throw new Error('TossPayments SDK not loaded');
  if (!widgets) widgets = window.TossPayments(PAYMENT.clientKey).widgets({ customerKey: window.TossPayments.ANONYMOUS });
  await widgets.setAmount({ currency: 'KRW', value: amount });
  if (!widgetsRendered) {
    await Promise.all([
      widgets.renderPaymentMethods({ selector: '#payment-method', variantKey: 'DEFAULT' }),
      widgets.renderAgreement({ selector: '#agreement', variantKey: 'AGREEMENT' }),
    ]);
    widgetsRendered = true;
  }
  $('pay').disabled = false;
}

async function pay() {
  if (!S.order) return;
  $('e-pay').textContent = '';
  const o = S.order;
  try {
    await widgets.requestPayment({
      orderId: o.orderId,
      orderName: o.orderName,
      successUrl: `${location.origin}/booking/success.html?lang=${lang()}`,
      failUrl: `${location.origin}/booking/fail.html?lang=${lang()}`,
      customerEmail: o.guest.email,
      customerName: o.guest.name,
      customerMobilePhone: o.guest.phone.length <= 11 ? o.guest.phone : undefined,
    });
  } catch (e) {
    // 사용자가 결제창을 닫은 경우 등
    if (e && e.code !== 'USER_CANCEL') $('e-pay').textContent = e.message || errText('NETWORK');
  }
}

// ── boot ────────────────────────────────────────────────────
function render() {
  renderRooms();
  renderSummary();
  const note = $('open-note');
  if (BOOKING.openFrom && E > Date.now() - 86400000) {
    note.classList.remove('hide'); note.textContent = t('bk.openFrom', { date: fmtDay(fmtDate(E)) });
  }
  if (S.step <= 2) showStepMarks();
}
function showStepMarks() {
  const cur = S.roomId ? 2 : 1;
  document.querySelectorAll('#steps li').forEach((li) => {
    const s = Number(li.dataset.s);
    li.classList.toggle('on', s === cur); li.classList.toggle('done', s < cur);
  });
}

boot({ solid: true, render });
document.title = t('bk.title') + ' | ' + t('meta.title').split('|')[0].trim();
if (PAYMENT.testMode) $('testbadge').classList.remove('hide');
initDates();
render();
$('to-guest').onclick = () => { if (S.roomId) showStep(3); };
$('back-1').onclick = () => showStep(2);
$('back-2').onclick = () => showStep(3);
$('g-bf').addEventListener('change', (e) => { S.bf = e.target.checked; resetOrder(); renderSummary(); });
$('to-pay').onclick = toPayment;
$('pay').onclick = pay;
['g-name', 'g-phone', 'g-email', 'g-req'].forEach((id) => $(id).addEventListener('input', () => { if (S.step === 4) resetOrder(); }));
