// GET /api/admin/reservations — 예약 목록 (관리자 토큰 필요)
import { json } from '../../_lib/util.js';

export async function onRequestGet({ request, env }) {
  if (!env.RESERVATIONS) return json({ error: 'KV_NOT_BOUND' }, 500);
  const auth = request.headers.get('Authorization') || '';
  if (!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) return json({ error: 'UNAUTHORIZED' }, 401);

  const all = new URL(request.url).searchParams.get('all') === '1';
  const out = [];
  let cursor;
  do {
    const page = await env.RESERVATIONS.list({ prefix: 'order:', cursor });
    for (const k of page.keys) {
      const v = await env.RESERVATIONS.get(k.name);
      if (!v) continue;
      const o = JSON.parse(v);
      if (all || o.status === 'PAID') out.push(o);
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);
  out.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  return json({ count: out.length, reservations: out });
}
