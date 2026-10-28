export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

// 고객에게 돌려줄 정보 (연락처 등 개인정보 제외)
export const publicView = (o) => ({
  orderId: o.orderId, status: o.status, quote: o.quote,
  receiptUrl: o.payment && o.payment.receiptUrl, approvedAt: o.payment && o.payment.approvedAt,
});

export async function notify(env, text, order) {
  if (!env.NOTIFY_WEBHOOK_URL) return;
  try {
    await fetch(env.NOTIFY_WEBHOOK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, content: text, order }),   // Slack(text) / Discord(content) 공용
    });
  } catch (e) { /* 알림 실패는 예약에 영향 없음 */ }
}
