// POST /api/confirm — 토스페이먼츠 결제 승인 (금액 검증 후 승인)
import { ROOMS } from '../../js/pricing.js';
import { json, publicView, notify } from '../_lib/util.js';

export async function onRequestPost({ request, env }) {
  if (!env.RESERVATIONS) return json({ error: 'KV_NOT_BOUND' }, 500);
  if (!env.TOSS_SECRET_KEY) return json({ error: 'SECRET_KEY_MISSING' }, 500);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'BAD_JSON' }, 400); }
  const { paymentKey, orderId } = body;
  const amount = Number(body.amount);
  if (!paymentKey || !orderId) return json({ error: 'BAD_REQUEST' }, 400);

  const key = `order:${orderId}`;
  const raw = await env.RESERVATIONS.get(key);
  if (!raw) return json({ error: 'ORDER_NOT_FOUND', message: '주문 정보가 만료되었거나 존재하지 않습니다.' }, 404);
  const order = JSON.parse(raw);

  if (order.status === 'PAID') return json({ ok: true, order: publicView(order) });   // 새로고침 등 중복 요청
  if (amount !== order.quote.total) return json({ error: 'AMOUNT_MISMATCH', message: '결제 금액이 일치하지 않습니다.' }, 400);

  const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: { Authorization: 'Basic ' + btoa(env.TOSS_SECRET_KEY + ':'), 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    order.status = 'FAILED';
    order.failure = { code: data.code, message: data.message, at: new Date().toISOString() };
    await env.RESERVATIONS.put(key, JSON.stringify(order), { expirationTtl: 86400 * 7 });
    return json({ error: data.code || 'CONFIRM_FAILED', message: data.message }, 400);
  }

  order.status = 'PAID';
  order.payment = {
    paymentKey, method: data.method, approvedAt: data.approvedAt,
    totalAmount: data.totalAmount, receiptUrl: data.receipt && data.receipt.url,
  };
  order.paidAt = new Date().toISOString();
  await env.RESERVATIONS.put(key, JSON.stringify(order));   // 결제 완료 건은 만료 없음

  // 재고 차감
  for (const line of order.quote.lines) {
    const k = `inv:${order.quote.roomId}:${line.date}`;
    const sold = parseInt((await env.RESERVATIONS.get(k)) || '0', 10);
    await env.RESERVATIONS.put(k, String(sold + 1));
  }

  const room = ROOMS.find((r) => r.id === order.quote.roomId);
  await notify(env,
    `[광수호텔 신규예약] ${order.orderId} · ${room ? room.name.ko : order.quote.roomId} · ${order.quote.checkIn}~${order.quote.checkOut} (${order.quote.nights}박) · ${order.guest.name} · ₩${order.quote.total.toLocaleString('ko-KR')}`,
    { orderId: order.orderId });

  return json({ ok: true, order: publicView(order) });
}
