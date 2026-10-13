import { boot } from './common.js';
import { SITE } from './config.js';
import { ROOMS, minRate, earliestCheckIn, addDays, fmtDate } from './pricing.js';
import { t, lang, won } from './i18n.js';

function renderRooms() {
  const L = lang();
  document.getElementById('room-grid').innerHTML = ROOMS.map((r) => `
    <article class="room">
      <div class="ph" style="background-image:url(/${r.image}),var(--ph-${(ROOMS.indexOf(r) % 3) + 1})"></div>
      <div class="body">
        <h3>${r.name[L]}</h3>
        <p>${r.desc[L]}</p>
        <div class="specs">
          <span><b>${t('rooms.bed')}</b>${r.bed[L]}</span>
          <span><b>${t('rooms.capacity')}</b>${t('rooms.people', { n: r.capacity })}</span>
          ${r.size ? `<span><b>${t('rooms.size')}</b>${r.size}㎡</span>` : ''}
        </div>
        <div class="foot">
          <div class="price"><small>${t('rooms.from')}</small><b>${won(minRate(r))}~</b></div>
          <a class="btn btn-navy" href="/booking/?room=${r.id}">${t('rooms.book')}</a>
        </div>
      </div>
    </article>`).join('');
}

function renderLocation() {
  const L = lang();
  document.getElementById('loc-addr').textContent = SITE.address[L] || SITE.address.ko;
  document.getElementById('loc-tel').textContent = SITE.phone || '—';
  document.getElementById('loc-time').textContent = `${SITE.checkIn} / ${SITE.checkOut}`;
  const q = encodeURIComponent(SITE.mapQuery);
  document.getElementById('loc-map').href = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const m = document.getElementById('map');
  const src = `https://www.google.com/maps?q=${q}&hl=${L}&z=16&output=embed`;
  if (m.src !== src) m.src = src;
}

function initBar() {
  const i = document.getElementById('b-in'), o = document.getElementById('b-out');
  const e = earliestCheckIn();
  i.min = fmtDate(e); i.value = fmtDate(e);
  o.min = fmtDate(addDays(e, 1)); o.value = fmtDate(addDays(e, 1));
  i.addEventListener('change', () => {
    const d = Date.parse(i.value + 'T00:00:00Z');
    if (!isNaN(d)) { o.min = fmtDate(addDays(d, 1)); if (o.value <= i.value) o.value = fmtDate(addDays(d, 1)); }
  });
}

function initSlides() {
  const s = [...document.querySelectorAll('.slide')];
  let k = 0;
  setInterval(() => { s[k].classList.remove('on'); k = (k + 1) % s.length; s[k].classList.add('on'); }, 6000);
}

boot({ popup: true, render: () => { renderRooms(); renderLocation(); } });
initBar();
initSlides();
