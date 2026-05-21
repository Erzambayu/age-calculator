# The Age Almanac · Chronometry of a Life

> **A quiet chronometry of your life** — kalkulator umur editorial dengan
> live ticking, life battery, cosmic odometer, biorhythm, dan timeline
> diam yang terus berdetak.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-d4a24c?style=flat-square)](https://erzambayu.me/age-calculator/)
[![License](https://img.shields.io/badge/License-MIT-1c1a16?style=flat-square)](LICENSE)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_JS_·_CSS-15181f?style=flat-square)]()

![Screenshot](Screenshot%202025-04-21%20100043.png)

---

## Apa itu

Sebuah almanak personal yang men-typeset hidupmu seperti halaman majalah
luxury watchmaking. Kamu kasih satu hari — hari pertamamu — dan ia
mengembalikan chronometry, kalkulasi orbit, perbandingan kosmik, hingga
sertifikat PDF.

Tidak ada framework. Vanilla HTML + CSS + JS. Berjalan langsung dari
satu file `index.html`.

## Aesthetic

- **Tema** — dark "Ink" (default) + light "Paper", switch via tombol `T`
- **Tipografi** — Fraunces (display serif, variable axes SOFT/WONK) +
  JetBrains Mono (data) + Inter (body)
- **Palette** — midnight `#0e1014` · ivory `#e9e3d4` · warm gold `#d4a24c`
  · crimson `#c44536` · sage `#6e8b5a`
- **Atmosfer** — grain texture overlay (SVG noise), vignette radial,
  asymmetric editorial grid

---

## Fitur

### 7 Tab Navigation

| № | Tab | Isi |
|---|---|---|
| 01 | **Chronograph** | Live ticking age + 11 cards (battery, zodiac, countdown, odometer, biorhythm, year progress, milestones, dll) |
| 02 | **Reverse Date** | Hitung tanggal lahir dari umur Y/M/D |
| 03 | **Timeline** | 14 milestone hidup (lahir → 80 tahun) dengan status passed/now/future |
| 04 | **Cosmos** | Perbandingan kosmik: tidur, makanan, sunrise, Apollo 11, World Wide Web, Einstein, Mozart |
| 05 | **Life in Weeks** | Grid 90×52 dots (4,680 minggu hidup), gold = lewat, crimson = minggu ini |
| 06 | **Compare** | Bandingkan 2 subjek: siapa lebih dulu, selisih ke detik, generasi, zodiac match |
| 07 | **Archive** | localStorage subjects yang pernah disusun, open / delete |

### Hero Result

Live ticker tahun · bulan · hari · jam · menit · detik dengan animasi
count-up tween di first paint (cubic ease-out, 1.1s).

### Cards Highlight

- **Life Battery** — 80 cells (configurable 50-120 via settings),
  filled gold = sudah hidup, current = pulse crimson, sisa = abu
- **Cosmic Odometer** — live ticking heartbeat, breath, blink, earth
  orbit, lunar cycle, earth spin (update tiap detik)
- **Biorhythm** — 3 sine waves (physical 23d, emotional 28d, intellectual
  33d) ±15 hari around today, nilai % hari ini di legend
- **Year Progress** — 3 progress bar: personal year (sejak ulang tahun
  terakhir), calendar year, today (live %)
- **Milestone Moments** — countdown ke 8 angka bulat (10k hari, 100k jam,
  1B detik, dst), reached ditandai ✓ + tanggal
- **Zodiac (expanded)** — Western (12 sign + element) + Chinese (12 hewan
  + 5 element) + Numerology Life Path (1-9, 11/22/33 master)
- **Day-of-week Trivia** — Monday's Child poem
- **Daily Horoscope** — rotasi puitis per zodiac

### Settings Drawer (slide dari kanan, `⚙`)

- **Life Expectancy** slider 50–120 tahun → re-render battery + weeks grid
- **Working Hours** pills 6/8/10/12 → re-render alloc chart
- **Motion** Full / Reduced / Off → CSS-level animation control
- **Reset Everything** → clear semua localStorage

### Keyboard Shortcuts (`?` untuk overlay)

```
/        Fokus tanggal lahir
Enter    Hitung almanak
1-7      Pindah tab
T        Toggle tema
L        Toggle bahasa
S        Simpan ke arsip
?        Tampilkan shortcuts
Esc      Tutup overlay
```

### Sharing & Export

- **PDF Certificate** — sertifikat A4 elegant via jsPDF (border ganda,
  garis pemisah, nomor edisi)
- **Image Export** — PNG hi-res via html2canvas
- **Twitter / WhatsApp** — share text dengan stats
- **Copy Link** — URL dengan `?dob=&name=` (auto-hydrate saat dibuka)

### i18n

Indonesia (default) + English. Toggle real-time tanpa reload, semua
string termasuk milestone deskripsi & cosmos comparisons.

---

## Stack

| Layer | Tools |
|---|---|
| Markup | HTML5 semantic |
| Style | Custom CSS (no framework), CSS Variables, Container Queries |
| Logic | Vanilla JavaScript ES6+ (IIFE module) |
| Charts | Chart.js 4 (doughnut + line) |
| PDF | jsPDF 2.5 |
| Image | html2canvas 1.4 |
| Persistence | LocalStorage |
| Fonts | Google Fonts (Fraunces variable, JetBrains Mono, Inter) |

Tidak ada bundler, tidak ada build step. Drop dan jalan.

---

## Install & Jalankan

```bash
git clone https://github.com/Erzambayu/age-calculator.git
cd age-calculator

# salah satu:
python -m http.server 8000
npx live-server
php -S localhost:8000

# atau buka langsung
start index.html        # Windows
open index.html          # macOS
xdg-open index.html      # Linux
```

Browser support: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.

---

## Struktur File

```
age-calculator/
├── index.html         # markup + CDN scripts
├── styles.css         # full custom stylesheet (~1300 lines)
├── script.js          # main engine (IIFE)
├── localization.js    # i18n dictionary + horoscope pool
├── README.md
└── Screenshot ...png
```

---

## URL Parameters

Auto-hydrate saat dibuka:

```
index.html?dob=1999-08-17&name=Erzam
```

---

## Roadmap

- [ ] Multi-language: ja / es / fr
- [ ] Service Worker untuk offline mode
- [ ] Custom zodiac systems (Mayan, Celtic Tree)
- [ ] Lunar phase saat lahir
- [ ] Progressive Web App manifest
- [ ] Dark mode auto-detect dari sistem

---

## Credits

- **Design & Code** — [Erzam Bayu](https://github.com/Erzambayu)
- **Original Concept** — [Zainalabrori](https://github.com/Zainalabrori)
- **Type** — Fraunces (Undercase Type), JetBrains Mono (JetBrains)

---

## License

MIT — pakai, fork, modif. Silakan rebuild jadi punyamu sendiri.

---

<div align="center">

**[Live Demo](https://erzambayu.me/age-calculator/)** ·
**[Issues](https://github.com/Erzambayu/age-calculator/issues)** ·
**[Pull Requests](https://github.com/Erzambayu/age-calculator/pulls)**

<sub>Set in Fraunces &amp; JetBrains Mono · Published MMXXVI</sub>

</div>
