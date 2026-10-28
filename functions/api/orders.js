// POST /api/orders — 결제 전 주문 생성 (금액은 서버에서 다시 계산)
import { quote, ROOMS } from '../../js/pricing.js';
import { json } from '../_lib/util.js';

export async function onRequestPost({ request, env }) {
  if (!env.RESERVATIONS) return json({ error: 'KV_NOT_BOUND' }, 500);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'BAD_JSON' }, 400); }

  let q;
  try { q = quote(body); } catch (e) { return json({ error: e.code || 'QUOTE' }, 400); }

  const g = body.guest || {};
  const guest = {
    name: String(g.name || '').trim().slice(0, 50),
    phone: String(g.phone || '').replace(/[^\d]/g, ''),
    email: String(g.email || '').trim().slice(0, 100),
    request: String(g.request || '').trim().slice(0, 500),
  };
  if (!guest.name) return json({ error: 'NAME' }, 400);
  if (guest.phone.length < 8 || guest.phone.length > 15) return json({ error: 'PHONE' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(guest.email)) return json({ error: 'EMAIL' }, 400);

  // 홈페이지 배정 객실 재고 확인
  const room = ROOMS.find((r) => r.id === q.roomId);
  for (const line of q.lines) {
    const sold = parseInt((await env.RESERVATIONS.get(`inv:${q.roomId}:${line.date}`)) || '0', 10);
    if (sold >= room.allotment) return json({ error: 'SOLD_OUT', date: line.date }, 409);
  }

  const stamp = q.checkIn.replace(/-/g, '').slice(2);
  const rand = crypto.getRandomValues(new Uint8Array(6)).reduce((s, b) => s + b.toString(36).padStart(2, '0'), '').toUpperCase();
  const orderId = `KS${stamp}-${rand}`;
  const orderName = `${room.name.ko} ${q.nights}박`;

  const order = {
    orderId, orderName, status: 'PENDING', quote: q, guest,
    lang: ['ko', 'en', 'ja', 'zh'].includes(body.lang) ? body.lang : 'ko',
    createdAt: new Date().toISOString(),
  };
  await env.RESERVATIONS.put(`order:${orderId}`, JSON.stringify(order), { expirationTtl: 3600 });
  return json({ orderId, orderName, amount: q.total });
}
