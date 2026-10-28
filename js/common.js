// 공통: 헤더 · 푸터 · 안내 팝업 · 언어 전환
import { SITE, NOTICE_POPUP } from './config.js';
import { BOOKING } from './pricing.js';
import { t, lang, setLang, detectLang, applyI18n, langSelect, won, LANGS } from './i18n.js';

export const vars = () => ({
  bfa: won(BOOKING.breakfast.adult), bfc: won(BOOKING.breakfast.child),
  old: NOTICE_POPUP.oldDomain, new: SITE.domain,
});
const dash = (v) => (v && String(v).trim()) || '—';

export function header(solid) {
  return `
  <header class="hd${solid ? ' solid' : ''}" id="hd"><div class="wrap">
    <a class="logo" href="/"><b>KWANGSU</b><small>HOTEL · HAEUNDAE</small></a>
    <nav class="nav" id="nav">
      <a href="/#about" data-i18n="nav.about"></a>
      <a href="/#rooms" data-i18n="nav.rooms"></a>
      <a href="/#facilities" data-i18n="nav.facilities"></a>
      <a href="/#location" data-i18n="nav.location"></a>
    </nav>
    <select class="lang" id="lang" aria-label="Language"></select>
    <a class="btn btn-sand" href="/booking/" data-i18n="nav.book"></a>
    <button class="burger" id="burger" aria-label="menu">☰</button>
  </div></header>`;
}

export function footer() {
  const s = SITE;
  return `
  <footer class="ft"><div class="wrap">
    <div class="links">
      <a href="/">${s.domain} · <span data-i18n="ft.official"></span></a>
      <a href="/policy.html#terms" data-i18n="ft.terms"></a>
      <a href="/policy.html#privacy" data-i18n="ft.privacy"></a>
      <a href="/policy.html#refund" data-i18n="ft.refund"></a>
    </div>
    <div class="info">
      <span><b data-i18n="ft.company"></b>${s.company}</span>
      <span><b data-i18n="ft.ceo"></b>${s.ceo}</span>
      <span><b data-i18n="ft.biz"></b>${dash(s.bizNo)}</span>
      <span><b data-i18n="ft.mail"></b>${dash(s.mailOrderNo)}</span>
      <span><b data-i18n="ft.lodging"></b>${dash(s.lodgingNo)}</span>
      <span><b data-i18n="ft.addr"></b><span id="ft-addr"></span></span>
      <span><b data-i18n="ft.tel"></b>${dash(s.phone)}</span>
      <span><b data-i18n="ft.email"></b>${dash(s.email)}</span>
    </div>
    <div class="copy">© ${new Date().getFullYear()} Kwangsu Hotel Co., Ltd. All rights reserved.</div>
  </div></footer>`;
}

function popupHTML() {
  return `
  <div class="pop-dim" id="pop" role="dialog" aria-modal="true" aria-labelledby="pop-t">
    <div class="pop">
      <div class="top"><i>!</i><h3 id="pop-t" data-i18n="pop.title"></h3></div>
      <div class="langs" id="pop-langs" style="padding-top:14px">
        ${LANGS.map((l) => `<button data-l="${l.code}">${l.label}</button>`).join('')}
      </div>
      <div class="txt" data-i18n="pop.body"></div>
      <div class="btns">
        <button id="pop-today" data-i18n="pop.today"></button>
        <button id="pop-close" data-i18n="pop.close"></button>
      </div>
    </div>
  </div>`;
}

function initPopup(render) {
  if (!NOTICE_POPUP.enabled) return;
  const key = 'ks_pop_' + NOTICE_POPUP.version;
  const today = new Date().toISOString().slice(0, 10);
  try { if (localStorage.getItem(key) === today) return; } catch (e) {}
  document.body.insertAdjacentHTML('beforeend', popupHTML());
  const pop = document.getElementById('pop');
  const mark = () => pop.querySelectorAll('[data-l]').forEach((b) => b.classList.toggle('on', b.dataset.l === lang()));
  pop.querySelectorAll('[data-l]').forEach((b) => b.addEventListener('click', () => {
    setLang(b.dataset.l); document.getElementById('lang').value = lang(); render(); mark();
  }));
  applyI18n(pop, vars()); mark();
  const close = () => pop.classList.remove('on');
  document.getElementById('pop-close').onclick = close;
  document.getElementById('pop-today').onclick = () => { try { localStorage.setItem(key, today); } catch (e) {} close(); };
  pop.addEventListener('click', (e) => { if (e.target === pop) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  setTimeout(() => pop.classList.add('on'), 400);
}

/**
 * 페이지 공통 초기화
 * @param {object} o  { solid:boolean, popup:boolean, render:function }
 */
export function boot({ solid = false, popup = false, render = () => {} } = {}) {
  setLang(detectLang());
  document.body.insertAdjacentHTML('afterbegin', header(solid));
  document.body.insertAdjacentHTML('beforeend', footer());
  const all = () => {
    applyI18n(document, vars());
    const a = document.getElementById('ft-addr'); if (a) a.textContent = SITE.address[lang()] || SITE.address.ko;
    render();
  };
  langSelect(document.getElementById('lang'), () => {
    all();
    const p = document.getElementById('pop');
    if (p) p.querySelectorAll('[data-l]').forEach((b) => b.classList.toggle('on', b.dataset.l === lang()));
  });
  const nav = document.getElementById('nav');
  document.getElementById('burger').onclick = () => nav.classList.toggle('open');
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));
  if (!solid) {
    const hd = document.getElementById('hd');
    const onS = () => hd.classList.toggle('solid', scrollY > 40);
    addEventListener('scroll', onS, { passive: true }); onS();
  }
  all();
  if (popup) initPopup(all);
  return all;
}
