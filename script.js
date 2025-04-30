// Dark Mode Toggle with Animation and Local Storage
document.addEventListener('DOMContentLoaded', () => {
  // Set initial dark mode based on localStorage or system preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('darkMode');
  
  if (storedDarkMode === 'true' || (storedDarkMode === null && prefersDarkMode)) {
    document.documentElement.classList.add('dark');
  }
  
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', () => {
    // Add transition effect
    document.documentElement.classList.add('transition-colors');
    document.documentElement.classList.toggle('dark');
    
    // Store preference
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('transition-colors');
    }, 500);
  });
});

// Enhanced Tab Switching with Animation
const tabAge = document.getElementById('tabAge');
const tabBirth = document.getElementById('tabBirth');
const ageCalculator = document.getElementById('ageCalculator');
const birthCalculator = document.getElementById('birthCalculator');

// Function to switch tabs with animation
function switchTab(activeTab, inactiveTab, activeContent, inactiveContent) {
  // First, set up the tabs
  activeTab.classList.add('text-blue-600', 'dark:text-blue-400', 'bg-white', 'dark:bg-gray-800', 'border-b-2', 'border-blue-600', 'dark:border-blue-400', 'tab-active');
  activeTab.classList.remove('text-gray-600', 'dark:text-gray-400', 'bg-gray-100', 'dark:bg-gray-700');
  
  inactiveTab.classList.add('text-gray-600', 'dark:text-gray-400', 'bg-gray-100', 'dark:bg-gray-700');
  inactiveTab.classList.remove('text-blue-600', 'dark:text-blue-400', 'bg-white', 'dark:bg-gray-800', 'border-b-2', 'border-blue-600', 'dark:border-blue-400', 'tab-active');
  
  // Fade out the current content
  inactiveContent.style.opacity = '1';
  inactiveContent.style.transition = 'opacity 0.3s ease';
  inactiveContent.style.opacity = '0';
  
  // After fade out, hide current and show new content
  setTimeout(() => {
    inactiveContent.classList.add('hidden');
    activeContent.classList.remove('hidden');
    
    // Set initial opacity for fade in
    activeContent.style.opacity = '0';
    
    // Trigger reflow
    void activeContent.offsetWidth;
    
    // Fade in new content
    activeContent.style.transition = 'opacity 0.3s ease';
    activeContent.style.opacity = '1';
  }, 300);
  
  // Store active tab in localStorage
  localStorage.setItem('activeTab', activeTab.id);
}

// Tab click event listeners
tabAge.addEventListener('click', () => {
  switchTab(tabAge, tabBirth, ageCalculator, birthCalculator);
});

tabBirth.addEventListener('click', () => {
  switchTab(tabBirth, tabAge, birthCalculator, ageCalculator);
});

// Set active tab from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const activeTab = localStorage.getItem('activeTab');
  if (activeTab === 'tabBirth') {
    switchTab(tabBirth, tabAge, birthCalculator, ageCalculator);
  }
});

// KALKULATOR UMUR
let countdownInterval;

// Fungsi untuk mendapatkan teks berdasarkan bahasa aktif
function getText(key) {
  const currentLang = localStorage.getItem('preferredLanguage') || 'id';
  return translations[currentLang][key] || '';
}

function recalculateAge() {
  const dobInput = document.getElementById('dob').value;
  if (!dobInput) return;
  
  calculateAge(dobInput);
}

// Fungsi untuk mengambil ramalan zodiak harian
async function getDailyHoroscope() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbywRYYUjvLXuKA0Ad2CUJta3lRDA6RTtHMzWMmFY9jaPzqa9WdWgO9iROHQxi_L9qqK/exec');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    return null;
  }
}

// Fungsi untuk menampilkan ramalan zodiak harian
function displayDailyHoroscope(zodiacSign, horoscopeData) {
  const horoscopeEl = document.getElementById('dailyHoroscope');
  if (!horoscopeEl || !horoscopeData) return;

  const horoscopeText = horoscopeData[zodiacSign.toLowerCase()] || getText('no_horoscope');
  
  // Fungsi untuk membersihkan dan menggabungkan teks
  function cleanAndJoinText(text) {
    // Pisahkan berdasarkan baris baru
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    
    // Objek untuk menyimpan kategori dan kontennya
    const categories = {};
    let currentCategory = 'Umum';
    
    lines.forEach(line => {
      // Cek apakah ini adalah kategori baru
      if (line.endsWith(':')) {
        currentCategory = line;
        categories[currentCategory] = [];
      } else {
        // Jika categories[currentCategory] belum ada, buat array kosong
        if (!categories[currentCategory]) {
          categories[currentCategory] = [];
        }
        categories[currentCategory].push(line);
      }
    });

    // Gabungkan konten untuk setiap kategori
    return Object.entries(categories).map(([category, content]) => {
      const contentText = content.join(' ');
      if (category === 'Umum') {
        return `<p class="mb-3">${contentText}</p>`;
      }
      return `
        <div class="mb-3">
          <span class="font-semibold text-blue-600 dark:text-blue-400">${category}</span>
          <span class="ml-2">${contentText}</span>
        </div>
      `;
    }).join('');
  }

  const formattedContent = cleanAndJoinText(horoscopeText);

  horoscopeEl.innerHTML = `
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div class="flex items-center mb-4">
        <i class="fas fa-star text-yellow-500 mr-3"></i>
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-100">
          Ramalan Zodiak Hari Ini
        </h3>
      </div>
      <div class="text-gray-600 dark:text-gray-200">
        ${formattedContent}
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <i class="fas fa-calendar-day mr-2"></i>${horoscopeData.date}
        </p>
      </div>
    </div>
  `;
}

// Update fungsi calculateAge untuk menambahkan ramalan zodiak
async function calculateAge(dobInput) {
  // Clear previous countdown interval if exists
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  const resultEl = document.getElementById('result');
  const countdownEl = document.getElementById('countdown');

  if (!dobInput) {
    resultEl.textContent = getText('error_no_dob');
    countdownEl.textContent = '';
    return;
  }

  const birthDate = new Date(dobInput);
  const now = new Date();

  if (birthDate > now) {
    resultEl.textContent = getText('error_future_date');
    countdownEl.textContent = '';
    return;
  }

  // Calculate age details
  const ageDetails = calculateAgeDetails(birthDate);
  
  // Get zodiac and birthday info
  const zodiacSign = getZodiac(birthDate.getMonth() + 1, birthDate.getDate());
  const birthdayDay = getBirthdayDay(birthDate);
  
  // Get daily horoscope
  const horoscopeData = await getDailyHoroscope();
  if (horoscopeData) {
    displayDailyHoroscope(zodiacSign, horoscopeData);
  }
  
  // Create result text for history
  const resultText = `${ageDetails.years} tahun, ${ageDetails.months % 12} bulan, dan ${ageDetails.days % 30} hari`;
  
  // Show result sections
  resultEl.classList.remove('hidden');
  countdownEl.classList.remove('hidden');
  
  // Update displays
  updateResultDisplay(ageDetails, zodiacSign, birthdayDay);
  updateCountdown(birthDate);
  
  // Save to history
  saveToHistory(dobInput, resultText);
}

// Function to update the result display
function updateResultDisplay(ageDetails, zodiacSign, birthdayDay) {
  const resultEl = document.getElementById('result');
  if (!resultEl) return;

  // Update main age result
  const mainResult = resultEl.querySelector('.text-lg');
  if (mainResult) {
    mainResult.textContent = `${ageDetails.years} tahun, ${ageDetails.months % 12} bulan, dan ${ageDetails.days % 30} hari.`;
  }

  // Update age details
  const ageDetailsEl = document.getElementById('ageDetails');
  if (ageDetailsEl) {
    ageDetailsEl.innerHTML = `
      <div class="text-gray-600 dark:text-gray-200">
        <p>${ageDetails.weeks} minggu</p>
        <p>${ageDetails.hours} jam</p>
        <p>${ageDetails.minutes} menit</p>
        <p>${ageDetails.seconds} detik</p>
      </div>
    `;
  }

  // Update zodiac info
  const zodiacEl = document.getElementById('zodiacInfo');
  if (zodiacEl) {
    zodiacEl.innerHTML = `
      <div class="text-gray-600 dark:text-gray-200">
        <p class="text-xl font-semibold">${zodiacSign}</p>
      </div>
    `;
  }

  // Update birthday day
  const birthdayEl = document.getElementById('birthdayDay');
  if (birthdayEl) {
    birthdayEl.innerHTML = `
      <div class="text-gray-600 dark:text-gray-200">
        <p class="text-xl font-semibold">${birthdayDay}</p>
      </div>
    `;
  }

  // Update additional formats
  const additionalFormatsEl = document.getElementById('additionalFormats');
  if (additionalFormatsEl) {
    additionalFormatsEl.innerHTML = `
      <div class="text-gray-600 dark:text-gray-200">
        <p>${ageDetails.quarters} kuartal, ${ageDetails.decades} dekade</p>
      </div>
    `;
  }
}

// Function to update the countdown
function updateCountdown(birthDate) {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  let nextBirthday = new Date(new Date().getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (new Date() > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  function updateTimer() {
    const now = new Date();
    const diff = nextBirthday - now;

    if (diff <= 0) {
      countdownEl.textContent = getText('happy_birthday');
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
      <p>${getText('countdown_prefix')}</p>
      <p class="mt-2">${days} ${getText('days_text')}, ${hours} ${getText('hours_text')}, ${minutes} ${getText('minutes_text')}, ${seconds} ${getText('seconds_text')}.</p>
    `;
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

document.getElementById('calculateBtn').addEventListener('click', function () {
  const dobInput = document.getElementById('dob').value;
  calculateAge(dobInput);
});

// KALKULATOR TANGGAL LAHIR
function recalculateBirthDate() {
  const yearsInput = document.getElementById('years').value;
  const monthsInput = document.getElementById('months').value;
  const daysInput = document.getElementById('days').value;
  const ageInput = document.getElementById('ageInput').value;
  
  if ((yearsInput || monthsInput || daysInput) || ageInput.trim() !== '') {
    findBirthDate(yearsInput, monthsInput, daysInput, ageInput);
  }
}

function findBirthDate(yearsInput, monthsInput, daysInput, ageInput) {
  const birthResult = document.getElementById('birthResult');
  
  let years = 0, months = 0, days = 0;
  
  // Cek apakah menggunakan input teks atau input numerik
  if (ageInput.trim() !== '') {
    // Parsing string input berdasarkan bahasa
    const currentLang = localStorage.getItem('preferredLanguage') || 'id';
    const yearsText = translations[currentLang]['years_text'];
    const monthsText = translations[currentLang]['months_text'];
    const daysText = translations[currentLang]['days_text'];
    
    // Buat regex dinamis berdasarkan teks bahasa
    const yearPattern = `(\\d+)\\s*${yearsText}`;
    const monthPattern = `(\\d+)\\s*${monthsText}`;
    const dayPattern = `(\\d+)\\s*${daysText}`;
    
    // Ekstrak angka tahun
    const yearMatch = new RegExp(yearPattern).exec(ageInput);
    if (yearMatch) years = parseInt(yearMatch[1]);
    
    // Ekstrak angka bulan
    const monthMatch = new RegExp(monthPattern).exec(ageInput);
    if (monthMatch) months = parseInt(monthMatch[1]);
    
    // Ekstrak angka hari
    const dayMatch = new RegExp(dayPattern).exec(ageInput);
    if (dayMatch) days = parseInt(dayMatch[1]);
  } else {
    // Menggunakan input numerik
    years = yearsInput ? parseInt(yearsInput) : 0;
    months = monthsInput ? parseInt(monthsInput) : 0;
    days = daysInput ? parseInt(daysInput) : 0;
  }
  
  if (years === 0 && months === 0 && days === 0) {
    birthResult.textContent = getText('error_no_age');
    return;
  }
  
  // Hitung tanggal lahir berdasarkan umur
  const now = new Date();
  let birthYear = now.getFullYear() - years;
  let birthMonth = now.getMonth() - months;
  let birthDay = now.getDate() - days;
  
  // Sesuaikan jika ada nilai negatif
  while (birthDay < 1) {
    birthMonth--;
    const tempDate = new Date(birthYear, birthMonth + 1, 0);
    birthDay += tempDate.getDate();
  }
  
  while (birthMonth < 0) {
    birthYear--;
    birthMonth += 12;
  }
  
  // Format tanggal lahir berdasarkan bahasa
  const birthDate = new Date(birthYear, birthMonth, birthDay);
  const currentLang = localStorage.getItem('preferredLanguage') || 'id';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = birthDate.toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US', options);
  
  const yearsText = getText('years_text');
  const monthsText = getText('months_text');
  const daysText = getText('days_text');
  
  birthResult.innerHTML = `
    <p>${getText('birth_date_prefix')} ${years} ${yearsText}, ${months} ${monthsText}, ${days} ${daysText}, ${getText('birth_date_suffix')}</p>
    <p class="mt-3 text-blue-600 dark:text-blue-400">${formattedDate}</p>
  `;
  
  // Atur nilai input tanggal di tab pertama untuk memungkinkan pengecekan cepat
  const formattedDateValue = birthDate.toISOString().split('T')[0];
  document.getElementById('dob').value = formattedDateValue;
}

document.getElementById('findBirthBtn').addEventListener('click', function() {
  const yearsInput = document.getElementById('years').value;
  const monthsInput = document.getElementById('months').value;
  const daysInput = document.getElementById('days').value;
  const ageInput = document.getElementById('ageInput').value;
  
  findBirthDate(yearsInput, monthsInput, daysInput, ageInput);
});

// Event listener untuk input teks umur
document.getElementById('ageInput').addEventListener('input', function() {
  if (this.value.trim() !== '') {
    // Nonaktifkan input numerik jika input teks diisi
    document.getElementById('years').disabled = true;
    document.getElementById('months').disabled = true;
    document.getElementById('days').disabled = true;
  } else {
    // Aktifkan kembali input numerik jika input teks kosong
    document.getElementById('years').disabled = false;
    document.getElementById('months').disabled = false;
    document.getElementById('days').disabled = false;
  }
});

// Event listener untuk input numerik
const numericInputs = ['years', 'months', 'days'];
numericInputs.forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    if (document.getElementById('years').value !== '' || 
        document.getElementById('months').value !== '' || 
        document.getElementById('days').value !== '') {
      // Nonaktifkan input teks jika salah satu input numerik diisi
      document.getElementById('ageInput').disabled = true;
    } else {
      // Aktifkan kembali input teks jika semua input numerik kosong
      document.getElementById('ageInput').disabled = false;
    }
  });
});

// Cek dan setel preferensi dark mode dari localStorage
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  }
  
  // Simpan preferensi dark mode saat tombol diklik
  darkModeToggle.addEventListener('click', () => {
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
  });
});

// Function to get zodiac sign
function getZodiac(month, day) {
  const zodiacSigns = [
    { name: 'Capricorn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { name: 'Aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: 'Pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { name: 'Aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: 'Taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: 'Gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { name: 'Cancer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { name: 'Leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: 'Virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { name: 'Scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { name: 'Sagittarius', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 }
  ];

  for (const sign of zodiacSigns) {
    if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay) ||
      (sign.startMonth === 12 && month === 1 && day <= sign.endDay) ||
      (sign.endMonth === 1 && month === 12 && day >= sign.startDay)
    ) {
      return sign.name;
    }
  }
  return 'Unknown';
}

// Function to get birthday day
function getBirthdayDay(birthDate) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return days[birthDate.getDay()];
}

// Function to calculate age in different formats
function calculateAgeDetails(birthDate) {
  const now = new Date();
  const diffMs = now - birthDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  const years = Math.floor(diffDays / 365.25);
  const months = Math.floor(diffDays / 30.44);
  const weeks = Math.floor(diffDays / 7);
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor(diffMs / (1000 * 60));
  const seconds = Math.floor(diffMs / 1000);
  const quarters = Math.floor(months / 3);
  const decades = Math.floor(years / 10);
  
  return {
    years,
    months,
    days: diffDays,
    weeks,
    hours,
    minutes,
    seconds,
    quarters,
    decades
  };
}

// Function to export results to PDF
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const text = getFormattedResultText();
  const lines = doc.splitTextToSize(text, 180);
  
  doc.setFont("helvetica");
  doc.setFontSize(16);
  doc.text("Hasil Perhitungan Umur", 105, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.text(lines, 15, 40);
  
  doc.save("Hasil_Perhitungan_Umur.pdf");
}

// Function to share results
function shareResult() {
  const resultEl = document.getElementById('result');
  const countdownEl = document.getElementById('countdown');
  
  const shareText = `${resultEl.innerText}\n\n${countdownEl.innerText}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Hasil Perhitungan Umur',
      text: shareText,
      url: window.location.href
    }).catch(console.error);
  } else {
    // Fallback for browsers that don't support Web Share API
    const textArea = document.createElement('textarea');
    textArea.value = shareText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Hasil telah disalin ke clipboard!');
  }
}

// Add event listeners for share and export buttons
document.getElementById('shareBtn').addEventListener('click', shareResult);
document.getElementById('exportBtn').addEventListener('click', exportToPDF);

// Theme configuration
const themes = {
  default: {
    primary: 'blue',
    secondary: 'gray',
    accent: 'green'
  },
  ocean: {
    primary: 'cyan',
    secondary: 'blue',
    accent: 'teal'
  },
  forest: {
    primary: 'green',
    secondary: 'emerald',
    accent: 'lime'
  },
  sunset: {
    primary: 'orange',
    secondary: 'red',
    accent: 'yellow'
  },
  lavender: {
    primary: 'purple',
    secondary: 'violet',
    accent: 'indigo'
  }
};

// Function to apply theme
function applyTheme(themeName) {
  const theme = themes[themeName] || themes.default;
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('preferredTheme', themeName);
}

// Function to save calculation history
function saveToHistory(birthDate, result) {
  try {
    const history = JSON.parse(localStorage.getItem('calculationHistory') || '[]');
    const calculation = {
      id: Date.now(),
      date: new Date().toISOString(),
      birthDate: birthDate,
      result: result
    };
    
    // Add to beginning of array
    history.unshift(calculation);
    
    // Keep only last 10 calculations
    if (history.length > 10) {
      history.pop();
    }
    
    localStorage.setItem('calculationHistory', JSON.stringify(history));
    updateHistoryDisplay();
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}

// Function to display calculation history
function updateHistoryDisplay() {
  const historyEl = document.getElementById('calculationHistory');
  if (!historyEl) {
    console.error('History element not found');
    return;
  }

  try {
    const history = JSON.parse(localStorage.getItem('calculationHistory') || '[]');
    
    if (history.length === 0) {
      historyEl.innerHTML = `
        <div class="text-center text-gray-500 dark:text-gray-400 py-4">
          Belum ada riwayat perhitungan
        </div>
      `;
      return;
    }
    
    const historyHTML = history.map(calc => `
      <div class="bg-white dark:bg-gray-700 p-4 rounded-lg mb-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-800 dark:text-white">${calc.result}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              ${new Date(calc.date).toLocaleDateString()}
            </p>
          </div>
          <button onclick="deleteHistoryItem(${calc.id})" 
                  class="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-2">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
    
    historyEl.innerHTML = historyHTML;
  } catch (error) {
    console.error('Error updating history display:', error);
    historyEl.innerHTML = `
      <div class="text-center text-red-500 dark:text-red-400 py-4">
        Error loading history
      </div>
    `;
  }
}

// Function to delete history item
function deleteHistoryItem(id) {
  try {
    const history = JSON.parse(localStorage.getItem('calculationHistory') || '[]');
    const newHistory = history.filter(item => item.id !== id);
    localStorage.setItem('calculationHistory', JSON.stringify(newHistory));
    updateHistoryDisplay();
  } catch (error) {
    console.error('Error deleting history item:', error);
  }
}

// Function to clear all history
function clearAllHistory() {
  if (confirm('Apakah Anda yakin ingin menghapus semua riwayat perhitungan?')) {
    try {
      localStorage.removeItem('calculationHistory');
      updateHistoryDisplay();
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }
}

// Make functions globally available
window.deleteHistoryItem = deleteHistoryItem;
window.clearAllHistory = clearAllHistory;

// Initialize history display when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  updateHistoryDisplay();
});

// Function to update age statistics visualization
function updateAgeStatistics(age) {
  const ctx = document.getElementById('ageChart');
  if (!ctx) {
    console.error('Chart canvas element not found');
    return;
  }

  // Data statistik umur populasi Indonesia (contoh data)
  const ageRanges = [
    '0-14', '15-24', '25-34', '35-44', '45-54', '55-64', '65+'
  ];
  
  const populationPercentages = [
    25.87, 16.76, 17.03, 15.45, 12.35, 7.54, 5.0
  ];
  
  // Tentukan range umur pengguna
  const userAgeRange = ageRanges[ageRanges.findIndex((_, index) => {
    const rangeStart = parseInt(ageRanges[index].split('-')[0]);
    const rangeEnd = ageRanges[index].includes('+') ? 
      Infinity : 
      parseInt(ageRanges[index].split('-')[1]);
    return age >= rangeStart && age <= rangeEnd;
  })];

  // Update chart data
  if (window.ageChart) {
    window.ageChart.data.labels = ageRanges;
    window.ageChart.data.datasets[0] = {
      label: 'Persentase Populasi',
      data: populationPercentages,
      backgroundColor: ageRanges.map(range => 
        range === userAgeRange ? 'rgba(59, 130, 246, 0.8)' : 'rgba(209, 213, 219, 0.5)'
      ),
      borderColor: ageRanges.map(range => 
        range === userAgeRange ? 'rgb(29, 78, 216)' : 'rgb(156, 163, 175)'
      ),
      borderWidth: 1,
      borderRadius: 4,
    };

    window.ageChart.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y.toFixed(1)}% dari populasi`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 30,
          grid: {
            color: document.documentElement.classList.contains('dark') ? 
              'rgba(255, 255, 255, 0.1)' : 
              'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: document.documentElement.classList.contains('dark') ? 
              'rgba(255, 255, 255, 0.8)' : 
              'rgba(0, 0, 0, 0.8)',
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: document.documentElement.classList.contains('dark') ? 
              'rgba(255, 255, 255, 0.8)' : 
              'rgba(0, 0, 0, 0.8)'
          }
        }
      }
    };
    
    window.ageChart.update('none'); // Use 'none' for immediate update
  }
  
  // Update statistik teks
  const statsDiv = document.getElementById('populationStats');
  if (statsDiv) {
    const userRangePercentage = populationPercentages[ageRanges.indexOf(userAgeRange)];
    statsDiv.innerHTML = `
      <p>Anda berada dalam kelompok usia ${userAgeRange} tahun</p>
      <p class="mt-2">${userRangePercentage.toFixed(1)}% populasi berada dalam kelompok usia yang sama dengan Anda</p>
    `;
  }
}

// Social sharing functions
function shareToFacebook() {
  const text = encodeURIComponent(getFormattedResultText());
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareToTwitter() {
  const text = encodeURIComponent(getFormattedResultText());
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
}

function shareToWhatsApp() {
  const text = encodeURIComponent(getFormattedResultText());
  window.open(`https://wa.me/?text=${text}`, '_blank');
}