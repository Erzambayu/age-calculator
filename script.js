// ============================================================
// THE AGE ALMANAC · script
// chronograph editorial · live chronometry engine
// ============================================================

(() => {
  'use strict';

  // ---------- STATE ----------
  const state = {
    dob: null,        // Date object
    name: '',         // subject name
    tickerId: null,
    cdId: null,
    odoId: null,
  };

  // ---------- DOM ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- UTIL ----------
  const fmt = n => Math.floor(n).toLocaleString('en-US');
  const pad = (n, w = 2) => String(n).padStart(w, '0');

  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ---------- AGE MATH ----------
  function ageDetails(dob, now = new Date()) {
    let y = now.getFullYear() - dob.getFullYear();
    let m = now.getMonth() - dob.getMonth();
    let d = now.getDate() - dob.getDate();
    if (d < 0) {
      m--;
      const prev = new Date(now.getFullYear(), now.getMonth(), 0);
      d += prev.getDate();
    }
    if (m < 0) { y--; m += 12; }
    const ms = now - dob;
    const totalDays = ms / 86400000;
    const totalHours = ms / 3600000;
    const totalMins = ms / 60000;
    const totalSecs = ms / 1000;
    const totalWeeks = totalDays / 7;
    return { y, m, d, totalDays, totalHours, totalMins, totalSecs, totalWeeks, ms };
  }

  function nextBirthday(dob, now = new Date()) {
    const month = dob.getMonth();
    const day = dob.getDate();
    let next = new Date(now.getFullYear(), month, day);
    // handle Feb 29 → Feb 28 fallback
    if (next.getMonth() !== month) next = new Date(now.getFullYear(), month, 28);
    if (next < now) {
      next = new Date(now.getFullYear() + 1, month, day);
      if (next.getMonth() !== month) next = new Date(now.getFullYear() + 1, month, 28);
    }
    return next;
  }

  function isBirthdayToday(dob, now = new Date()) {
    return dob.getDate() === now.getDate() && dob.getMonth() === now.getMonth();
  }

  // ---------- ZODIAC ----------
  const ZODIAC = [
    { name: 'Capricorn', sigil: '♑', element: 'Earth', start: [12, 22], end: [1, 19] },
    { name: 'Aquarius',  sigil: '♒', element: 'Air',   start: [1, 20],  end: [2, 18] },
    { name: 'Pisces',    sigil: '♓', element: 'Water', start: [2, 19],  end: [3, 20] },
    { name: 'Aries',     sigil: '♈', element: 'Fire',  start: [3, 21],  end: [4, 19] },
    { name: 'Taurus',    sigil: '♉', element: 'Earth', start: [4, 20],  end: [5, 20] },
    { name: 'Gemini',    sigil: '♊', element: 'Air',   start: [5, 21],  end: [6, 20] },
    { name: 'Cancer',    sigil: '♋', element: 'Water', start: [6, 21],  end: [7, 22] },
    { name: 'Leo',       sigil: '♌', element: 'Fire',  start: [7, 23],  end: [8, 22] },
    { name: 'Virgo',     sigil: '♍', element: 'Earth', start: [8, 23],  end: [9, 22] },
    { name: 'Libra',     sigil: '♎', element: 'Air',   start: [9, 23],  end: [10, 22] },
    { name: 'Scorpio',   sigil: '♏', element: 'Water', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', sigil: '♐', element: 'Fire', start: [11, 22], end: [12, 21] }
  ];
  function getZodiac(month, day) {
    for (const z of ZODIAC) {
      if (z.name === 'Capricorn') {
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return z;
      } else if (month === z.start[0] && day >= z.start[1]) return z;
      else if (month === z.end[0] && day <= z.end[1]) return z;
    }
    return ZODIAC[0];
  }

  // ---------- CHINESE ZODIAC ----------
  // anchor: 1900 = Rat, then cycles 12. element cycle 5 across 10-year pairs.
  const CHINESE = [
    { name: 'Rat',     glyph: '🐀' },
    { name: 'Ox',      glyph: '🐂' },
    { name: 'Tiger',   glyph: '🐅' },
    { name: 'Rabbit',  glyph: '🐇' },
    { name: 'Dragon',  glyph: '🐉' },
    { name: 'Snake',   glyph: '🐍' },
    { name: 'Horse',   glyph: '🐎' },
    { name: 'Goat',    glyph: '🐐' },
    { name: 'Monkey',  glyph: '🐒' },
    { name: 'Rooster', glyph: '🐓' },
    { name: 'Dog',     glyph: '🐕' },
    { name: 'Pig',     glyph: '🐖' }
  ];
  const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  function getChinese(year) {
    // Approximate: chinese new year roughly late Jan/early Feb. We use the
    // year directly (good enough for a poetic almanac, not divination).
    const idx = ((year - 1900) % 12 + 12) % 12;
    const elIdx = Math.floor(((year - 1900) % 10) / 2);
    return { ...CHINESE[idx], element: ELEMENTS[elIdx] };
  }

  // ---------- NUMEROLOGY · LIFE PATH ----------
  function digitSum(n) {
    let s = 0;
    while (n > 0) { s += n % 10; n = Math.floor(n / 10); }
    return s;
  }
  function reduceNumber(n) {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) n = digitSum(n);
    return n;
  }
  function getLifePath(dob) {
    const y = reduceNumber(digitSum(dob.getFullYear()));
    const m = reduceNumber(dob.getMonth() + 1);
    const d = reduceNumber(dob.getDate());
    return reduceNumber(y + m + d);
  }
  const LIFE_PATH_TRAITS = {
    1: 'Pelopor · Mandiri',  2: 'Diplomat · Peka',
    3: 'Kreator · Ekspresif', 4: 'Pembangun · Stabil',
    5: 'Petualang · Bebas',   6: 'Pengasuh · Harmonis',
    7: 'Pencari · Reflektif', 8: 'Eksekutor · Ambisius',
    9: 'Humanis · Welas',     11: 'Visioner · Intuitif',
    22: 'Master Builder',     33: 'Master Teacher'
  };

  // ---------- TOPBAR DATE ----------
  function updateTopbarDate() {
    const now = new Date();
    const dict = I18N[CURRENT_LANG] || I18N.id;
    const months = dict.months_full;
    const dows = dict.dow;
    $('#todayLong').textContent = `${dows[now.getDay()].toUpperCase()} · ${pad(now.getDate())} ${months[now.getMonth()].toUpperCase()} ${now.getFullYear()}`;
  }
  window.updateTopbarDate = updateTopbarDate;

  // ---------- SETTINGS ----------
  const SETTINGS = {
    lifeExpectancy: parseInt(localStorage.getItem('almanac.life')) || 80,
    workHours: parseInt(localStorage.getItem('almanac.work')) || 8,
    motion: localStorage.getItem('almanac.motion') || 'full'
  };
  function saveSettings() {
    localStorage.setItem('almanac.life', SETTINGS.lifeExpectancy);
    localStorage.setItem('almanac.work', SETTINGS.workHours);
    localStorage.setItem('almanac.motion', SETTINGS.motion);
  }

  // ---------- COUNT-UP TWEEN ----------
  function countUp(el, target, duration = 1100) {
    if (!el) return;
    if (SETTINGS.motion === 'off') { el.textContent = target; return; }
    const start = performance.now();
    const from = 0;
    const ease = t => 1 - Math.pow(1 - t, 3);
    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      const v = Math.floor(from + (target - from) * ease(p));
      el.textContent = v;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  // ---------- LIFE BATTERY ----------
  function renderBattery(years) {
    const total = SETTINGS.lifeExpectancy;
    const cells = $('#batteryCells');
    cells.innerHTML = '';
    const filled = Math.min(Math.floor(years), total);
    for (let i = 0; i < total; i++) {
      const s = document.createElement('span');
      if (i < filled) s.classList.add('on');
      else if (i === filled) s.classList.add('now');
      cells.appendChild(s);
    }
    // adjust grid columns dynamically (50–120)
    cells.style.gridTemplateColumns = `repeat(${Math.min(40, total)}, 1fr)`;
    const pct = Math.min(100, Math.round((years / total) * 100));
    $('#batteryPct').textContent = `${pct}%`;
    $('#livedYears').textContent = `${Math.floor(years)}${t('years_short') || 'y'}`;
    const remain = Math.max(0, total - Math.floor(years));
    $('#remainYears').textContent = `${remain}${t('years_short') || 'y'}`;
  }

  // ---------- ALLOCATION CHART ----------
  let allocChart;
  function renderAlloc(years) {
    const ctx = $('#allocChart').getContext('2d');
    const labels = [
      t('alloc_sleep'),
      t('alloc_work'),
      t('alloc_eat'),
      t('alloc_screen'),
      t('alloc_travel'),
      t('alloc_other')
    ];
    // recalculate based on work hours setting
    const work = SETTINGS.workHours;        // hours / day
    const sleep = 8;                         // assumed
    const eat = 1.5;
    const travel = 1;
    const screen = 3.5;
    const other = Math.max(0, 24 - work - sleep - eat - travel - screen);
    const total = work + sleep + eat + travel + screen + other;
    const pct = arr => arr.map(h => Math.round((h / total) * 1000) / 10);
    const data = pct([sleep, work, eat, screen, travel, other]);
    const colors = ['#d4a24c','#c44536','#6e8b5a','#7a8da6','#a07b4f','#5b5950'];

    if (allocChart) allocChart.destroy();
    allocChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderColor: getComputedStyle(document.body).getPropertyValue('--bg-card').trim(),
          borderWidth: 2,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { animateRotate: true, duration: SETTINGS.motion === 'off' ? 0 : 900 }
      }
    });

    const legend = $('#allocLegend');
    legend.innerHTML = '';
    labels.forEach((lbl, i) => {
      const yrs = (years * data[i] / 100).toFixed(1);
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="swatch" style="background:${colors[i]}"></span>
        <span>${lbl}</span>
        <span class="pct">${data[i]}%</span>
        <span class="yrs">${yrs}${t('years_short')}</span>`;
      legend.appendChild(li);
    });
  }

  // ---------- COSMIC ODOMETER (live) ----------
  function renderOdometer(dob) {
    function tick() {
      const now = new Date();
      const ms = now - dob;
      const secs = ms / 1000;
      const days = secs / 86400;
      const years = days / 365.25;

      // 80 bpm avg, 16 breaths/min, 17 blinks/min
      $('#odoHeart').textContent  = fmt(secs * (80 / 60));
      $('#odoBreath').textContent = fmt(secs * (16 / 60));
      $('#odoBlink').textContent  = fmt(secs * (17 / 60));
      $('#odoOrbit').textContent  = years.toFixed(2);
      $('#odoMoon').textContent   = (days / 29.530589).toFixed(1);
      $('#odoSpin').textContent   = fmt(days);
    }
    tick();
    return setInterval(tick, 1000);
  }

  // ---------- LIVE TICKER (hero) ----------
  function startTicker(dob) {
    if (state.tickerId) clearInterval(state.tickerId);
    function tick() {
      const a = ageDetails(dob);
      $('#bigYears').textContent = a.y;
      $('#bigMonths').textContent = a.m;
      $('#bigDays').textContent = a.d;
      const totalSecLeft = a.ms / 1000;
      const hr = Math.floor(totalSecLeft / 3600) % 24;
      const mn = Math.floor(totalSecLeft / 60) % 60;
      const sc = Math.floor(totalSecLeft) % 60;
      $('#bigHours').textContent = hr;
      $('#bigMins').textContent = mn;
      $('#bigSecs').textContent = sc;

      $('#numWeeks').textContent = fmt(a.totalWeeks);
      $('#numDays').textContent  = fmt(a.totalDays);
      $('#numHours').textContent = fmt(a.totalHours);
      $('#numMins').textContent  = fmt(a.totalMins);
      $('#numSecs').textContent  = fmt(a.totalSecs);
    }
    tick();
    state.tickerId = setInterval(tick, 1000);
  }

  // ---------- COUNTDOWN ----------
  function startCountdown(dob) {
    if (state.cdId) clearInterval(state.cdId);
    function tick() {
      const now = new Date();
      if (isBirthdayToday(dob, now)) {
        $('#cdDays').textContent = '0';
        $('#cdHrs').textContent = '0';
        $('#cdMin').textContent = '0';
        $('#cdSec').textContent = '0';
        $('#cdMessage').textContent = t('today_is_bday');
        return;
      }
      const next = nextBirthday(dob, now);
      const ms = next - now;
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms / 3600000) % 24);
      const m = Math.floor((ms / 60000) % 60);
      const s = Math.floor((ms / 1000) % 60);
      $('#cdDays').textContent = d;
      $('#cdHrs').textContent = pad(h);
      $('#cdMin').textContent = pad(m);
      $('#cdSec').textContent = pad(s);
      $('#cdMessage').textContent = t('in_days').replace('{n}', d);
    }
    tick();
    state.cdId = setInterval(tick, 1000);
  }

  // ---------- TIMELINE ----------
  function renderTimeline(dob) {
    const list = $('#timelineList');
    list.innerHTML = '';
    const milestones = [
      { age: 0,  key: 'birth' },
      { age: 1,  key: 'walking' },
      { age: 6,  key: 'school' },
      { age: 10, key: 'decade' },
      { age: 13, key: 'teen' },
      { age: 18, key: 'adult' },
      { age: 20, key: 'twenties' },
      { age: 25, key: 'quarter' },
      { age: 30, key: 'thirty' },
      { age: 40, key: 'forty' },
      { age: 50, key: 'half' },
      { age: 60, key: 'sixty' },
      { age: 70, key: 'seventy' },
      { age: 80, key: 'eighty' }
    ];
    const now = new Date();
    const a = ageDetails(dob, now);
    const dict = I18N[CURRENT_LANG] || I18N.id;

    milestones.forEach(ms => {
      const when = new Date(dob.getFullYear() + ms.age, dob.getMonth(), dob.getDate());
      const li = document.createElement('li');
      let cls;
      if (a.y > ms.age) cls = 'passed';
      else if (a.y === ms.age) cls = 'now';
      else cls = 'future';
      li.classList.add(cls);

      const dateStr = `${pad(when.getDate())} ${dict.months_full[when.getMonth()]} ${when.getFullYear()}`;
      const ageLbl = `${pad(ms.age, 2)} · ${t('ml.' + ms.key)}`;
      li.innerHTML = `
        <div class="tl-age">${ageLbl}</div>
        <div class="tl-when">${t('ml.' + ms.key)}</div>
        <p class="tl-desc">${t('ml.' + ms.key + '_desc')}</p>
        <div class="tl-date">${dateStr}</div>
      `;
      list.appendChild(li);
    });
  }

  // ---------- COSMOS ----------
  function renderCosmos(dob) {
    const a = ageDetails(dob);
    const root = $('#cosmosList');
    root.innerHTML = '';
    const sleep = Math.floor(a.totalDays * 0.33);
    const meals = Math.floor(a.totalDays * 3);
    const seasons = Math.floor(a.y * 4 + a.m / 3);
    const sunrises = Math.floor(a.totalDays);

    const moonwalk = new Date(1969, 6, 20);
    const web = new Date(1991, 7, 6);
    const sinceMoon = ageDetails(moonwalk, new Date());
    const sinceWeb = ageDetails(web, new Date());
    const moonSpan = `${sinceMoon.y} ${t('years_short')}`;
    const webSpan  = `${sinceWeb.y} ${t('years_short')}`;

    const rows = [
      { ico: '☾', h: t('cs.sleep'),    v: `${fmt(sleep)} ${t('days')}`, d: t('cs.sleep_d').replace('{n}', fmt(sleep)) },
      { ico: '⊞', h: t('cs.eaten'),    v: `${fmt(meals)}`,              d: t('cs.eaten_d').replace('{n}', fmt(meals)) },
      { ico: '✦', h: t('cs.seasons'),  v: `${seasons}`,                  d: t('cs.seasons_d').replace('{n}', seasons) },
      { ico: '☀', h: t('cs.sunrise'),  v: `${fmt(sunrises)}`,            d: t('cs.sunrise_d').replace('{n}', fmt(sunrises)) },
      { ico: '◐', h: t('cs.moonwalk'), v: moonSpan,                      d: t('cs.moonwalk_d').replace('{n}', moonSpan) },
      { ico: '⌘', h: t('cs.internet'), v: webSpan,                       d: t('cs.internet_d').replace('{n}', webSpan) },
      { ico: '∞', h: 'Einstein', v: '26', d: t('cs.einstein') },
      { ico: '♪', h: 'Mozart',   v: '35', d: t('cs.mozart') }
    ];
    rows.forEach(r => {
      const div = document.createElement('div');
      div.className = 'cs-row';
      div.innerHTML = `
        <div class="cs-ico">${r.ico}</div>
        <div>
          <h3 class="cs-h">${r.h}</h3>
          <p class="cs-v">${r.v}</p>
          <p class="cs-d">${r.d}</p>
        </div>`;
      root.appendChild(div);
    });
  }

  // ---------- HOROSCOPE ----------
  function renderHoroscope(zName) {
    const dict = HOROSCOPE[CURRENT_LANG] || HOROSCOPE.id;
    const text = dict[zName] || '';
    $('#horoText').textContent = text;
    const months = (I18N[CURRENT_LANG] || I18N.id).months_full;
    const now = new Date();
    $('#horoDate').textContent = `${pad(now.getDate())} ${months[now.getMonth()].toUpperCase()} ${now.getFullYear()}`;
  }

  // ---------- DAY-OF-WEEK TRIVIA ----------
  function renderTrivia(dob) {
    const dict = I18N[CURRENT_LANG] || I18N.id;
    const dow = dict.dow[dob.getDay()];
    $('#triviaDay').textContent = dow;
    $('#triviaQuote').textContent = dict.dow_quote[dow] || '';
    $('#dayOfWeek').textContent = dow;
  }

  // ---------- BORN FULL ----------
  function renderBorn(dob) {
    const dict = I18N[CURRENT_LANG] || I18N.id;
    $('#bornFull').textContent = `${pad(dob.getDate())} ${dict.months_full[dob.getMonth()]} ${dob.getFullYear()}`;
  }

  // ---------- GENERATION ----------
  function getGeneration(year) {
    if (year < 1928) return 'Greatest Gen';
    if (year < 1946) return 'Silent Gen';
    if (year < 1965) return 'Boomer';
    if (year < 1981) return 'Gen X';
    if (year < 1997) return 'Millennial';
    if (year < 2013) return 'Gen Z';
    if (year < 2025) return 'Gen Alpha';
    return 'Gen Beta';
  }

  // ---------- YEAR PROGRESS ----------
  function renderYearProgress(dob) {
    const now = new Date();
    const dict = I18N[CURRENT_LANG] || I18N.id;
    $('#yearProgYear').textContent = now.getFullYear();

    // personal year: from last birthday → next birthday
    const lastBday = (() => {
      let b = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
      if (b > now) b = new Date(now.getFullYear() - 1, dob.getMonth(), dob.getDate());
      return b;
    })();
    const nextBday = nextBirthday(dob, now);
    const personalSpan = nextBday - lastBday;
    const personalDone = now - lastBday;
    const personalPct = Math.min(100, Math.max(0, (personalDone / personalSpan) * 100));
    $('#ypPersonalFill').style.width = personalPct.toFixed(2) + '%';
    $('#ypPersonalPct').textContent = personalPct.toFixed(1) + '%';
    const a = ageDetails(dob, now);
    $('#ypPersonalAge').textContent = `${dict.age_summary
      .replace('{y}', a.y).replace('{m}', a.m).replace('{d}', a.d)}`;

    // calendar year
    const yStart = new Date(now.getFullYear(), 0, 1);
    const yEnd = new Date(now.getFullYear() + 1, 0, 1);
    const calPct = ((now - yStart) / (yEnd - yStart)) * 100;
    $('#ypCalFill').style.width = calPct.toFixed(2) + '%';
    $('#ypCalPct').textContent = calPct.toFixed(1) + '%';
    const dayOfYear = Math.floor((now - yStart) / 86400000) + 1;
    $('#ypCalAge').textContent = `${t('day_of_year').replace('{n}', dayOfYear)}`;

    // today progress
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayPct = ((now - dayStart) / 86400000) * 100;
    $('#ypDayFill').style.width = dayPct.toFixed(2) + '%';
    $('#ypDayPct').textContent = dayPct.toFixed(1) + '%';
    $('#ypDayHint').textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  // ---------- MILESTONE MOMENTS ----------
  function renderMoments(dob) {
    const list = $('#momentsList');
    list.innerHTML = '';
    const now = new Date();
    const dict = I18N[CURRENT_LANG] || I18N.id;

    // round-number targets in seconds
    const targets = [
      { unit: 'days', label: t('days'), pretty: '10,000 ' + t('days_short').toUpperCase(),
        msPerUnit: 86400000, target: 10000 },
      { unit: 'days', label: t('days'), pretty: '20,000 ' + t('days_short').toUpperCase(),
        msPerUnit: 86400000, target: 20000 },
      { unit: 'hours', label: t('hours'), pretty: '100,000 ' + t('hours_short').toUpperCase(),
        msPerUnit: 3600000, target: 100000 },
      { unit: 'hours', label: t('hours'), pretty: '500,000 ' + t('hours_short').toUpperCase(),
        msPerUnit: 3600000, target: 500000 },
      { unit: 'mins', label: t('minutes'), pretty: '1M ' + t('mins_short').toUpperCase(),
        msPerUnit: 60000, target: 1000000 },
      { unit: 'mins', label: t('minutes'), pretty: '10M ' + t('mins_short').toUpperCase(),
        msPerUnit: 60000, target: 10000000 },
      { unit: 'secs', label: t('seconds'), pretty: '1B ' + t('secs_short').toUpperCase(),
        msPerUnit: 1000, target: 1000000000 },
      { unit: 'secs', label: t('seconds'), pretty: '2B ' + t('secs_short').toUpperCase(),
        msPerUnit: 1000, target: 2000000000 }
    ];

    targets.forEach(tgt => {
      const reachAt = new Date(dob.getTime() + tgt.target * tgt.msPerUnit);
      const reached = reachAt <= now;
      const li = document.createElement('li');
      if (reached) li.classList.add('reached');

      let when;
      if (reached) {
        const ago = ageDetails(reachAt, now);
        when = `<strong>✓</strong> ${pad(reachAt.getDate())} ${dict.months_full[reachAt.getMonth()]} ${reachAt.getFullYear()}`;
      } else {
        const diff = reachAt - now;
        const days = Math.ceil(diff / 86400000);
        when = days < 365
          ? `${days} ${t('days_to_go')}`
          : `${pad(reachAt.getDate())} ${dict.months_full[reachAt.getMonth()]} ${reachAt.getFullYear()}`;
      }

      li.innerHTML = `
        <span class="moments__nm">${tgt.pretty}</span>
        <span class="moments__lbl">${tgt.label}</span>
        <span class="moments__when">${when}</span>`;
      list.appendChild(li);
    });
  }

  // ---------- LIFE IN WEEKS ----------
  function renderWeeks(dob) {
    const grid = $('#weeksGrid');
    grid.innerHTML = '';
    const totalYears = SETTINGS.lifeExpectancy;
    const totalWeeks = totalYears * 52;
    const now = new Date();
    const livedMs = now - dob;
    const livedWeeks = Math.floor(livedMs / (86400000 * 7));

    for (let i = 0; i < totalWeeks; i++) {
      const s = document.createElement('span');
      if (i < livedWeeks) s.classList.add('on');
      else if (i === livedWeeks) s.classList.add('now');
      const yearN = Math.floor(i / 52);
      const weekN = (i % 52) + 1;
      s.title = `Year ${yearN + 1} · Week ${weekN}`;
      grid.appendChild(s);
    }

    $('#weeksLived').textContent = fmt(livedWeeks);
    $('#weeksLeft').textContent = fmt(Math.max(0, totalWeeks - livedWeeks));
    $('#weeksPct').textContent = ((livedWeeks / totalWeeks) * 100).toFixed(1) + '%';
  }

  // ---------- BIORHYTHM ----------
  // Classic biorhythm pseudoscience: 3 sine waves from birth.
  // physical 23d, emotional 28d, intellectual 33d.
  let bioChart;
  function bioValueAt(daysSinceBirth, period) {
    return Math.sin((2 * Math.PI * daysSinceBirth) / period);
  }
  function renderBiorhythm(dob) {
    const ctx = $('#bioChart').getContext('2d');
    const now = new Date();
    const daysNow = (now - dob) / 86400000;
    const range = 30;       // ±15 days around today
    const labels = [], pData = [], eData = [], iData = [];
    for (let i = -15; i <= 15; i++) {
      labels.push(i === 0 ? '●' : (i > 0 ? `+${i}` : `${i}`));
      pData.push(bioValueAt(daysNow + i, 23) * 100);
      eData.push(bioValueAt(daysNow + i, 28) * 100);
      iData.push(bioValueAt(daysNow + i, 33) * 100);
    }

    if (bioChart) bioChart.destroy();
    const ink = getComputedStyle(document.body).getPropertyValue('--ink-mute').trim();
    const lineSoft = getComputedStyle(document.body).getPropertyValue('--line-soft').trim();
    bioChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Physical',     data: pData, borderColor: '#d4a24c', borderWidth: 2, tension: .35, pointRadius: 0, fill: false },
          { label: 'Emotional',    data: eData, borderColor: '#c44536', borderWidth: 2, tension: .35, pointRadius: 0, fill: false },
          { label: 'Intellectual', data: iData, borderColor: '#6e8b5a', borderWidth: 2, tension: .35, pointRadius: 0, fill: false }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          y: {
            min: -110, max: 110,
            grid: { color: lineSoft, drawTicks: false },
            ticks: { color: ink, font: { size: 10, family: 'JetBrains Mono' }, stepSize: 50 }
          },
          x: {
            grid: { color: lineSoft, drawTicks: false },
            ticks: { color: ink, font: { size: 10, family: 'JetBrains Mono' }, maxTicksLimit: 7 }
          }
        },
        animation: { duration: SETTINGS.motion === 'off' ? 0 : 900 }
      }
    });

    const todayValues = {
      Physical:     Math.round(bioValueAt(daysNow, 23) * 100),
      Emotional:    Math.round(bioValueAt(daysNow, 28) * 100),
      Intellectual: Math.round(bioValueAt(daysNow, 33) * 100)
    };
    const swatches = { Physical: '#d4a24c', Emotional: '#c44536', Intellectual: '#6e8b5a' };
    const labelI18n = { Physical: t('bio_physical'), Emotional: t('bio_emotional'), Intellectual: t('bio_intellectual') };
    const periods   = { Physical: '23 ' + t('days_short').toUpperCase(), Emotional: '28 ' + t('days_short').toUpperCase(), Intellectual: '33 ' + t('days_short').toUpperCase() };

    const legend = $('#bioLegend');
    legend.innerHTML = '';
    Object.keys(todayValues).forEach(k => {
      const v = todayValues[k];
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="swatch" style="background:${swatches[k]}"></span>
        <span class="bio-name">${labelI18n[k]}<small>${periods[k]}</small></span>
        <span class="bio-pct ${v < 0 ? 'neg' : ''}">${v > 0 ? '+' : ''}${v}%</span>`;
      legend.appendChild(li);
    });

    const months = (I18N[CURRENT_LANG] || I18N.id).months_full;
    $('#bioToday').textContent = `${pad(now.getDate())} ${months[now.getMonth()].toUpperCase()} ${now.getFullYear()}`;
  }

  // ---------- COMPARE TWO SUBJECTS ----------
  function runCompare() {
    const dobA = $('#cmpDobA').value;
    const dobB = $('#cmpDobB').value;
    const nameA = $('#cmpNameA').value.trim() || t('subject_a').replace(/\s/g,' ').replace('SUBJECT A','Subject A');
    const nameB = $('#cmpNameB').value.trim() || 'Subject B';
    if (!dobA || !dobB) { toast(t('cmp_need_both')); return; }

    const dA = new Date(dobA), dB = new Date(dobB);
    if (dA > new Date() || dB > new Date()) { toast(t('future_dob')); return; }
    const dict = I18N[CURRENT_LANG] || I18N.id;

    const aDet = ageDetails(dA);
    const bDet = ageDetails(dB);
    const older = dA < dB ? 'A' : 'B';

    $('#cmpOut').hidden = false;
    $('#cmpOutNameA').textContent = nameA;
    $('#cmpOutNameB').textContent = nameB;
    $('#cmpOutAgeA').textContent = `${aDet.y}${t('years_short')} ${aDet.m}${t('months_short')}`;
    $('#cmpOutAgeB').textContent = `${bDet.y}${t('years_short')} ${bDet.m}${t('months_short')}`;
    $('#cmpOutDobA').textContent = `${pad(dA.getDate())}/${pad(dA.getMonth()+1)}/${dA.getFullYear()}`;
    $('#cmpOutDobB').textContent = `${pad(dB.getDate())}/${pad(dB.getMonth()+1)}/${dB.getFullYear()}`;
    $('#cmpOutGenA').textContent = getGeneration(dA.getFullYear()).toUpperCase();
    $('#cmpOutGenB').textContent = getGeneration(dB.getFullYear()).toUpperCase();

    $('#cmpSideA').classList.toggle('older', older === 'A');
    $('#cmpSideB').classList.toggle('older', older === 'B');

    // diff
    const diffMs = Math.abs(dA - dB);
    const diffDet = ageDetails(
      dA < dB ? dA : dB,
      dA < dB ? dB : dA
    );
    $('#cmpDiff').textContent = `${diffDet.y}${t('years_short')} ${diffDet.m}${t('months_short')} ${diffDet.d}${t('days_short')}`;
    $('#cmpSecsApart').textContent = fmt(diffMs / 1000);

    // birthday gap (calendar days between birthdays)
    const bdayA = new Date(2000, dA.getMonth(), dA.getDate());
    const bdayB = new Date(2000, dB.getMonth(), dB.getDate());
    let bdayGap = Math.abs(Math.round((bdayA - bdayB) / 86400000));
    if (bdayGap > 182) bdayGap = 365 - bdayGap;
    $('#cmpBdayGap').textContent = `${bdayGap} ${t('days')}`;

    const zA = getZodiac(dA.getMonth() + 1, dA.getDate());
    const zB = getZodiac(dB.getMonth() + 1, dB.getDate());
    $('#cmpZodiacMatch').textContent = zA.name === zB.name
      ? `✓ ${zA.name}`
      : `${zA.sigil} / ${zB.sigil}`;

    const cA = getChinese(dA.getFullYear());
    const cB = getChinese(dB.getFullYear());
    $('#cmpChineseMatch').textContent = cA.name === cB.name
      ? `✓ ${cA.name}`
      : `${cA.glyph} / ${cB.glyph}`;

    // verdict
    const olderName = older === 'A' ? nameA : nameB;
    const youngerName = older === 'A' ? nameB : nameA;
    let verdict = t('cmp_verdict_diff')
      .replace('{older}', olderName)
      .replace('{younger}', youngerName)
      .replace('{y}', diffDet.y)
      .replace('{m}', diffDet.m)
      .replace('{d}', diffDet.d);
    if (diffMs < 86400000) verdict = t('cmp_verdict_same').replace('{a}', nameA).replace('{b}', nameB);
    $('#cmpVerdict').textContent = verdict;
  }

  // ---------- MAIN RENDER ----------
  function renderAlmanac(dobStr, name = '') {
    const dob = (dobStr instanceof Date) ? dobStr : new Date(dobStr);
    if (isNaN(dob.getTime())) { toast(t('no_dob')); return; }
    if (dob > new Date()) { toast(t('future_dob')); return; }

    state.dob = dob;
    state.name = name || '';
    window.__lastDob = dobStr;
    window.__lastName = state.name;

    $('#emptyState').hidden = true;
    $('#results').hidden = false;

    $('#subjectName').textContent = state.name || t('no_subject');
    renderBorn(dob);
    renderTrivia(dob);

    const a = ageDetails(dob);
    renderBattery(a.y + a.m / 12);
    renderAlloc(a.y + a.m / 12);

    const z = getZodiac(dob.getMonth() + 1, dob.getDate());
    $('#zodiacSigil').textContent = z.sigil;
    $('#zodiacName').textContent = z.name;
    $('#zodiacRange').textContent = `${pad(z.start[1])}/${pad(z.start[0])} → ${pad(z.end[1])}/${pad(z.end[0])}`;
    $('#zodiacElement').textContent = z.element;

    // chinese zodiac
    const cz = getChinese(dob.getFullYear());
    $('#chineseGlyph').textContent = cz.glyph;
    $('#chineseName').textContent = cz.name;
    $('#chineseElement').textContent = cz.element.toUpperCase();

    // life path
    const lp = getLifePath(dob);
    $('#lifePathNum').textContent = lp;
    $('#lifePathTrait').textContent = (LIFE_PATH_TRAITS[lp] || '').toUpperCase();

    // year progress
    renderYearProgress(dob);
    // milestone moments
    renderMoments(dob);
    // life in weeks
    renderWeeks(dob);
    // biorhythm
    renderBiorhythm(dob);

    // count-up the big year number on first paint
    if (!state.dob || +state.dob !== +dob) {
      countUp($('#bigYears'), ageDetails(dob).y);
    }

    renderHoroscope(z.name);
    renderTimeline(dob);
    renderCosmos(dob);

    if (state.odoId) clearInterval(state.odoId);
    state.odoId = renderOdometer(dob);

    startTicker(dob);
    startCountdown(dob);

    if (isBirthdayToday(dob)) celebrate();
  }
  window.renderAlmanac = renderAlmanac;

  // ---------- REVERSE DATE ----------
  function reverseDate() {
    const y = parseInt($('#rYears').value) || 0;
    const m = parseInt($('#rMonths').value) || 0;
    const d = parseInt($('#rDays').value) || 0;
    if (y === 0 && m === 0 && d === 0) { toast(t('invalid_age')); return; }
    const now = new Date();
    const result = new Date(now.getFullYear() - y, now.getMonth() - m, now.getDate() - d);
    const dict = I18N[CURRENT_LANG] || I18N.id;
    const out = $('#reverseOut');
    out.hidden = false;
    $('#reverseDate').textContent = `${dict.dow[result.getDay()]}, ${pad(result.getDate())} ${dict.months_full[result.getMonth()]} ${result.getFullYear()}`;
    const ms = now - result;
    $('#reverseExtra').textContent = `${fmt(ms / 86400000)} ${dict.days_short.toUpperCase()} · ${fmt(ms / 3600000)} ${dict.hours_short.toUpperCase()}`;
  }

  // ---------- ARCHIVE ----------
  const ARCHIVE_KEY = 'almanac.archive';
  function loadArchive() {
    try { return JSON.parse(localStorage.getItem(ARCHIVE_KEY) || '[]'); }
    catch { return []; }
  }
  function saveArchive(list) { localStorage.setItem(ARCHIVE_KEY, JSON.stringify(list)); }

  function saveCurrent() {
    if (!state.dob) { toast(t('no_dob')); return; }
    const list = loadArchive();
    const entry = {
      id: Date.now(),
      name: state.name || t('no_subject'),
      dob: state.dob.toISOString().slice(0, 10)
    };
    if (list.some(e => e.dob === entry.dob && e.name === entry.name)) {
      toast(t('saved_archive'));
      return;
    }
    list.unshift(entry);
    saveArchive(list);
    renderArchive();
    toast(t('saved_archive'));
  }

  function renderArchive() {
    const list = loadArchive();
    const ul = $('#archiveList');
    const dict = I18N[CURRENT_LANG] || I18N.id;
    $('#archiveCount').textContent = `${list.length} ${list.length === 1 ? 'ENTRY' : 'ENTRIES'}`;
    ul.innerHTML = '';
    if (!list.length) {
      ul.innerHTML = `<li class="archive__empty">${t('archive_empty')}</li>`;
      return;
    }
    list.forEach((e, i) => {
      const dob = new Date(e.dob);
      const a = ageDetails(dob);
      const li = document.createElement('li');
      li.className = 'ar-row';
      li.innerHTML = `
        <span class="ar-num">№ ${pad(list.length - i, 3)}</span>
        <span class="ar-name">${e.name}</span>
        <span class="ar-dob">${pad(dob.getDate())} · ${pad(dob.getMonth()+1)} · ${dob.getFullYear()}</span>
        <span class="ar-age">${a.y} ${t('years_short')} ${a.m} ${t('months_short')}</span>
        <span class="ar-actions">
          <button data-id="${e.id}" data-act="open">↳ Open</button>
          <button data-id="${e.id}" data-act="del">✕</button>
        </span>`;
      ul.appendChild(li);
    });
  }
  window.renderArchive = renderArchive;

  function clearArchive() {
    if (!confirm('Hapus semua arsip?')) return;
    saveArchive([]);
    renderArchive();
    toast(t('cleared_archive'));
  }

  // ---------- EXPORTS ----------
  function exportPDF() {
    if (!state.dob) { toast(t('no_dob')); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const dob = state.dob;
    const a = ageDetails(dob);
    const z = getZodiac(dob.getMonth() + 1, dob.getDate());
    const dict = I18N[CURRENT_LANG] || I18N.id;
    const W = 210, H = 297;

    // border
    doc.setDrawColor(140, 110, 50);
    doc.setLineWidth(0.6);
    doc.rect(12, 12, W - 24, H - 24);
    doc.setLineWidth(0.2);
    doc.rect(15, 15, W - 30, H - 30);

    // kicker
    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(140, 110, 50);
    doc.text('THE AGE ALMANAC · CERTIFICATE OF CHRONOMETRY', W/2, 28, { align: 'center' });

    // title
    doc.setFont('times', 'normal');
    doc.setFontSize(42);
    doc.setTextColor(30, 28, 22);
    doc.text('Certificate', W/2, 60, { align: 'center' });
    doc.setFont('times', 'italic');
    doc.text('of a life thus far', W/2, 75, { align: 'center' });

    // separator
    doc.setLineWidth(0.3);
    doc.setDrawColor(200, 180, 140);
    doc.line(60, 86, W - 60, 86);

    // body
    doc.setFont('times', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(60, 55, 45);
    doc.text('This is to certify that', W/2, 100, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.setTextColor(20, 18, 14);
    doc.text(state.name || t('no_subject'), W/2, 115, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(60, 55, 45);
    doc.text('born on', W/2, 130, { align: 'center' });
    doc.setFont('times', 'italic');
    doc.setFontSize(18);
    const bornStr = `${dict.dow[dob.getDay()]}, ${pad(dob.getDate())} ${dict.months_full[dob.getMonth()]} ${dob.getFullYear()}`;
    doc.text(bornStr, W/2, 142, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text('has accumulated', W/2, 158, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(36);
    doc.setTextColor(140, 110, 50);
    doc.text(`${a.y} years`, W/2, 175, { align: 'center' });

    doc.setFont('courier', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 75, 65);
    doc.text(`${a.m} MONTHS · ${a.d} DAYS · ${fmt(a.totalDays)} TOTAL DAYS`, W/2, 184, { align: 'center' });

    // separator
    doc.setDrawColor(200, 180, 140);
    doc.line(60, 198, W - 60, 198);

    // stats grid
    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 90, 70);
    const statsY = 212;
    doc.text('ZODIAC', 35, statsY);
    doc.text('HEARTBEATS', 90, statsY);
    doc.text('BREATHS', 145, statsY);

    doc.setFont('times', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(30, 28, 22);
    doc.text(`${z.sigil} ${z.name}`, 35, statsY + 8);
    doc.text(fmt(a.totalSecs * (80/60)), 90, statsY + 8);
    doc.text(fmt(a.totalSecs * (16/60)), 145, statsY + 8);

    // signature line
    doc.setLineWidth(0.2);
    doc.setDrawColor(180, 160, 120);
    doc.line(W/2 - 40, 252, W/2 + 40, 252);
    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 110, 50);
    doc.text('THE EDITOR · THE AGE ALMANAC', W/2, 258, { align: 'center' });

    // footer
    doc.setFontSize(7);
    doc.setTextColor(140, 130, 110);
    doc.text(`PRINTED ON ${new Date().toISOString().slice(0,10).toUpperCase()} · MMXXVI · № ${String(Date.now()).slice(-6)}`, W/2, 278, { align: 'center' });

    const filename = (state.name || 'subject').toString().replace(/\s+/g, '-').toLowerCase();
    doc.save(`almanac-${filename}.pdf`);
  }

  async function exportImage() {
    if (!state.dob) { toast(t('no_dob')); return; }
    const node = $('#results');
    const canvas = await html2canvas(node, {
      backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg').trim(),
      scale: 2,
      useCORS: true
    });
    const link = document.createElement('a');
    link.download = `almanac-${(state.name || 'subject').toString().replace(/\s+/g,'-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  // ---------- SHARE ----------
  function shareTwitter() {
    if (!state.dob) { toast(t('no_dob')); return; }
    const a = ageDetails(state.dob);
    const text = `My age in numbers: ${a.y}y ${a.m}m ${a.d}d · ${fmt(a.totalDays)} days. Typeset by The Age Almanac.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(location.href)}`, '_blank');
  }
  function shareWA() {
    if (!state.dob) { toast(t('no_dob')); return; }
    const a = ageDetails(state.dob);
    const text = `Almanac: ${a.y} thn ${a.m} bln ${a.d} hari · ${fmt(a.totalDays)} hari total. ${location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }
  function copyLink() {
    const url = state.dob
      ? `${location.origin}${location.pathname}?dob=${state.dob.toISOString().slice(0,10)}&name=${encodeURIComponent(state.name)}`
      : location.href;
    navigator.clipboard.writeText(url).then(() => toast(t('link_copied')));
  }

  // ---------- BIRTHDAY CELEBRATION ----------
  function celebrate() {
    confetti();
    const ov = $('#bdayOverlay');
    ov.hidden = false;
    $('#bdayClose').onclick = () => { ov.hidden = true; };
  }
  function confetti() {
    const wrap = document.createElement('div');
    wrap.className = 'confetti';
    document.body.appendChild(wrap);
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('span');
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDuration = (2 + Math.random() * 2.5) + 's';
      s.style.animationDelay = (Math.random() * 1.5) + 's';
      s.style.width = (4 + Math.random() * 6) + 'px';
      s.style.height = (10 + Math.random() * 8) + 'px';
      wrap.appendChild(s);
    }
    setTimeout(() => wrap.remove(), 5500);
  }

  // ---------- TABS ----------
  function activateTab(name) {
    $$('.tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === name));
    $$('.panel').forEach(p => p.classList.toggle('is-active', p.dataset.panel === name));
  }

  // ---------- THEME ----------
  function toggleTheme() {
    const cur = document.documentElement.dataset.theme;
    const next = cur === 'paper' ? 'ink' : 'paper';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('almanac.theme', next);
    if (state.dob) renderAlloc(ageDetails(state.dob).y);
  }

  // ---------- INIT ----------
  document.addEventListener('DOMContentLoaded', () => {
    // theme load
    const savedTheme = localStorage.getItem('almanac.theme') || 'ink';
    document.documentElement.dataset.theme = savedTheme;

    // edition number (random-ish stable)
    const edition = String((Date.now() % 999) + 1).padStart(3, '0');
    $('#editionNum').textContent = edition;
    $('#footerEdition').textContent = `${edition} / ∞`;

    updateTopbarDate();
    setInterval(updateTopbarDate, 60000);

    // tabs
    $$('.tab').forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));

    // theme toggle
    $('[data-theme-toggle]').addEventListener('click', toggleTheme);

    // calc
    $('#calcBtn').addEventListener('click', () => {
      const dob = $('#dob').value;
      const name = $('#profileName').value.trim();
      if (!dob) { toast(t('no_dob')); return; }
      renderAlmanac(dob, name);
    });
    $('#dob').addEventListener('change', () => {
      if ($('#dob').value) renderAlmanac($('#dob').value, $('#profileName').value.trim());
    });
    $('#profileName').addEventListener('input', () => {
      if (state.dob) {
        state.name = $('#profileName').value.trim();
        $('#subjectName').textContent = state.name || t('no_subject');
        window.__lastName = state.name;
      }
    });

    // save
    $('#saveBtn').addEventListener('click', saveCurrent);

    // reverse
    $('#reverseBtn').addEventListener('click', reverseDate);
    $('#cmpBtn').addEventListener('click', runCompare);

    // archive
    $('#clearArchive').addEventListener('click', clearArchive);
    $('#archiveList').addEventListener('click', e => {
      const btn = e.target.closest('button[data-act]');
      if (!btn) return;
      const id = parseInt(btn.dataset.id);
      const list = loadArchive();
      const idx = list.findIndex(x => x.id === id);
      if (idx === -1) return;
      if (btn.dataset.act === 'del') {
        list.splice(idx, 1);
        saveArchive(list);
        renderArchive();
        toast(t('deleted_one'));
      } else if (btn.dataset.act === 'open') {
        const e = list[idx];
        $('#dob').value = e.dob;
        $('#profileName').value = e.name === t('no_subject') ? '' : e.name;
        activateTab('chrono');
        renderAlmanac(e.dob, e.name === t('no_subject') ? '' : e.name);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // exports & shares
    $('#exportPDF').addEventListener('click', exportPDF);
    $('#exportImg').addEventListener('click', exportImage);
    $('#shareTwitter').addEventListener('click', shareTwitter);
    $('#shareWA').addEventListener('click', shareWA);
    $('#copyLink').addEventListener('click', copyLink);

    renderArchive();

    // ---------- SETTINGS DRAWER ----------
    function openDrawer()  { $('#drawer').hidden = false; document.body.style.overflow = 'hidden'; }
    function closeDrawer() { $('#drawer').hidden = true;  document.body.style.overflow = ''; }
    function openShortcuts()  { $('#shortcuts').hidden = false; }
    function closeShortcuts() { $('#shortcuts').hidden = true; }

    $('#settingsBtn').addEventListener('click', openDrawer);
    $('#helpBtn').addEventListener('click', openShortcuts);
    $$('[data-drawer-close]').forEach(el => el.addEventListener('click', closeDrawer));
    $$('[data-shortcuts-close]').forEach(el => el.addEventListener('click', closeShortcuts));

    // life expectancy slider
    const lifeRange = $('#lifeExpect');
    const lifeVal   = $('#lifeExpectVal');
    lifeRange.value = SETTINGS.lifeExpectancy;
    lifeVal.textContent = SETTINGS.lifeExpectancy;
    function updateRangeBg(el) {
      const min = +el.min, max = +el.max;
      el.style.setProperty('--p', `${((+el.value - min) / (max - min)) * 100}%`);
    }
    updateRangeBg(lifeRange);
    lifeRange.addEventListener('input', () => {
      SETTINGS.lifeExpectancy = +lifeRange.value;
      lifeVal.textContent = lifeRange.value;
      updateRangeBg(lifeRange);
      saveSettings();
      if (state.dob) {
        const a = ageDetails(state.dob);
        renderBattery(a.y + a.m / 12);
        renderWeeks(state.dob);
      }
    });

    // work hours pills
    $$('.seg-pill[data-work]').forEach(p => {
      p.classList.toggle('is-active', +p.dataset.work === SETTINGS.workHours);
      p.addEventListener('click', () => {
        $$('.seg-pill[data-work]').forEach(x => x.classList.remove('is-active'));
        p.classList.add('is-active');
        SETTINGS.workHours = +p.dataset.work;
        saveSettings();
        if (state.dob) renderAlloc(ageDetails(state.dob).y);
      });
    });

    // motion pills
    $$('.seg-pill[data-motion]').forEach(p => {
      p.classList.toggle('is-active', p.dataset.motion === SETTINGS.motion);
      p.addEventListener('click', () => {
        $$('.seg-pill[data-motion]').forEach(x => x.classList.remove('is-active'));
        p.classList.add('is-active');
        SETTINGS.motion = p.dataset.motion;
        saveSettings();
        document.documentElement.dataset.motion = SETTINGS.motion;
      });
    });
    document.documentElement.dataset.motion = SETTINGS.motion;

    // reset all
    $('#resetAllBtn').addEventListener('click', () => {
      if (!confirm(t('confirm_reset') || 'Reset all local data?')) return;
      ['almanac.archive','almanac.life','almanac.work','almanac.motion','almanac.theme','almanac.lang']
        .forEach(k => localStorage.removeItem(k));
      toast(t('reset_done') || 'All cleared.');
      setTimeout(() => location.reload(), 600);
    });

    // ---------- KEYBOARD SHORTCUTS ----------
    document.addEventListener('keydown', e => {
      const tag = (e.target.tagName || '').toLowerCase();
      const inField = tag === 'input' || tag === 'textarea' || tag === 'select';

      // Esc closes overlays
      if (e.key === 'Escape') {
        if (!$('#drawer').hidden) { closeDrawer(); return; }
        if (!$('#shortcuts').hidden) { closeShortcuts(); return; }
        if (!$('#bdayOverlay').hidden) { $('#bdayOverlay').hidden = true; return; }
      }

      if (inField) {
        // Enter from dob input → calculate
        if (e.key === 'Enter' && (e.target.id === 'dob' || e.target.id === 'profileName')) {
          $('#calcBtn').click();
        }
        return;
      }

      if (e.key === '?') { openShortcuts(); e.preventDefault(); return; }
      if (e.key === '/') { e.preventDefault(); $('#dob').focus(); return; }
      if (e.key.toLowerCase() === 't') { toggleTheme(); return; }
      if (e.key.toLowerCase() === 'l') {
        applyI18n(CURRENT_LANG === 'id' ? 'en' : 'id');
        return;
      }
      if (e.key.toLowerCase() === 's') { $('#saveBtn').click(); return; }
      const tabsMap = ['chrono','reverse','timeline','cosmos','weeks','compare','archive'];
      if (/^[1-7]$/.test(e.key)) {
        activateTab(tabsMap[+e.key - 1]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    });

    // hydrate from URL
    const params = new URLSearchParams(location.search);
    const urlDob = params.get('dob');
    const urlName = params.get('name');
    if (urlDob) {
      $('#dob').value = urlDob;
      if (urlName) $('#profileName').value = urlName;
      renderAlmanac(urlDob, urlName || '');
    }
  });

})();
