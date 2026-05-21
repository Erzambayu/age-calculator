// ============================================================
// THE AGE ALMANAC · localization
// ID (default) + EN
// ============================================================

const I18N = {
  id: {
    // top
    kicker: 'CHRONOMETRY DIAM TENTANG HIDUPMU',
    lede: 'Setiap detik adalah artefak. Masukkan tanggal lahirmu — kami susun almanak pribadi: chronometry hidup, kalkulasi orbit, dan timeline diam yang terus berdetak.',

    // tabs
    tab_chrono: 'Chronograph',
    tab_reverse: 'Cari Tanggal',
    tab_timeline: 'Timeline',
    tab_cosmos: 'Kosmos',
    tab_weeks: 'Hidup dlm Minggu',
    tab_compare: 'Bandingkan',
    tab_archive: 'Arsip',

    // input
    dob_label: 'TANGGAL LAHIR',
    dob_hint: 'TAHUN · BULAN · TANGGAL',
    name_label: 'NAMA SUBJEK (OPSIONAL)',
    name_hint: 'UNTUK SERTIFIKAT & ARSIP',
    calc_btn: 'Susun Almanak',
    save_btn: '↳ Simpan ke Arsip',
    empty: 'Menunggu inputmu. Almanak akan tercetak begitu kamu memberi kami satu hari — hari pertamamu.',

    // hero
    subject_lbl: 'SUBJEK',
    born_lbl: 'LAHIR',
    years_full: 'TAHUN PENUH',
    live: 'LIVE · sedang berjalan',

    // cards
    life_battery: 'Baterai Hidup',
    battery_sub: 'BERDASARKAN HARAPAN HIDUP 80 TAHUN',
    lived: 'TELAH HIDUP',
    remaining: 'TERSISA',
    zodiac: 'Zodiak',
    next_bday: 'Ulang Tahun Berikutnya',
    cosmic: 'Odometer Kosmik',
    heartbeats: 'DETAK JANTUNG',
    breaths: 'NAPAS',
    blinks: 'KEDIPAN',
    orbits: 'ORBIT BUMI',
    moons: 'SIKLUS BULAN',
    spins: 'ROTASI BUMI',
    time_alloc: 'Waktu Terbagi',
    estimate: 'PERKIRAAN',
    alloc_sub: 'BAGAIMANA WAKTU HIDUPMU TERBAGI',
    in_numbers: 'Dalam Angka',
    weeks: 'MINGGU',
    days: 'HARI',
    hours: 'JAM',
    minutes: 'MENIT',
    seconds: 'DETIK',
    born_on: 'Lahir di Hari',
    horoscope_title: 'Catatan Harian · Horoskop',

    // expanded zodiac
    chinese_zodiac: 'ZODIAK CINA',
    life_path: 'JALAN HIDUP №',

    // year progress card
    year_progress: 'Progress Tahun',
    personal_year: 'TAHUN PRIBADI',
    calendar_year: 'TAHUN KALENDER',
    day_progress: 'HARI INI',
    day_of_year: 'hari ke-{n}',

    // milestone moments
    milestone_moments: 'Momen Tonggak',
    round_numbers: 'ANGKA BULAT',
    moments_sub: 'MOMEN ANGKA BULAT BERIKUTNYA YANG AKAN KAMU CAPAI',

    // weeks tab
    wk_h: 'Hidupmu, dalam minggu.',
    wk_sub: 'Setiap titik adalah satu minggu. 90 tahun · 4,680 minggu. Yang sudah lewat ditandai emas — yang sekarang berdetak di tengah grid.',
    weeks_lived: 'MINGGU TELAH LEWAT',
    weeks_left: 'MINGGU TERSISA',
    weeks_pct: 'PROGRESS',
    weeks_lived_l: 'Sudah lewat',
    weeks_now_l: 'Minggu ini',
    weeks_future_l: 'Belum datang',

    // compare tab
    cmp_h: 'Dua subjek, berdampingan.',
    cmp_sub: 'Bandingkan dua tanggal lahir — siapa lebih dulu, selisih ke detik, generasi, dan jarak ulang tahun di kalender.',
    subject_a: 'SUBJEK A',
    subject_b: 'SUBJEK B',
    cmp_btn: 'Bandingkan',
    diff_lbl: 'SELISIH',
    seconds_apart: 'JARAK DETIK',
    bday_gap: 'JARAK ULANG TAHUN',
    same_zodiac: 'ZODIAK',
    same_chinese: 'ZODIAK CINA',
    cmp_need_both: 'Isi kedua tanggal lahir',
    cmp_verdict_same: '{a} dan {b} lahir di hari yang sama. Sebuah kebetulan langka.',
    cmp_verdict_diff: '{older} lebih dulu hadir di dunia, mendahului {younger} sejauh {y} tahun {m} bulan {d} hari.',

    // biorhythm
    biorhythm: 'Biorhythm',
    bio_sub: 'SIKLUS HARIAN · FISIK 23H · EMOSIONAL 28H · INTELEKTUAL 33H',
    bio_physical: 'Fisik',
    bio_emotional: 'Emosional',
    bio_intellectual: 'Intelektual',

    // settings drawer
    settings_h: 'Atur almanakmu.',
    life_expect: 'HARAPAN HIDUP',
    life_expect_hint: 'Mengubah seluruh kalkulasi battery, weeks grid, dan remaining time.',
    years_expectancy: 'TAHUN',
    working_hours: 'JAM KERJA HARIAN',
    working_hours_hint: 'Mempengaruhi alokasi waktu di chart "Time Allocated".',
    motion: 'MOTION',
    motion_full: 'Penuh',
    motion_reduced: 'Lembut',
    motion_off: 'Mati',
    danger_zone: 'ZONA BAHAYA',
    danger_hint: 'Hapus semua data lokal: arsip, pengaturan, dan preferensi bahasa.',
    reset_all: '↳ Reset Semuanya',
    confirm_reset: 'Yakin hapus semua data lokal?',
    reset_done: 'Semua data dihapus.',

    // shortcuts overlay
    shortcuts_h: 'Pintasan keyboard.',
    kb_focus: 'Fokus tanggal lahir',
    kb_calc: 'Hitung almanak',
    kb_tabs: 'Pindah tab',
    kb_theme: 'Toggle tema',
    kb_lang: 'Toggle bahasa',
    kb_save: 'Simpan ke arsip',
    kb_help: 'Tampilkan menu ini',
    kb_close: 'Tutup overlay',

    // alloc segments
    alloc_sleep: 'Tidur',
    alloc_work: 'Sekolah / Kerja',
    alloc_eat: 'Makan',
    alloc_screen: 'Layar & Gawai',
    alloc_travel: 'Perjalanan',
    alloc_other: 'Lainnya',

    // actions
    copy_link: 'Salin Link',
    export_pdf: 'Sertifikat PDF',
    export_img: 'Simpan Gambar',

    // reverse
    reverse_h: 'Jika kamu hanya tahu umurnya,<br/>kami yang cari harinya.',
    reverse_sub: 'Masukkan umur dalam tahun, bulan, dan hari. Almanak akan menelusuri kalender mundur untuk menemukan tanggal lahirmu.',
    years: 'TAHUN',
    months: 'BULAN',
    reverse_btn: 'Hitung Tanggal Lahir',
    result_lbl: 'HASIL',

    // timeline
    tl_h: 'Tonggak hidup & jalan ke depan.',
    tl_sub: 'Hitung dulu di tab Chronograph. Timeline akan terisi otomatis.',

    // cosmos
    cs_h: 'Perbandingan lintas waktu.',
    cs_sub: 'Posisi usiamu di antara peristiwa, tokoh, dan konstanta semesta.',

    // archive
    ar_h: 'Arsip.',
    ar_sub: 'Kumpulan subjek yang pernah disusun almanaknya. Tersimpan lokal di peramban.',
    clear_all: '↳ Hapus Semua',
    archive_empty: 'Arsip masih kosong. Simpan satu subjek untuk memulai.',

    // colophon
    set_in: 'DIATUR DALAM',
    published: 'DITERBITKAN OLEH',

    // birthday
    bday_title: 'Selamat Ulang Tahun.',
    bday_sub: 'Hari ini almanakmu berdetak satu tahun lebih panjang.',
    bday_close: 'Lanjut →',

    // dynamic strings
    days_short: 'h', hours_short: 'j', mins_short: 'mn', secs_short: 'd',
    years_short: 'thn', months_short: 'bln',
    today_is_bday: 'HARI INI HARI ULANG TAHUN ✦',
    days_to_go: 'hari lagi',
    in_days: 'dalam {n} hari',
    no_subject: 'Subjek Anonim',
    age_summary: '{y} tahun {m} bulan {d} hari',

    // toast
    saved_archive: 'Tersimpan di arsip ✓',
    cleared_archive: 'Arsip dikosongkan',
    link_copied: 'Link disalin ✓',
    no_dob: 'Masukkan tanggal lahir dulu',
    future_dob: 'Tanggal lahir gak boleh di masa depan',
    invalid_age: 'Umur tidak valid',
    deleted_one: 'Entri dihapus',

    // days of week
    dow: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
    dow_quote: {
      'Minggu': 'Anak hari Minggu — penuh karunia & rahmat.',
      'Senin': 'Anak hari Senin — berwajah cantik & lembut.',
      'Selasa': 'Anak hari Selasa — anggun & penuh pesona.',
      'Rabu': 'Anak hari Rabu — penuh duka, tapi mendalam.',
      'Kamis': 'Anak hari Kamis — punya jalan jauh untuk ditempuh.',
      'Jumat': 'Anak hari Jumat — penyayang & murah hati.',
      'Sabtu': 'Anak hari Sabtu — bekerja keras untuk hidupnya.'
    },

    months_full: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],

    // milestones
    ml: {
      birth: 'Hari pertama',
      birth_desc: 'Awal mula. Halaman pertama.',
      walking: 'Langkah pertama',
      walking_desc: 'Tubuh belajar memberontak melawan gravitasi.',
      school: 'Sekolah dimulai',
      school_desc: 'Dunia menjadi sedikit lebih besar dan lebih berisik.',
      decade: 'Satu dekade',
      decade_desc: 'Sepuluh tahun di Bumi. Sudah banyak musim yang dilihat.',
      teen: 'Memasuki remaja',
      teen_desc: 'Ruang antara anak-anak dan diri yang akan datang.',
      adult: 'Dewasa secara hukum',
      adult_desc: 'Kebebasan baru, beban baru, semua sekaligus.',
      twenties: 'Dua puluhan',
      twenties_desc: 'Dekade pencarian. Banyak salah, banyak rasa.',
      quarter: 'Seperempat abad',
      quarter_desc: '25 tahun. Cukup waktu untuk mulai mengerti diri sendiri.',
      thirty: 'Tiga puluh',
      thirty_desc: 'Bukan akhir muda — tapi awal kebijaksanaan.',
      forty: 'Empat puluh',
      forty_desc: 'Kata orang, hidup baru saja dimulai.',
      half: 'Setengah abad',
      half_desc: '50 tahun cerita yang dibawa ke mana pun pergi.',
      sixty: 'Enam puluh',
      sixty_desc: 'Waktu memberi rasa, dan rasa memberi pulang.',
      seventy: 'Tujuh puluh',
      seventy_desc: 'Tujuh dekade — hidup sebagai panjang doa.',
      eighty: 'Delapan puluh',
      eighty_desc: 'Almanak masih terbuka. Halaman masih bersih.'
    },

    // cosmos comparisons
    cs: {
      sleep: 'Telah tidur',
      sleep_d: 'kira-kira sebanyak {n} hari penuh dihabiskan dalam mimpi.',
      eaten: 'Telah makan',
      eaten_d: 'sekitar {n} kali makan utama, plus camilan tak terhitung.',
      seasons: 'Telah melihat',
      seasons_d: '{n} musim datang dan pergi di belahan bumi yang sama.',
      sunrise: 'Telah disambut',
      sunrise_d: '{n} kali matahari terbit. Kebanyakan saat masih tidur.',
      moonwalk: 'Apollo 11',
      moonwalk_d: '{n} sejak Neil Armstrong menginjak bulan.',
      internet: 'World Wide Web',
      internet_d: '{n} sejak Tim Berners-Lee mempublikasikan web.',
      einstein: 'Saat usia inilah Einstein menerbitkan E=mc² (26 tahun).',
      mozart: 'Mozart wafat di usia 35. Karyanya melampaui hidupnya.',
      old: 'Masih banyak halaman tersisa di almanak ini.',
      young: 'Almanak masih sangat baru. Tinta belum kering.'
    }
  },

  en: {
    kicker: 'A QUIET CHRONOMETRY OF YOUR LIFE',
    lede: 'Every second is an artifact. Enter your date of birth — we typeset a personal almanac: chronometry of life, orbital arithmetic, and a quiet timeline that keeps ticking.',

    tab_chrono: 'Chronograph',
    tab_reverse: 'Reverse Date',
    tab_timeline: 'Timeline',
    tab_cosmos: 'Cosmos',
    tab_weeks: 'Life in Weeks',
    tab_compare: 'Compare',
    tab_archive: 'Archive',

    dob_label: 'DATE OF BIRTH',
    dob_hint: 'YYYY · MM · DD',
    name_label: 'SUBJECT NAME (OPTIONAL)',
    name_hint: 'FOR CERTIFICATE & ARCHIVE',
    calc_btn: 'Render Almanac',
    save_btn: '↳ Save to Archive',
    empty: 'Awaiting your input. The almanac will be typeset the moment you give us one day — your first.',

    subject_lbl: 'SUBJECT',
    born_lbl: 'BORN',
    years_full: 'YEARS COMPLETE',
    live: 'LIVE · counting',

    life_battery: 'Life Battery',
    battery_sub: 'BASED ON 80-YEAR LIFE EXPECTANCY',
    lived: 'LIVED',
    remaining: 'REMAINING',
    zodiac: 'Zodiac',
    next_bday: 'Next Birthday',
    cosmic: 'Cosmic Odometer',
    heartbeats: 'HEARTBEATS',
    breaths: 'BREATHS',
    blinks: 'BLINKS',
    orbits: 'EARTH ORBITS',
    moons: 'LUNAR CYCLES',
    spins: 'EARTH SPINS',
    time_alloc: 'Time Allocated',
    estimate: 'ESTIMATE',
    alloc_sub: 'HOW YOUR LIFE GETS DIVIDED',
    in_numbers: 'In Numbers',
    weeks: 'WEEKS',
    days: 'DAYS',
    hours: 'HOURS',
    minutes: 'MINUTES',
    seconds: 'SECONDS',
    born_on: 'Born on a',
    horoscope_title: 'Daily Note · Horoscope',

    chinese_zodiac: 'CHINESE ZODIAC',
    life_path: 'LIFE PATH №',

    year_progress: 'Year Progress',
    personal_year: 'PERSONAL YEAR',
    calendar_year: 'CALENDAR YEAR',
    day_progress: 'TODAY',
    day_of_year: 'day {n} of the year',

    milestone_moments: 'Milestone Moments',
    round_numbers: 'ROUND NUMBERS',
    moments_sub: 'THE NEXT ROUND-NUMBER MOMENTS YOU WILL REACH',

    wk_h: 'Your life, in weeks.',
    wk_sub: 'Each dot is one week. 90 years · 4,680 weeks. Lived ones turn gold — the current week pulses in the middle of the grid.',
    weeks_lived: 'WEEKS LIVED',
    weeks_left: 'WEEKS LEFT',
    weeks_pct: 'PROGRESS',
    weeks_lived_l: 'Lived',
    weeks_now_l: 'This week',
    weeks_future_l: 'Yet to come',

    cmp_h: 'Two subjects, side by side.',
    cmp_sub: 'Compare two birth dates — who came first, the gap to the second, generations, and birthday distance on the calendar.',
    subject_a: 'SUBJECT A',
    subject_b: 'SUBJECT B',
    cmp_btn: 'Compare',
    diff_lbl: 'DIFFERENCE',
    seconds_apart: 'SECONDS APART',
    bday_gap: 'BIRTHDAY GAP',
    same_zodiac: 'ZODIAC',
    same_chinese: 'CHINESE',
    cmp_need_both: 'Fill both birth dates',
    cmp_verdict_same: '{a} and {b} were born on the same day. A rare coincidence.',
    cmp_verdict_diff: '{older} arrived first, ahead of {younger} by {y} years {m} months {d} days.',

    biorhythm: 'Biorhythm',
    bio_sub: 'DAILY CYCLES · PHYSICAL 23D · EMOTIONAL 28D · INTELLECTUAL 33D',
    bio_physical: 'Physical',
    bio_emotional: 'Emotional',
    bio_intellectual: 'Intellectual',

    settings_h: 'Configure your almanac.',
    life_expect: 'LIFE EXPECTANCY',
    life_expect_hint: 'Changes battery, weeks grid, and remaining-time math.',
    years_expectancy: 'YEARS',
    working_hours: 'WORKING DAY HOURS',
    working_hours_hint: 'Affects the "Time Allocated" chart.',
    motion: 'MOTION',
    motion_full: 'Full',
    motion_reduced: 'Reduced',
    motion_off: 'Off',
    danger_zone: 'DANGER ZONE',
    danger_hint: 'Erase all local data: archive, settings, and language preference.',
    reset_all: '↳ Reset Everything',
    confirm_reset: 'Reset all local data?',
    reset_done: 'All cleared.',

    shortcuts_h: 'Keyboard shortcuts.',
    kb_focus: 'Focus birth date',
    kb_calc: 'Calculate almanac',
    kb_tabs: 'Switch tab',
    kb_theme: 'Toggle theme',
    kb_lang: 'Toggle language',
    kb_save: 'Save to archive',
    kb_help: 'Show this menu',
    kb_close: 'Close overlay',

    alloc_sleep: 'Sleep',
    alloc_work: 'School / Work',
    alloc_eat: 'Eating',
    alloc_screen: 'Screens',
    alloc_travel: 'Commute',
    alloc_other: 'Other',

    copy_link: 'Copy Link',
    export_pdf: 'PDF Certificate',
    export_img: 'Save Image',

    reverse_h: "If you only know the age,<br/>we'll find the day.",
    reverse_sub: 'Enter age in years, months and days. The almanac will retrace the calendar to find your birth date.',
    years: 'YEARS',
    months: 'MONTHS',
    reverse_btn: 'Compute Birth Date',
    result_lbl: 'RESULT',

    tl_h: 'Milestones & the road ahead.',
    tl_sub: 'Calculate first in the Chronograph tab. Timeline will fill itself.',

    cs_h: 'Comparisons across time.',
    cs_sub: 'Where your age sits among events, figures, and constants of the cosmos.',

    ar_h: 'The archive.',
    ar_sub: 'A collection of subjects whose almanacs were typeset. Saved locally.',
    clear_all: '↳ Clear All',
    archive_empty: 'Archive is empty. Save a subject to begin.',

    set_in: 'SET IN',
    published: 'PUBLISHED BY',

    bday_title: 'Happy Birthday.',
    bday_sub: "Today your almanac ticks one year longer.",
    bday_close: 'Continue →',

    days_short: 'd', hours_short: 'h', mins_short: 'm', secs_short: 's',
    years_short: 'y', months_short: 'mo',
    today_is_bday: 'TODAY IS YOUR BIRTHDAY ✦',
    days_to_go: 'days to go',
    in_days: 'in {n} days',
    no_subject: 'Anonymous Subject',
    age_summary: '{y}y {m}m {d}d',

    saved_archive: 'Saved to archive ✓',
    cleared_archive: 'Archive cleared',
    link_copied: 'Link copied ✓',
    no_dob: 'Please enter a birth date',
    future_dob: 'Birth date cannot be in the future',
    invalid_age: 'Invalid age',
    deleted_one: 'Entry removed',

    dow: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    dow_quote: {
      'Sunday':    "Sunday's child is full of grace.",
      'Monday':    "Monday's child is fair of face.",
      'Tuesday':   "Tuesday's child is full of grace.",
      'Wednesday': "Wednesday's child is full of woe.",
      'Thursday':  "Thursday's child has far to go.",
      'Friday':    "Friday's child is loving and giving.",
      'Saturday':  "Saturday's child works hard for a living."
    },

    months_full: ['January','February','March','April','May','June','July','August','September','October','November','December'],

    ml: {
      birth: 'Day one',
      birth_desc: 'The beginning. The first page.',
      walking: 'First steps',
      walking_desc: 'A small body learning to revolt against gravity.',
      school: 'School begins',
      school_desc: 'The world becomes a little larger, a little louder.',
      decade: 'A full decade',
      decade_desc: 'Ten years on Earth. Many seasons already witnessed.',
      teen: 'Into the teens',
      teen_desc: 'The room between childhood and the self that will be.',
      adult: 'Legally adult',
      adult_desc: 'New freedoms and new weights, all at once.',
      twenties: 'The twenties',
      twenties_desc: 'A decade of searching. Many wrongs, many feelings.',
      quarter: 'A quarter century',
      quarter_desc: '25 years. Enough time to begin understanding oneself.',
      thirty: 'Thirty',
      thirty_desc: 'Not the end of youth — the start of wisdom.',
      forty: 'Forty',
      forty_desc: 'They say life only just begins.',
      half: 'Half a century',
      half_desc: '50 years of stories carried wherever you go.',
      sixty: 'Sixty',
      sixty_desc: 'Time gives flavour, and flavour finds its way home.',
      seventy: 'Seventy',
      seventy_desc: 'Seven decades — a life as long as a prayer.',
      eighty: 'Eighty',
      eighty_desc: 'The almanac stays open. Pages still pristine.'
    },

    cs: {
      sleep: "You've slept",
      sleep_d: 'roughly {n} full days spent inside dreams.',
      eaten: "You've eaten",
      eaten_d: 'around {n} main meals, plus countless snacks.',
      seasons: "You've witnessed",
      seasons_d: '{n} seasons come and go in the same hemisphere.',
      sunrise: "You've been greeted by",
      sunrise_d: '{n} sunrises. Most of them while still asleep.',
      moonwalk: 'Apollo 11',
      moonwalk_d: '{n} since Neil Armstrong stepped onto the moon.',
      internet: 'World Wide Web',
      internet_d: '{n} since Tim Berners-Lee published the web.',
      einstein: 'At this age, Einstein published E=mc² (26).',
      mozart: 'Mozart died at 35. His work outlived his life.',
      old: 'Plenty of pages remain in this almanac.',
      young: 'The almanac is still very new. The ink is wet.'
    }
  }
};

// ---------- horoscope pool (sederhana, rotasi harian) ----------
const HOROSCOPE = {
  id: {
    Aries: 'Hari ini tentang dorongan tenang, bukan ledakan. Mulai sesuatu yang kecil, biarkan ia tumbuh sendiri.',
    Taurus: 'Bumi memintamu pelan-pelan. Sebuah keputusan baik akan datang dari ketenangan, bukan ketergesaan.',
    Gemini: 'Kata-katamu berbobot lebih dari biasanya. Pilih satu percakapan, dan jadikan ia sungguh-sungguh.',
    Cancer: 'Rasa pulang itu bisa hadir di tempat tak terduga. Biarkan dirimu disambut.',
    Leo: 'Kebanggaan yang baik bukan teriakan. Ia adalah cara berdiri tanpa minta maaf.',
    Virgo: 'Detail-detail kecil hari ini menyusun sesuatu yang besar di lain hari. Catat semuanya.',
    Libra: 'Keseimbangan bukan diam — ia gerakan halus yang terus menyesuaikan. Percayalah ritmemu.',
    Scorpio: 'Yang lama harus ditinggalkan agar yang baru bisa lewat. Hari ini hari pelepasan.',
    Sagittarius: 'Cakrawala memanggil. Tapi peta yang baik tidak dibuat dengan tergesa-gesa.',
    Capricorn: 'Hasil datang lambat tapi pasti. Hari ini sebuah batu kecil dipasang di pondasi besar.',
    Aquarius: 'Idemu terlalu maju buat sebagian orang. Itu wajar. Teruskan saja.',
    Pisces: 'Mimpi hari ini perlu didengarkan, bukan ditafsirkan. Ada pesan di lapisan dalamnya.'
  },
  en: {
    Aries: "Today is about a quiet push, not a blast. Start something small, let it grow on its own.",
    Taurus: "The earth asks you to slow. A good decision arrives from stillness, not haste.",
    Gemini: "Your words weigh more than usual. Pick one conversation and make it truly count.",
    Cancer: "The feeling of home can show up in unexpected places. Let yourself be welcomed.",
    Leo: "Good pride is not a shout. It is the way you stand without apology.",
    Virgo: "Today's small details compose something larger another day. Note them down.",
    Libra: "Balance is not stillness — it is the soft motion that keeps adjusting. Trust your rhythm.",
    Scorpio: "The old must be left behind so the new can pass. Today is a day of release.",
    Sagittarius: "The horizon calls. But a good map is never drawn in a hurry.",
    Capricorn: "Results come slowly but surely. Today a small stone is set into a large foundation.",
    Aquarius: "Your ideas are too far ahead for some. That's fine. Carry on.",
    Pisces: "Today's dreams want to be heard, not interpreted. There is a message in their inner layer."
  }
};

// ---------- runtime ----------
let CURRENT_LANG = localStorage.getItem('almanac.lang') || 'id';

function t(key) {
  const dict = I18N[CURRENT_LANG] || I18N.id;
  // dotted keys eg "ml.birth"
  return key.split('.').reduce((o, k) => (o == null ? null : o[k]), dict) ?? key;
}

function applyI18n(lang) {
  CURRENT_LANG = lang;
  localStorage.setItem('almanac.lang', lang);
  document.documentElement.lang = lang;

  // text content from data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val != null) el.innerHTML = val;
  });
  // placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')) || '');
  });

  // segmented language buttons
  document.querySelectorAll('.seg[data-lang]').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });

  // re-render dynamic stuff if already calculated
  if (typeof window.renderAlmanac === 'function' && window.__lastDob) {
    window.renderAlmanac(window.__lastDob, window.__lastName);
  }
  if (typeof window.renderArchive === 'function') window.renderArchive();
  if (typeof window.updateTopbarDate === 'function') window.updateTopbarDate();
}

// ---------- init ----------
document.addEventListener('DOMContentLoaded', () => {
  // wire seg lang
  document.querySelectorAll('.seg[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => applyI18n(btn.dataset.lang));
  });
  applyI18n(CURRENT_LANG);
});
