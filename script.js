// Enhanced Interactive Age Calculator with Modern Features
// Dark Mode Toggle with Animation and Local Storage
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initializeDarkMode();
  initializeTabSystem();
  initializeQuickDatePresets();
  initializeBirthdayAnimations();
  initializeFunFacts();
  
  // Set initial dark mode based on localStorage or system preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('darkMode');
  
  if (storedDarkMode === 'true' || (storedDarkMode === null && prefersDarkMode)) {
    document.documentElement.classList.add('dark');
  }

  // Event Listeners untuk form
  const calculateBtn = document.getElementById('calculateBtn');
  const dobInput = document.getElementById('dob');
  
  if (calculateBtn && dobInput) {
    calculateBtn.addEventListener('click', () => {
      const dobValue = dobInput.value;
      if (dobValue) {
        calculateAge(dobValue);
      } else {
        alert('Silakan masukkan tanggal lahir terlebih dahulu!');
      }
    });
    
    // Auto calculate when date changes
    dobInput.addEventListener('change', () => {
      if (dobInput.value) {
        calculateAge(dobInput.value);
      }
    });
  }
  
  // Birth calculator
  const findBirthBtn = document.getElementById('findBirthBtn');
  if (findBirthBtn) {
    findBirthBtn.addEventListener('click', () => {
      const years = parseInt(document.getElementById('years').value) || 0;
      const months = parseInt(document.getElementById('months').value) || 0;
      const days = parseInt(document.getElementById('days').value) || 0;
      const ageInput = document.getElementById('ageInput').value;
      
      findBirthDate(years, months, days, ageInput);
    });
  }
  
  // Theme selector
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      applyTheme(e.target.value);
    });
  }
  
  // Language selector
  const languageSelector = document.getElementById('languageSelector');
  if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
      changeLanguage(e.target.value);
    });
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  if (savedTheme !== 'default' && themeSelector) {
    themeSelector.value = savedTheme;
    applyTheme(savedTheme);
  }
  
  // Load saved language
  const savedLang = localStorage.getItem('preferredLanguage') || 'id';
  if (languageSelector) {
    languageSelector.value = savedLang;
  }
  
  // Update history display
  updateHistoryDisplay();
  
  // Initialize GSAP animations if available
  if (typeof gsap !== 'undefined') {
    // Animate page load
    gsap.fromTo('header', 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    
    gsap.fromTo('nav', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
    );
  }
});

// Variables for intervals
let countdownInterval;

// Missing functions needed by localization.js
window.recalculateAge = function() {
  const dobInput = document.getElementById('dob');
  if (dobInput && dobInput.value) {
    calculateAge(dobInput.value);
  }
};

window.recalculateBirthDate = function() {
  const years = parseInt(document.getElementById('years').value) || 0;
  const months = parseInt(document.getElementById('months').value) || 0;
  const days = parseInt(document.getElementById('days').value) || 0;
  const ageInput = document.getElementById('ageInput').value;
  
  findBirthDate(years, months, days, ageInput);
};

// Initialize Dark Mode functionality
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (!darkModeToggle) return;
  
  darkModeToggle.addEventListener('click', () => {
    // Add transition effect
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.documentElement.classList.toggle('dark');
    
    // Store preference
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    
    // Remove transition style after animation completes
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
    
    // Update particle colors for dark mode
    updateParticleColors();
  });
}

// Enhanced Tab System
function initializeTabSystem() {
  const tabs = {
    age: { button: document.getElementById('tabAge'), panel: document.getElementById('ageCalculator') },
    birth: { button: document.getElementById('tabBirth'), panel: document.getElementById('birthCalculator') },
    timeline: { button: document.getElementById('tabTimeline'), panel: document.getElementById('timelineCalculator') },
    comparison: { button: document.getElementById('tabComparison'), panel: document.getElementById('comparisonCalculator') },
    stats: { button: document.getElementById('tabStats'), panel: document.getElementById('statsCalculator') }
  };

  // Add click listeners to all tabs
  Object.keys(tabs).forEach(tabKey => {
    tabs[tabKey].button.addEventListener('click', () => switchToTab(tabKey, tabs));
  });

  // Set active tab from localStorage on page load
  const activeTab = localStorage.getItem('activeTab') || 'age';
  switchToTab(activeTab, tabs);
}

// Switch tabs with smooth animation
function switchToTab(activeTabKey, tabs) {
  Object.keys(tabs).forEach(tabKey => {
    const { button, panel } = tabs[tabKey];
    
    if (tabKey === activeTabKey) {
      // Activate tab
      button.classList.add('text-purple-600', 'dark:text-purple-400', 'bg-gradient-to-r', 'from-purple-50', 'to-pink-50', 'dark:from-purple-900/50', 'dark:to-pink-900/50', 'border-b-4', 'border-purple-500', 'tab-active');
      button.classList.remove('text-gray-600', 'dark:text-gray-400');
      
      // Show panel with animation
      panel.classList.remove('hidden');
      panel.classList.add('active');
      
      // Trigger animations for the active panel
      gsap.fromTo(panel, 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    } else {
      // Deactivate tab
      button.classList.remove('text-purple-600', 'dark:text-purple-400', 'bg-gradient-to-r', 'from-purple-50', 'to-pink-50', 'dark:from-purple-900/50', 'dark:to-pink-900/50', 'border-b-4', 'border-purple-500', 'tab-active');
      button.classList.add('text-gray-600', 'dark:text-gray-400');
      
      // Hide panel
      panel.classList.add('hidden');
      panel.classList.remove('active');
    }
  });
  
  // Store active tab
  localStorage.setItem('activeTab', activeTabKey);
  
  // Load content for specific tabs
  if (activeTabKey === 'timeline') loadTimelineContent();
  if (activeTabKey === 'comparison') loadComparisonContent();
  if (activeTabKey === 'stats') loadStatsContent();
}

// Quick date presets
function initializeQuickDatePresets() {
  window.setQuickDate = function(type) {
    const dobInput = document.getElementById('dob');
    const today = new Date();
    
    if (type === 'today') {
      dobInput.value = today.toISOString().split('T')[0];
    } else if (type === 'yesterday') {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      dobInput.value = yesterday.toISOString().split('T')[0];
    }
    
    // Trigger calculation
    calculateAge(dobInput.value);
  };
}

// Fun Facts rotation
function initializeFunFacts() {
  const funFacts = [
    "💫 Jantung manusia berdetak sekitar 2.5 miliar kali dalam hidupnya!",
    "🌍 Bumi mengelilingi matahari dengan kecepatan 107,000 km/jam!",
    "🧠 Otak manusia memiliki sekitar 86 miliar neuron!",
    "⚡ Tubuh manusia menghasilkan listrik sekitar 100 watt!",
    "🌟 Anda terbuat dari elemen yang berasal dari bintang!",
    "🔬 DNA Anda 99.9% sama dengan semua manusia lainnya!",
    "🌙 Anda bergerak melalui ruang angkasa dengan kecepatan 220 km/detik!",
    "💧 Tubuh manusia dewasa terdiri dari 60% air!",
    "🦴 Anda lahir dengan 270 tulang, tapi dewasa hanya memiliki 206!",
    "👁️ Mata manusia dapat membedakan 10 juta warna berbeda!"
  ];
  
  let factIndex = 0;
  const factContainer = document.getElementById('funFacts');
  
  function rotateFacts() {
    const facts = factContainer.children;
    if (facts.length > 0) {
      // Update facts with animation
      gsap.to(facts, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.1,
        onComplete: () => {
          for (let i = 0; i < facts.length; i++) {
            facts[i].innerHTML = `<p class="text-gray-700 dark:text-gray-200">${funFacts[(factIndex + i) % funFacts.length]}</p>`;
          }
          gsap.to(facts, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1
          });
        }
      });
      
      factIndex = (factIndex + 3) % funFacts.length;
    }
  }
  
  // Rotate facts every 10 seconds
  setInterval(rotateFacts, 10000);
}

// Birthday animations
function initializeBirthdayAnimations() {
  window.triggerBirthdayAnimation = function() {
    const overlay = document.getElementById('birthdayOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    
    // Add confetti effect
    createConfetti();
    
    // Play celebration sound (if available)
    playSound('celebration');
  };
  
  window.closeBirthdayAnimation = function() {
    const overlay = document.getElementById('birthdayOverlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
  };
}

// Create confetti effect
function createConfetti() {
  const colors = ['#ff6b6b', '#ffa726', '#ffeb3b', '#66bb6a', '#42a5f5', '#5c6bc0', '#ab47bc'];
  const confettiCount = 100;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '1000';
    confetti.style.borderRadius = '50%';
    document.body.appendChild(confetti);
    
    // Animate confetti falling
    gsap.to(confetti, {
      y: window.innerHeight + 100,
      rotation: 360 * 3,
      duration: Math.random() * 3 + 2,
      ease: "power2.in",
      onComplete: () => {
        confetti.remove();
      }
    });
  }
}

// Update particle colors for theme changes
function updateParticleColors() {
  if (window.pJSDom && window.pJSDom[0]) {
    const isDark = document.documentElement.classList.contains('dark');
    const colors = isDark 
      ? ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981']
      : ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];
    
    window.pJSDom[0].pJS.particles.color.value = colors;
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
}

// Enhanced calculate age function with new visualizations
// ... existing code ...

async function calculateAge(dobInput) {
  // Clear previous countdown interval if exists
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  const resultEl = document.getElementById('result');
  
  if (!dobInput) {
    resultEl.classList.add('hidden');
    return;
  }

  const birthDate = new Date(dobInput);
  const now = new Date();

  if (birthDate > now) {
    alert('Tanggal lahir tidak boleh di masa depan!');
    return;
  }

  // Calculate age details
  const ageDetails = calculateAgeDetails(birthDate);
  const zodiacSign = getZodiac(birthDate.getMonth() + 1, birthDate.getDate());
  
  // Show results with animation
  resultEl.classList.remove('hidden');
  
  // Update main age display
  updateMainAgeDisplay(ageDetails);
  
  // Update detail cards
  updateAgeDetailsCard(ageDetails);
  updateZodiacCard(zodiacSign, birthDate);
  updateCountdownCard(birthDate);
  
  // Update personal statistics
  updatePersonalStats(ageDetails);
  
  // Create visualizations
  createLifeChart(ageDetails);
  createAgeBreakdownChart(ageDetails);
  
  // Generate achievements timeline
  generateAchievementsTimeline(ageDetails);
  
  // Show floating cake if it's birthday
  checkBirthdayAndShowCake(birthDate);
  
  // Get daily horoscope
  const horoscopeData = await getDailyHoroscope();
  if (horoscopeData) {
    displayDailyHoroscope(zodiacSign, horoscopeData);
  }
  
  // Save to history
  saveToHistory(birthDate, ageDetails);
  
  // Animate result appearance
  gsap.fromTo(resultEl.children, 
    { opacity: 0, y: 50, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
  );
}

// Update main age display
function updateMainAgeDisplay(ageDetails) {
  document.getElementById('mainAge').textContent = ageDetails.years;
  document.getElementById('ageText').textContent = `Tahun Penuh Pengalaman`;
  document.getElementById('detailedAge').textContent = 
    `${ageDetails.totalDays.toLocaleString()} hari | ${ageDetails.totalHours.toLocaleString()} jam | ${ageDetails.totalMinutes.toLocaleString()} menit`;
}

// Update age details card
function updateAgeDetailsCard(ageDetails) {
  const container = document.getElementById('ageDetails');
  container.innerHTML = `
    <div class="flex items-center justify-between">
      <span>📅 Tahun</span>
      <span class="font-bold">${ageDetails.years}</span>
    </div>
    <div class="flex items-center justify-between">
      <span>🗓️ Bulan</span>
      <span class="font-bold">${ageDetails.months}</span>
    </div>
    <div class="flex items-center justify-between">
      <span>📆 Hari</span>
      <span class="font-bold">${ageDetails.days}</span>
    </div>
    <div class="flex items-center justify-between">
      <span>🕐 Total Hari</span>
      <span class="font-bold">${ageDetails.totalDays.toLocaleString()}</span>
    </div>
    <div class="flex items-center justify-between">
      <span>⏰ Total Jam</span>
      <span class="font-bold">${ageDetails.totalHours.toLocaleString()}</span>
    </div>
    <div class="flex items-center justify-between">
      <span>⏱️ Total Menit</span>
      <span class="font-bold">${ageDetails.totalMinutes.toLocaleString()}</span>
    </div>
  `;
}

// Update zodiac card
function updateZodiacCard(zodiacSign, birthDate) {
  const container = document.getElementById('zodiacInfo');
  const zodiacInfo = getZodiacInfo(zodiacSign);
  
  container.innerHTML = `
    <div class="text-4xl mb-3">${zodiacInfo.symbol}</div>
    <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${zodiacSign}</h4>
    <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">${zodiacInfo.dates}</p>
    <div class="space-y-2">
      <div class="text-sm"><strong>Element:</strong> ${zodiacInfo.element}</div>
      <div class="text-sm"><strong>Planet:</strong> ${zodiacInfo.planet}</div>
      <div class="text-sm"><strong>Sifat:</strong> ${zodiacInfo.traits}</div>
    </div>
  `;
}

// Update countdown card
function updateCountdownCard(birthDate) {
  const container = document.getElementById('countdown');
  
  function updateCountdown() {
    const now = new Date();
    const thisYear = now.getFullYear();
    let nextBirthday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate());
    
    // If birthday has passed this year, set to next year
    if (nextBirthday < now) {
      nextBirthday.setFullYear(thisYear + 1);
    }
    
    const diff = nextBirthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      container.innerHTML = `
        <div class="text-2xl font-bold text-pink-500 animate-bounce">
          🎉 Selamat Ulang Tahun! 🎉
        </div>
      `;
      triggerBirthdayAnimation();
    } else {
      container.innerHTML = `
        <div class="text-lg font-bold mb-2">Ulang Tahun Berikutnya</div>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div class="bg-pink-100 dark:bg-pink-900/30 p-2 rounded">
            <div class="text-2xl font-bold">${days}</div>
            <div>Hari</div>
          </div>
          <div class="bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
            <div class="text-2xl font-bold">${hours}</div>
            <div>Jam</div>
          </div>
        </div>
      `;
    }
  }
  
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Update personal statistics
function updatePersonalStats(ageDetails) {
  // Calculate estimates
  const heartbeats = Math.floor(ageDetails.totalMinutes * 70); // ~70 bpm average
  const breaths = Math.floor(ageDetails.totalMinutes * 16); // ~16 breaths per minute
  const sleepHours = Math.floor(ageDetails.totalHours * 0.33); // ~8 hours sleep per day
  const meals = Math.floor(ageDetails.totalDays * 3); // 3 meals per day
  
  document.getElementById('heartbeats').textContent = heartbeats.toLocaleString();
  document.getElementById('breaths').textContent = breaths.toLocaleString();
  document.getElementById('sleepHours').textContent = sleepHours.toLocaleString();
  document.getElementById('meals').textContent = meals.toLocaleString();
}

// Create life progress chart
function createLifeChart(ageDetails) {
  const ctx = document.getElementById('lifeChart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (window.lifeChartInstance) {
    window.lifeChartInstance.destroy();
  }
  
  const years = ageDetails.years;
  const expectedLifespan = 75; // Average lifespan
  const livedPercent = (years / expectedLifespan) * 100;
  
  window.lifeChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Telah Hidup', 'Masa Depan'],
      datasets: [{
        data: [livedPercent, 100 - livedPercent],
        backgroundColor: [
          'linear-gradient(135deg, #8b5cf6, #ec4899)',
          'rgba(156, 163, 175, 0.3)'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Perjalanan Hidup'
        }
      }
    }
  });
}

// Create age breakdown chart
function createAgeBreakdownChart(ageDetails) {
  const ctx = document.getElementById('ageBreakdownChart');
  if (!ctx) return;
  
  if (window.ageBreakdownChartInstance) {
    window.ageBreakdownChartInstance.destroy();
  }
  
  window.ageBreakdownChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Tahun', 'Bulan', 'Hari'],
      datasets: [{
        label: 'Umur Anda',
        data: [ageDetails.years, ageDetails.months, ageDetails.days],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(59, 130, 246, 0.8)'
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Breakdown Umur'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Generate achievements timeline
function generateAchievementsTimeline(ageDetails) {
  const container = document.getElementById('achievementsTimeline');
  const years = ageDetails.years;
  
  const milestones = [
    { age: 1, title: "Langkah Pertama", icon: "👶", achieved: years >= 1 },
    { age: 5, title: "Mulai Sekolah", icon: "🎒", achieved: years >= 5 },
    { age: 10, title: "Satu Dekade", icon: "🎂", achieved: years >= 10 },
    { age: 18, title: "Dewasa Secara Hukum", icon: "🗳️", achieved: years >= 18 },
    { age: 21, title: "Era Dua Puluhan", icon: "🍾", achieved: years >= 21 },
    { age: 25, title: "Seperempat Abad", icon: "🏆", achieved: years >= 25 },
    { age: 30, title: "Tiga Puluh Tahun Bijaksana", icon: "🧠", achieved: years >= 30 },
    { age: 40, title: "Kehidupan Dimulai", icon: "🌟", achieved: years >= 40 },
    { age: 50, title: "Setengah Abad", icon: "👑", achieved: years >= 50 }
  ];
  
  container.innerHTML = milestones.map(milestone => `
    <div class="flex items-center p-4 rounded-xl transition-all duration-300 ${
      milestone.achieved 
        ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-l-4 border-green-500' 
        : 'bg-gray-100 dark:bg-gray-700/50 border-l-4 border-gray-300'
    }">
      <div class="text-4xl mr-4">${milestone.icon}</div>
      <div class="flex-1">
        <h4 class="font-bold text-gray-800 dark:text-white">${milestone.title}</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300">Usia ${milestone.age} tahun</p>
      </div>
      <div class="text-2xl">
        ${milestone.achieved ? '✅' : '⏳'}
      </div>
    </div>
  `).join('');
}

// Check if it's birthday and show floating cake
function checkBirthdayAndShowCake(birthDate) {
  const today = new Date();
  const isToday = birthDate.getMonth() === today.getMonth() && 
                  birthDate.getDate() === today.getDate();
  
  const floatingCake = document.getElementById('floatingCake');
  if (isToday) {
    floatingCake.classList.remove('hidden');
    gsap.to(floatingCake, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: "none"
    });
  } else {
    floatingCake.classList.add('hidden');
  }
}

// Download result as image
window.downloadAsImage = function() {
  // Implementation for downloading result as image
  const resultElement = document.getElementById('result');
  
  html2canvas(resultElement).then(canvas => {
    const link = document.createElement('a');
    link.download = 'age-calculation-result.png';
    link.href = canvas.toDataURL();
    link.click();
  });
};

// Play sound effect
function playSound(type) {
  // Create audio context if available
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    const audioCtx = new (AudioContext || webkitAudioContext)();
    
    if (type === 'celebration') {
      // Create a simple celebration sound
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.5);
    }
  }
}

// Enhanced getZodiacInfo function
function getZodiacInfo(sign) {
  const zodiacData = {
    'Aries': { symbol: '♈', dates: '21 Mar - 19 Apr', element: 'Api', planet: 'Mars', traits: 'Berani, Enerjik' },
    'Taurus': { symbol: '♉', dates: '20 Apr - 20 Mei', element: 'Tanah', planet: 'Venus', traits: 'Stabil, Praktis' },
    'Gemini': { symbol: '♊', dates: '21 Mei - 20 Jun', element: 'Udara', planet: 'Merkurius', traits: 'Komunikatif, Adaptif' },
    'Cancer': { symbol: '♋', dates: '21 Jun - 22 Jul', element: 'Air', planet: 'Bulan', traits: 'Sensitif, Protektif' },
    'Leo': { symbol: '♌', dates: '23 Jul - 22 Agu', element: 'Api', planet: 'Matahari', traits: 'Percaya Diri, Kreatif' },
    'Virgo': { symbol: '♍', dates: '23 Agu - 22 Sep', element: 'Tanah', planet: 'Merkurius', traits: 'Analitis, Perfeksionis' },
    'Libra': { symbol: '♎', dates: '23 Sep - 22 Okt', element: 'Udara', planet: 'Venus', traits: 'Seimbang, Diplomatik' },
    'Scorpio': { symbol: '♏', dates: '23 Okt - 21 Nov', element: 'Air', planet: 'Mars/Pluto', traits: 'Intens, Misterius' },
    'Sagittarius': { symbol: '♐', dates: '22 Nov - 21 Des', element: 'Api', planet: 'Jupiter', traits: 'Petualang, Optimis' },
    'Capricorn': { symbol: '♑', dates: '22 Des - 19 Jan', element: 'Tanah', planet: 'Saturnus', traits: 'Ambisius, Disiplin' },
    'Aquarius': { symbol: '♒', dates: '20 Jan - 18 Feb', element: 'Udara', planet: 'Saturnus/Uranus', traits: 'Inovatif, Independen' },
    'Pisces': { symbol: '♓', dates: '19 Feb - 20 Mar', element: 'Air', planet: 'Jupiter/Neptunes', traits: 'Intuitif, Kreatif' }
  };
  
  return zodiacData[sign] || { symbol: '⭐', dates: '', element: '', planet: '', traits: '' };
}

// Load timeline content
function loadTimelineContent() {
  const container = document.getElementById('lifeTimeline');
  if (!container) return;
  
  // Sample timeline content
  container.innerHTML = `
    <div class="timeline-item">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ml-6">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Masa Kanak-kanak</h3>
        <p class="text-gray-600 dark:text-gray-300">0-12 tahun: Periode pembelajaran dan eksplorasi dunia</p>
      </div>
    </div>
    <div class="timeline-item">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ml-6">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Masa Remaja</h3>
        <p class="text-gray-600 dark:text-gray-300">13-18 tahun: Pembentukan identitas dan pertumbuhan fisik</p>
      </div>
    </div>
    <div class="timeline-item">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ml-6">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Dewasa Muda</h3>
        <p class="text-gray-600 dark:text-gray-300">19-30 tahun: Karir, pendidikan tinggi, dan kemandirian</p>
      </div>
    </div>
    <div class="timeline-item">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ml-6">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Dewasa</h3>
        <p class="text-gray-600 dark:text-gray-300">31-50 tahun: Puncak karir dan tanggung jawab keluarga</p>
      </div>
    </div>
  `;
}

// Load comparison content
function loadComparisonContent() {
  const container = document.getElementById('ageComparison');
  if (!container) return;
  
  const celebrities = [
    { name: "Albert Einstein", age: "76 tahun", field: "Fisikawan", image: "🧠" },
    { name: "Leonardo da Vinci", age: "67 tahun", field: "Seniman & Penemu", image: "🎨" },
    { name: "Marie Curie", age: "66 tahun", field: "Ilmuwan", image: "⚗️" },
    { name: "Mozart", age: "35 tahun", field: "Komponis", image: "🎵" },
    { name: "Steve Jobs", age: "56 tahun", field: "Entrepreneur", image: "💻" },
    { name: "Nelson Mandela", age: "95 tahun", field: "Pemimpin", image: "✊" }
  ];
  
  container.innerHTML = celebrities.map(celeb => `
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
      <div class="text-4xl text-center mb-3">${celeb.image}</div>
      <h3 class="text-lg font-bold text-gray-800 dark:text-white text-center mb-2">${celeb.name}</h3>
      <p class="text-gray-600 dark:text-gray-300 text-center text-sm mb-2">${celeb.field}</p>
      <p class="text-purple-600 dark:text-purple-400 text-center font-bold">${celeb.age}</p>
    </div>
  `).join('');
}

// Load stats content
function loadStatsContent() {
  const container = document.getElementById('detailedStats');
  if (!container) return;
  
  container.innerHTML = `
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Statistik Kehidupan</h3>
      <div class="space-y-3">
        <div class="flex justify-between">
          <span>📚 Estimasi kata yang dibaca</span>
          <span class="font-bold">50 juta</span>
        </div>
        <div class="flex justify-between">
          <span>👥 Orang yang ditemui</span>
          <span class="font-bold">10,000</span>
        </div>
        <div class="flex justify-between">
          <span>🚶 Langkah kaki</span>
          <span class="font-bold">150 juta</span>
        </div>
        <div class="flex justify-between">
          <span>😊 Hari bahagia</span>
          <span class="font-bold">70%</span>
        </div>
      </div>
    </div>
  `;
}

// Calculate detailed age information
function calculateAgeDetails(birthDate) {
  const now = new Date();
  const birth = new Date(birthDate);
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Calculate total time units
  const totalMilliseconds = now - birth;
  const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
  const totalMinutes = Math.floor(totalMilliseconds / (1000 * 60));
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  
  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    totalMilliseconds
  };
}

// Get zodiac sign based on birth month and day
function getZodiac(month, day) {
  const zodiacSigns = [
    { sign: 'Capricorn', start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
    { sign: 'Aquarius', start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
    { sign: 'Pisces', start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
    { sign: 'Aries', start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
    { sign: 'Taurus', start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
    { sign: 'Gemini', start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
    { sign: 'Cancer', start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
    { sign: 'Leo', start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
    { sign: 'Virgo', start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
    { sign: 'Libra', start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
    { sign: 'Scorpio', start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
    { sign: 'Sagittarius', start: { month: 11, day: 22 }, end: { month: 12, day: 21 } }
  ];
  
  for (const zodiac of zodiacSigns) {
    if (zodiac.start.month === zodiac.end.month) {
      // Same month range
      if (month === zodiac.start.month && day >= zodiac.start.day && day <= zodiac.end.day) {
        return zodiac.sign;
      }
    } else {
      // Cross month range
      if ((month === zodiac.start.month && day >= zodiac.start.day) ||
          (month === zodiac.end.month && day <= zodiac.end.day)) {
        return zodiac.sign;
      }
    }
  }
  
  return 'Unknown';
}

// Apply theme
function applyTheme(themeName) {
  // Remove existing theme classes
  document.documentElement.classList.remove('theme-ocean', 'theme-forest', 'theme-sunset', 'theme-lavender', 'theme-neon');
  
  // Apply new theme
  if (themeName !== 'default') {
    document.documentElement.classList.add(`theme-${themeName}`);
  }
  
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('selectedTheme', themeName);
  
  // Update particle colors based on theme
  updateParticleColors();
  
  // Update CSS custom properties based on theme
  const root = document.documentElement;
  const themeColors = {
    default: { primary: '#8b5cf6', secondary: '#ec4899', accent: '#3b82f6' },
    ocean: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#0891b2' },
    forest: { primary: '#10b981', secondary: '#059669', accent: '#047857' },
    sunset: { primary: '#f59e0b', secondary: '#d97706', accent: '#b45309' },
    lavender: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#6d28d9' },
    neon: { primary: '#06ffa5', secondary: '#00d4ff', accent: '#ff006e' }
  };
  
  const colors = themeColors[themeName] || themeColors.default;
  root.style.setProperty('--primary-color', colors.primary);
  root.style.setProperty('--secondary-color', colors.secondary);
  root.style.setProperty('--accent-color', colors.accent);
  
  // Force re-render of gradients and colors
  const gradientElements = document.querySelectorAll('.bg-gradient-to-r, .bg-gradient-to-br, .bg-gradient-to-l');
  gradientElements.forEach(element => {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = null;
  });
  
  // Update button gradients specifically
  const buttons = document.querySelectorAll('button.bg-gradient-to-r');
  buttons.forEach(button => {
    if (button.classList.contains('from-purple-500')) {
      button.style.background = `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`;
    }
  });
  
  // Update text gradients
  const textGradients = document.querySelectorAll('.bg-clip-text');
  textGradients.forEach(element => {
    if (element.classList.contains('from-purple-600')) {
      element.style.background = `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.accent})`;
      element.style.webkitBackgroundClip = 'text';
      element.style.backgroundClip = 'text';
    }
  });
  
  console.log(`Theme applied: ${themeName}`, colors);
}

// Change language
function changeLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang);
  
  // Use the setLanguage function from localization.js if available
  if (typeof setLanguage === 'function') {
    setLanguage(lang);
  } else {
    // Fallback implementation
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      // Check if translations is available from localization.js
      if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
  }
}

// Enhanced daily horoscope function
async function getDailyHoroscope() {
  // Since the original API might not be available, we'll use sample data
  const sampleHoroscopes = {
    aries: "Hari ini adalah waktu yang tepat untuk memulai proyek baru. Energi Anda sangat tinggi dan kreativitas mengalir dengan lancar.",
    taurus: "Fokus pada stabilitas finansial hari ini. Kesabaran Anda akan membuahkan hasil yang memuaskan.",
    gemini: "Komunikasi adalah kunci sukses Anda hari ini. Jaringan sosial akan membawa peluang baru.",
    cancer: "Intuisi Anda sangat kuat hari ini. Percayai insting dan jangan ragu untuk mengambil keputusan penting.",
    leo: "Hari yang cerah untuk menunjukkan bakat dan kemampuan Anda. Percaya diri adalah aset terbesar.",
    virgo: "Perhatikan detail dalam setiap pekerjaan. Perfeksionisme Anda akan dihargai hari ini.",
    libra: "Harmoni dalam hubungan menjadi fokus utama. Diplomasi Anda akan menyelesaikan konflik.",
    scorpio: "Transformasi besar sedang menanti. Bersiaplah untuk perubahan yang membawa kemajuan.",
    sagittarius: "Petualangan baru memanggil. Jangan takut untuk keluar dari zona nyaman Anda.",
    capricorn: "Kerja keras Anda mulai membuahkan hasil. Tetap fokus pada tujuan jangka panjang.",
    aquarius: "Inovasi dan ide-ide unik akan membawa Anda pada kesuksesan. Berpikir di luar kotak.",
    pisces: "Kreativitas dan intuisi berpadu sempurna hari ini. Waktunya untuk berkarya."
  };
  
  return {
    date: new Date().toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    ...sampleHoroscopes
  };
}

// Find birth date based on age
function findBirthDate(yearsInput, monthsInput, daysInput, ageInput) {
  const resultEl = document.getElementById('birthResult');
  
  let years = yearsInput;
  let months = monthsInput;
  let days = daysInput;
  
  // Parse text input if provided
  if (ageInput) {
    const matches = ageInput.match(/(\d+)\s*tahun\s*(\d+)\s*bulan\s*(\d+)\s*hari/i);
    if (matches) {
      years = parseInt(matches[1]);
      months = parseInt(matches[2]);
      days = parseInt(matches[3]);
    }
  }
  
  if (years === 0 && months === 0 && days === 0) {
    resultEl.innerHTML = '<p class="text-red-500">Silakan masukkan umur yang valid!</p>';
    return;
  }
  
  const now = new Date();
  const birthDate = new Date(now);
  
  birthDate.setFullYear(now.getFullYear() - years);
  birthDate.setMonth(now.getMonth() - months);
  birthDate.setDate(now.getDate() - days);
  
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  resultEl.innerHTML = `
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl">
      <h3 class="text-xl font-bold mb-2">Perkiraan Tanggal Lahir</h3>
      <p class="text-lg">${birthDate.toLocaleDateString('id-ID', options)}</p>
      <p class="text-sm mt-2 opacity-90">Zodiak: ${getZodiac(birthDate.getMonth() + 1, birthDate.getDate())}</p>
    </div>
  `;
  
  // Show result with animation
  gsap.fromTo(resultEl, 
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
  );
}

// Enhanced history functions
function saveToHistory(birthDate, ageDetails) {
  let history = JSON.parse(localStorage.getItem('ageHistory') || '[]');
  
  const historyItem = {
    id: Date.now(),
    birthDate: birthDate.toISOString(),
    age: `${ageDetails.years} tahun ${ageDetails.months} bulan ${ageDetails.days} hari`,
    calculatedAt: new Date().toISOString(),
    zodiac: getZodiac(birthDate.getMonth() + 1, birthDate.getDate())
  };
  
  // Add to beginning of array and limit to 10 items
  history.unshift(historyItem);
  history = history.slice(0, 10);
  
  localStorage.setItem('ageHistory', JSON.stringify(history));
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const container = document.getElementById('calculationHistory');
  const history = JSON.parse(localStorage.getItem('ageHistory') || '[]');
  
  if (history.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
        <i class="fas fa-history text-4xl mb-4 opacity-50"></i>
        <p>Belum ada riwayat perhitungan</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = history.map(item => {
    const birthDate = new Date(item.birthDate);
    const calculatedDate = new Date(item.calculatedAt);
    
    return `
      <div class="history-item group">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-bold text-gray-800 dark:text-white">${item.age}</h4>
          <button onclick="deleteHistoryItem(${item.id})" 
                  class="delete-button text-red-500 hover:text-red-600 p-2 rounded-lg transition-all duration-300">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center">
            <i class="fas fa-calendar mr-2 text-blue-500"></i>
            <span>Lahir: ${birthDate.toLocaleDateString('id-ID')}</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-star mr-2 text-yellow-500"></i>
            <span>Zodiak: ${item.zodiac}</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-clock mr-2 text-green-500"></i>
            <span>Dihitung: ${calculatedDate.toLocaleDateString('id-ID')}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function deleteHistoryItem(id) {
  let history = JSON.parse(localStorage.getItem('ageHistory') || '[]');
  history = history.filter(item => item.id !== id);
  localStorage.setItem('ageHistory', JSON.stringify(history));
  updateHistoryDisplay();
}

function clearAllHistory() {
  if (confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) {
    localStorage.removeItem('ageHistory');
    updateHistoryDisplay();
  }
}

// Share functions
function shareToFacebook() {
  const dobInput = document.getElementById('dob');
  if (!dobInput.value) {
    alert('Silakan hitung umur terlebih dahulu!');
    return;
  }
  
  const ageDetails = calculateAgeDetails(new Date(dobInput.value));
  const text = `Umur saya adalah ${ageDetails.years} tahun ${ageDetails.months} bulan ${ageDetails.days} hari! Hitung umur Anda di Kalkulator Umur Interaktif.`;
  const url = window.location.href;
  
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
}

function shareToTwitter() {
  const dobInput = document.getElementById('dob');
  if (!dobInput.value) {
    alert('Silakan hitung umur terlebih dahulu!');
    return;
  }
  
  const ageDetails = calculateAgeDetails(new Date(dobInput.value));
  const text = `Umur saya adalah ${ageDetails.years} tahun ${ageDetails.months} bulan ${ageDetails.days} hari! 🎂 #AgeCalculator`;
  const url = window.location.href;
  
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareToWhatsApp() {
  const dobInput = document.getElementById('dob');
  if (!dobInput.value) {
    alert('Silakan hitung umur terlebih dahulu!');
    return;
  }
  
  const ageDetails = calculateAgeDetails(new Date(dobInput.value));
  const text = `Umur saya adalah ${ageDetails.years} tahun ${ageDetails.months} bulan ${ageDetails.days} hari! 🎂\nHitung umur Anda di: ${window.location.href}`;
  
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// Export to PDF
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const dobInput = document.getElementById('dob');
  if (!dobInput.value) {
    alert('Silakan hitung umur terlebih dahulu!');
    return;
  }
  
  const ageDetails = calculateAgeDetails(new Date(dobInput.value));
  const birthDate = new Date(dobInput.value);
  const zodiac = getZodiac(birthDate.getMonth() + 1, birthDate.getDate());
  
  // Add content to PDF
  doc.setFontSize(20);
  doc.text('Hasil Perhitungan Umur', 20, 30);
  
  doc.setFontSize(12);
  doc.text(`Tanggal Lahir: ${birthDate.toLocaleDateString('id-ID')}`, 20, 50);
  doc.text(`Umur: ${ageDetails.years} tahun ${ageDetails.months} bulan ${ageDetails.days} hari`, 20, 70);
  doc.text(`Total Hari: ${ageDetails.totalDays.toLocaleString()}`, 20, 90);
  doc.text(`Total Jam: ${ageDetails.totalHours.toLocaleString()}`, 20, 110);
  doc.text(`Zodiak: ${zodiac}`, 20, 130);
  doc.text(`Dihitung pada: ${new Date().toLocaleDateString('id-ID')}`, 20, 150);
  
  doc.save('age-calculation-result.pdf');
}

// Display daily horoscope
function displayDailyHoroscope(zodiacSign, horoscopeData) {
  const container = document.getElementById('dailyHoroscope');
  if (!container) return;
  
  const zodiacKey = zodiacSign.toLowerCase();
  const horoscope = horoscopeData[zodiacKey] || "Horoskop tidak tersedia untuk zodiak ini.";
  
  container.innerHTML = `
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
      <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        <i class="fas fa-crystal-ball text-purple-500 mr-3"></i> Horoskop Harian - ${zodiacSign}
      </h3>
      <div class="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl">
        <p class="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">${horoscope}</p>
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <i class="fas fa-calendar-day mr-2"></i> ${horoscopeData.date}
        </div>
      </div>
    </div>
  `;
}