// Objek Lokalisasi - Kamus bahasa
const translations = {
    // Bahasa Indonesia
    'id': {
      'title': 'Kalkulator Umur Interaktif',
      'tab_age': 'Hitung Umur',
      'tab_birth': 'Cari Tanggal Lahir',
      'tab_timeline': 'Timeline Kehidupan',
      'tab_comparison': 'Perbandingan',
      'tab_stats': 'Statistik',
      'dob_label': 'Masukkan Tanggal Lahir',
      'calculate_btn': '✨ Hitung Umur Saya ✨',
      'age_label': 'Masukkan Umur Anda',
      'years_label': 'Tahun',
      'months_label': 'Bulan',
      'days_label': 'Hari',
      'age_format_label': 'Atau masukkan langsung format "X tahun Y bulan Z hari"',
      'age_input_placeholder': 'contoh: 19 tahun 2 bulan 13 hari',
      'find_birth_btn': 'Cari Tanggal Lahir',
      'age_result_prefix': 'Umur Anda:',
      'age_result_or': 'Atau sekitar:',
      'countdown_prefix': 'Hitung Mundur Ulang Tahun Berikutnya:',
      'happy_birthday': 'Selamat ulang tahun!',
      'birth_date_prefix': 'Berdasarkan umur',
      'birth_date_suffix': 'Anda lahir pada:',
      'years_text': 'tahun',
      'months_text': 'bulan',
      'days_text': 'hari',
      'weeks_text': 'minggu',
      'hours_text': 'jam',
      'minutes_text': 'menit',
      'seconds_text': 'detik',
      'error_no_dob': 'Silakan masukkan tanggal lahir Anda.',
      'error_future_date': 'Tanggal lahir tidak boleh di masa depan.',
      'error_no_age': 'Silakan masukkan umur Anda.',
      'and_text': 'dan',
      'age_details': "Detail Umur",
      'zodiac': "Zodiak",
      'birthday_day': "Hari Ulang Tahun",
      'share': "Bagikan",
      'export': "Ekspor PDF",
      'additional_formats': 'Format Tambahan',
      'quarters_text': 'kuartal',
      'decades_text': 'dekade',
      'no_history': 'Belum ada riwayat perhitungan',
      'history_title': 'Riwayat Perhitungan',
      'delete_history': 'Hapus',
      'clear_all_history': 'Hapus Semua',
      'error_loading_history': 'Gagal memuat riwayat',
      'no_horoscope': "Maaf, ramalan zodiak tidak tersedia saat ini.",
      'fun_facts_title': 'Fakta Menarik',
      'achievements_title': 'Pencapaian Hidup',
      'timeline_title': 'Timeline Kehidupan Anda',
      'timeline_subtitle': 'Jelajahi milestone penting dalam perjalanan hidup Anda',
      'comparison_title': 'Perbandingan Usia',
      'comparison_subtitle': 'Bandingkan usia Anda dengan tokoh terkenal dan selebriti',
      'stats_title': 'Statistik Hidup',
      'stats_subtitle': 'Analisis mendalam tentang perjalanan hidup Anda',
      'detailed_stats': 'Statistik Terperinci',
      'heartbeats': 'Detak Jantung',
      'breaths': 'Napas',
      'sleep_hours': 'Jam Tidur',
      'meals': 'Makanan',
      'horoscope_title': 'Horoskop Harian',
      'share_results': 'Bagikan Hasil Anda',
      'facebook': 'Facebook',
      'twitter': 'Twitter',
      'whatsapp': 'WhatsApp',
      'export_pdf': 'Export PDF',
      'download_image': 'Download Gambar',
      'birth_finder_title': 'Masukkan Umur Anda',
      'birth_finder_subtitle': 'Temukan tanggal lahir berdasarkan umur',
      'main_age_text': 'Tahun Penuh Pengalaman',
      'life_progress': 'Perjalanan Hidup',
      'age_breakdown': 'Breakdown Umur',
      'lived_years': 'Telah Hidup',
      'future_years': 'Masa Depan',
      'quick_today': 'Hari Ini',
      'quick_yesterday': 'Kemarin',
      'milestone_first_steps': 'Langkah Pertama',
      'milestone_school': 'Mulai Sekolah',
      'milestone_decade': 'Satu Dekade',
      'milestone_adult': 'Dewasa Secara Hukum',
      'milestone_twenties': 'Era Dua Puluhan',
      'milestone_quarter': 'Seperempat Abad',
      'milestone_thirty': 'Tiga Puluh Tahun Bijaksana',
      'milestone_fourty': 'Kehidupan Dimulai',
      'milestone_half': 'Setengah Abad'
    },
    // Bahasa Inggris
    'en': {
      'title': 'Interactive Age Calculator',
      'tab_age': 'Calculate Age',
      'tab_birth': 'Find Birth Date',
      'tab_timeline': 'Life Timeline',
      'tab_comparison': 'Comparison',
      'tab_stats': 'Statistics',
      'dob_label': 'Enter Your Birth Date',
      'calculate_btn': '✨ Calculate My Age ✨',
      'age_label': 'Enter Your Age',
      'years_label': 'Years',
      'months_label': 'Months',
      'days_label': 'Days',
      'age_format_label': 'Or enter directly in format "X years Y months Z days"',
      'age_input_placeholder': 'example: 19 years 2 months 13 days',
      'find_birth_btn': 'Find Birth Date',
      'age_result_prefix': 'Your Age:',
      'age_result_or': 'Or approximately:',
      'countdown_prefix': 'Countdown to Your Next Birthday:',
      'happy_birthday': 'Happy birthday!',
      'birth_date_prefix': 'Based on the age of',
      'birth_date_suffix': 'you were born on:',
      'years_text': 'years',
      'months_text': 'months',
      'days_text': 'days',
      'weeks_text': 'weeks',
      'hours_text': 'hours',
      'minutes_text': 'minutes',
      'seconds_text': 'seconds',
      'error_no_dob': 'Please enter your birth date.',
      'error_future_date': 'Birth date cannot be in the future.',
      'error_no_age': 'Please enter your age.',
      'and_text': 'and',
      'age_details': "Age Details",
      'zodiac': "Zodiac",
      'birthday_day': "Birth Day",
      'share': "Share",
      'export': "Export PDF",
      'additional_formats': 'Additional Formats',
      'quarters_text': 'quarters',
      'decades_text': 'decades',
      'no_history': 'No calculation history',
      'history_title': 'Calculation History',
      'delete_history': 'Delete',
      'clear_all_history': 'Clear All',
      'error_loading_history': 'Failed to load history',
      'no_horoscope': "Sorry, horoscope is not available at the moment.",
      'fun_facts_title': 'Fun Facts',
      'achievements_title': 'Life Achievements',
      'timeline_title': 'Your Life Timeline',
      'timeline_subtitle': 'Explore important milestones in your life journey',
      'comparison_title': 'Age Comparison',
      'comparison_subtitle': 'Compare your age with famous personalities and celebrities',
      'stats_title': 'Life Statistics',
      'stats_subtitle': 'Deep analysis of your life journey',
      'detailed_stats': 'Detailed Statistics',
      'heartbeats': 'Heartbeats',
      'breaths': 'Breaths',
      'sleep_hours': 'Sleep Hours',
      'meals': 'Meals',
      'horoscope_title': 'Daily Horoscope',
      'share_results': 'Share Your Results',
      'facebook': 'Facebook',
      'twitter': 'Twitter',
      'whatsapp': 'WhatsApp',
      'export_pdf': 'Export PDF',
      'download_image': 'Download Image',
      'birth_finder_title': 'Enter Your Age',
      'birth_finder_subtitle': 'Find birth date based on age',
      'main_age_text': 'Years of Experience',
      'life_progress': 'Life Progress',
      'age_breakdown': 'Age Breakdown',
      'lived_years': 'Years Lived',
      'future_years': 'Future',
      'quick_today': 'Today',
      'quick_yesterday': 'Yesterday',
      'milestone_first_steps': 'First Steps',
      'milestone_school': 'Started School',
      'milestone_decade': 'One Decade',
      'milestone_adult': 'Legal Adult',
      'milestone_twenties': 'Twenties Era',
      'milestone_quarter': 'Quarter Century',
      'milestone_thirty': 'Thirty Years Wise',
      'milestone_fourty': 'Life Begins',
      'milestone_half': 'Half Century'
    }
  };
  
  // Fungsi untuk menetapkan bahasa saat ini
  function setLanguage(lang) {
    // Simpan bahasa saat ini ke localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Dapatkan semua elemen dengan atribut data-lang
    const elements = document.querySelectorAll('[data-lang]');
    
    // Atur teks untuk setiap elemen berdasarkan kunci lokasinya
    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
    
    // Atur placeholder untuk input yang memiliki atribut data-lang-placeholder
    const placeholderElements = document.querySelectorAll('[data-lang-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-lang-placeholder');
      if (translations[lang] && translations[lang][key]) {
        element.placeholder = translations[lang][key];
      }
    });
    
    // Update dynamic content
    updateDynamicTranslations(lang);
    
    // Setel atribut lang pada elemen HTML
    document.documentElement.lang = lang;
    
    // Update hasil perhitungan jika ada
    updateUITexts(lang);
  }
  
  // Fungsi untuk mengupdate konten dinamis
  function updateDynamicTranslations(lang) {
    // Update fun facts section if exists
    const funFactsTitle = document.querySelector('#funFacts').closest('.bg-white\\/90, .bg-gray-800\\/90')?.querySelector('h3');
    if (funFactsTitle) {
      funFactsTitle.innerHTML = `<i class="fas fa-lightbulb text-yellow-500 mr-3"></i> ${translations[lang]['fun_facts_title'] || 'Fun Facts'}`;
    }
    
    // Update achievements timeline title
    const achievementsTitle = document.querySelector('#achievementsTimeline').closest('.bg-white\\/90, .bg-gray-800\\/90')?.querySelector('h3');
    if (achievementsTitle) {
      achievementsTitle.innerHTML = `<i class="fas fa-trophy text-yellow-500 mr-3"></i> ${translations[lang]['achievements_title'] || 'Life Achievements'}`;
    }
    
    // Update horoscope title
    const horoscopeTitle = document.querySelector('#dailyHoroscope h3');
    if (horoscopeTitle) {
      horoscopeTitle.innerHTML = `<i class="fas fa-crystal-ball text-purple-500 mr-3"></i> ${translations[lang]['horoscope_title'] || 'Daily Horoscope'}`;
    }
    
    // Update share section title
    const shareTitle = document.querySelector('h3:has(i.fa-share-alt)');
    if (shareTitle) {
      shareTitle.innerHTML = `<i class="fas fa-share-alt text-blue-500 mr-2"></i> ${translations[lang]['share_results'] || 'Share Your Results'}`;
    }
    
    // Update main age text if result is showing
    const ageText = document.getElementById('ageText');
    if (ageText) {
      ageText.textContent = translations[lang]['main_age_text'] || 'Years of Experience';
    }
  }
  
  // Fungsi untuk mengupdate teks UI yang dihasilkan secara dinamis
  function updateUITexts(lang) {
    const resultEl = document.getElementById('result');
    const countdownEl = document.getElementById('countdown');
    const birthResultEl = document.getElementById('birthResult');
    
    // Update hasil perhitungan umur jika ada
    if (resultEl && resultEl.innerHTML.trim() !== '') {
      recalculateAge();
    }
    
    // Update hasil perhitungan tanggal lahir jika ada
    if (birthResultEl && birthResultEl.innerHTML.trim() !== '') {
      recalculateBirthDate();
    }
  }
  
  // Inisialisasi bahasa saat halaman dimuat
  document.addEventListener('DOMContentLoaded', () => {
    // Cek preferensi bahasa dari localStorage atau gunakan bahasa default 'id'
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'id';
    
    // Setel nilai dropdown pemilih bahasa
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
      languageSelector.value = savedLanguage;
    }
    
    // Terapkan bahasa yang dipilih
    setLanguage(savedLanguage);
    
    // Tambahkan event listener untuk dropdown pemilih bahasa
    if (languageSelector) {
      languageSelector.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    }
  });