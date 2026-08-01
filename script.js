/* ============================================
   LUXURY BIRTHDAY WEBSITE - OPTIMIZED SCRIPT.JS
   Production-Ready with Clean Architecture
   ============================================ */

// ============================================
// APPLICATION STATE & CONFIGURATION
// ============================================

const config = {
  screens: [
    'loadingScreen',
    'countdownScreen',
    'birthdayScreen',
    'coverPage',
    'passwordScreen',
    'treasureScreen',
    'memoryBook',
    'gameScreen',
    'cakeScreen',
    'reasonsScreen',
    'mailboxScreen',
    'letterScreen',
    'moonScreen',
    'finalScreen'
  ],
  password: 'busayo',
  photos: [
    'photo1.jpg', 'photo2.jpg', 'photo4.jpg', 'photo5.jpg',
    'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo10.jpg',
    'photo12.jpg', 'photo13.jpg', 'photo14.jpg'
  ],
  captions: [
    "Every moment with you is a memory I cherish",
    "Your smile brightens my darkest days",
    "Together, we create magic",
    "In your eyes, I found my home",
    "You are my favorite adventure",
    "Every laugh with you is a treasure",
    "You make ordinary moments extraordinary",
    "My heart belongs to you",
    "Forever grateful for you",
    "You are my greatest blessing",
    "Every day with you is a gift"
  ],
  reasons: [
    "You light up every room you walk into",
    "Your laugh is contagious and pure",
    "You have the biggest heart",
    "You're incredibly strong and resilient",
    "Your creativity knows no bounds",
    "You make everyone feel valued",
    "You have impeccable taste",
    "Your loyalty is unmatched",
    "You're genuinely kind to everyone",
    "Your dreams inspire me",
    "You're a natural leader",
    "Your sense of humor is perfect",
    "You make life an adventure",
    "Your intelligence is captivating",
    "You're beautifully authentic",
    "Your presence brings peace",
    "You're an amazing friend",
    "Your passion is infectious",
    "You deserve all the happiness",
    "You're truly one of a kind",
    "Your love changes everything",
    "You're my favorite person",
    "You make every day special"
  ],
  letterText: [
    "My Dearest Busayo,",
    "",
    "As I sit down to write this, my heart is overflowing with so much love and gratitude for you.",
    "",
    "Today marks another year of your beautiful existence, and I wanted to take a moment to tell you exactly what you mean to me.",
    "",
    "From the first moment I met you, I knew you were someone special. Your warmth, your grace, your strength—they captivated me. But it's not just who you are on the surface; it's the depth of your character that truly moves me.",
    "",
    "You've shown me what it means to love unconditionally. You've stood by me through everything, celebrating my victories as if they were your own, and holding me up when I stumbled. That kind of love is rare, and I don't take it for granted for a single moment.",
    "",
    "Every memory we've created together is etched into my soul. The quiet moments, the laughter-filled adventures, the deep conversations at 3 AM—they're all treasures I hold close to my heart.",
    "",
    "You inspire me to be better, to dream bigger, to love deeper. You make me want to be the best version of myself, not because you demand it, but because your love motivates me to grow.",
    "",
    "On this special day, I want you to know that you are seen, you are valued, and you are deeply, profoundly loved.",
    "",
    "Happy Birthday to the most amazing person I know.",
    "",
    "Forever yours,",
    "— Veilwalker 🤍"
  ]
};

// ============================================
// APPLICATION STATE
// ============================================

const state = {
  currentScreen: 0,
  musicStarted: false,
  currentPage: 0,
  gameActive: false,
  gameScore: 0,
  gameTime: 60,
  gameInterval: null,
  decorationCount: 0,
  treasureOpen: false,
  mailboxOpen: false,
  letterOpen: false,
  finalRevealed: false,
  countdownTimer: null,
  gameHearts: []
};

// ============================================
// MAIN APPLICATION OBJECT
// ============================================

const app = {
  // Initialize application
  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.startLoadingScreen();
  },

  // Cache DOM elements for better performance
  cacheElements() {
    this.elements = {
      screens: config.screens.map(id => document.getElementById(id)),
      countdownNumber: document.getElementById('countdownNumber'),
      passwordInput: document.getElementById('passwordInput'),
      treasureChest: document.getElementById('treasureChest'),
      treasureMessage: document.getElementById('treasureMessage'),
      treasureButton: document.getElementById('treasureButton'),
      bookPages: document.getElementById('bookPages'),
      prevPageBtn: document.getElementById('prevPageBtn'),
      nextPageBtn: document.getElementById('nextPageBtn'),
      pageCounter: document.getElementById('pageCounter'),
      gameCanvas: document.getElementById('gameCanvas'),
      gameScore: document.getElementById('gameScore'),
      gameTimer: document.getElementById('gameTimer'),
      gameButton: document.getElementById('gameButton'),
      nextAfterGame: document.getElementById('nextAfterGame'),
      cakeCanvas: document.getElementById('cakeCanvas'),
      cakeBanner: document.getElementById('cakeBanner'),
      cakeNextBtn: document.getElementById('cakeNextBtn'),
      envelopesGrid: document.getElementById('envelopesGrid'),
      mailbox: document.getElementById('mailbox'),
      mailboxNextBtn: document.getElementById('mailboxNextBtn'),
      letterEnvelope: document.getElementById('letterEnvelope'),
      letterContent: document.getElementById('letterContent'),
      letterNextBtn: document.getElementById('letterNextBtn'),
      moonHearts: document.getElementById('moonHearts'),
      moonStars: document.getElementById('moonStars'),
      finalReveal: document.getElementById('finalReveal'),
      restartBtn: document.getElementById('restartBtn'),
      bgMusic: document.getElementById('bgMusic'),
      confettiContainer: document.getElementById('confettiContainer')
    };
  },

  // Attach event listeners
  attachEventListeners() {
    // Password input Enter key
    if (this.elements.passwordInput) {
      this.elements.passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.checkPassword();
      });
    }

    // Treasure chest keyboard support
    if (this.elements.treasureChest) {
      this.elements.treasureChest.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openTreasure();
        }
      });
    }

    // Mailbox keyboard support
    if (this.elements.mailbox) {
      this.elements.mailbox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openMailbox();
        }
      });
    }

    // Letter envelope keyboard support
    if (this.elements.letterEnvelope) {
      this.elements.letterEnvelope.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLetter();
        }
      });
    }

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && state.currentScreen !== 7) {
        e.preventDefault();
        this.goToNextScreen();
      }
    });
  },

  // ============================================
  // SCREEN NAVIGATION
  // ============================================

  showScreen(screenIndex) {
    // Validate screen index
    if (screenIndex < 0 || screenIndex >= config.screens.length) return;

    // Hide all screens
    this.elements.screens.forEach(screen => {
      if (screen) screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = this.elements.screens[screenIndex];
    if (targetScreen) {
      targetScreen.classList.add('active');
      state.currentScreen = screenIndex;
    }

    // Trigger screen-specific logic
    this.triggerScreenLogic(screenIndex);
  },

  triggerScreenLogic(screenIndex) {
    switch (screenIndex) {
      case 1: // Countdown
        this.startCountdown();
        break;
      case 2: // Birthday
        this.triggerBirthdayAnimation();
        break;
      case 6: // Memory book
        this.initializeMemoryBook();
        break;
      case 12: // Moon screen
        this.createMoonStars();
        break;
    }
  },

  goToNextScreen() {
    if (state.currentScreen < config.screens.length - 1) {
      this.showScreen(state.currentScreen + 1);
    }
  },

  // ============================================
  // 1. LOADING SCREEN
  // ============================================

  startLoadingScreen() {
    setTimeout(() => {
      this.showScreen(1);
    }, 3500);
  },

  // ============================================
  // 2. COUNTDOWN SCREEN
  // ============================================

  startCountdown() {
    let count = 3;
    
    if (state.countdownTimer) clearInterval(state.countdownTimer);

    state.countdownTimer = setInterval(() => {
      count--;

      if (count >= 0) {
        this.elements.countdownNumber.textContent = count;
        // Trigger animation
        this.elements.countdownNumber.style.animation = 'none';
        setTimeout(() => {
          this.elements.countdownNumber.style.animation = 'countdownPulse 1s ease-out forwards';
        }, 10);
      }

      if (count < 0) {
        clearInterval(state.countdownTimer);
        setTimeout(() => {
          this.showScreen(2);
        }, 500);
      }
    }, 1000);
  },

  // ============================================
  // 3. BIRTHDAY REVEAL
  // ============================================

  triggerBirthdayAnimation() {
    if (!state.musicStarted) {
      this.playMusic();
      state.musicStarted = true;
    }

    // Use requestAnimationFrame to prevent blocking
    requestAnimationFrame(() => {
      this.createConfetti();
      this.createBalloons();
      this.createFloatingHearts();
      this.createSparkles();
    });
  },

  playMusic() {
    const audio = this.elements.bgMusic;
    audio.play().catch(err => console.log('Audio play failed:', err));
  },

  createConfetti() {
    const container = this.elements.confettiContainer;
    const confettiCount = 30; // Reduced from 50
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti ' + (Math.random() > 0.5 ? 'gold' : 'white');
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.animationDuration = (2 + Math.random() * 1) + 's';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      fragment.appendChild(confetti);
    }
    
    container.appendChild(fragment);
    
    // Clean up after animation
    setTimeout(() => {
      Array.from(container.querySelectorAll('.confetti')).forEach(el => el.remove());
    }, 3500);
  },

  createBalloons() {
    const screen = this.elements.screens[2];
    const balloonCount = 6; // Reduced from 8
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < balloonCount; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon white';
      balloon.style.left = Math.random() * 100 + '%';
      balloon.style.top = Math.random() * 100 + '%';
      balloon.style.animationDelay = Math.random() * 0.5 + 's';
      fragment.appendChild(balloon);
    }
    
    screen.appendChild(fragment);
    
    // Clean up after animation
    setTimeout(() => {
      Array.from(screen.querySelectorAll('.balloon')).forEach(el => el.remove());
    }, 4500);
  },

  createFloatingHearts() {
    const screen = this.elements.screens[2];
    const heartCount = 10; // Reduced from 15
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = '❤️';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = Math.random() * 100 + '%';
      heart.style.animationDuration = (2 + Math.random() * 1) + 's';
      heart.style.animationDelay = Math.random() * 0.3 + 's';
      fragment.appendChild(heart);
    }
    
    screen.appendChild(fragment);
    
    // Clean up after animation
    setTimeout(() => {
      Array.from(screen.querySelectorAll('.floating-heart')).forEach(el => el.remove());
    }, 3500);
  },

  createSparkles() {
    const screen = this.elements.screens[2];
    const sparkleCount = 12; // Reduced from 20
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.textContent = '✨';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 1 + 's';
      fragment.appendChild(sparkle);
    }
    
    screen.appendChild(fragment);
    
    // Clean up after animation
    setTimeout(() => {
      Array.from(screen.querySelectorAll('.sparkle')).forEach(el => el.remove());
    }, 4500);
  },

  // ============================================
  // 5. PASSWORD SCREEN
  // ============================================

  checkPassword() {
    const input = this.elements.passwordInput;
    if (input.value.toLowerCase() === config.password) {
      this.goToNextScreen();
    } else {
      input.classList.add('shake');
      setTimeout(() => {
        input.classList.remove('shake');
      }, 400);
      input.value = '';
    }
  },

  // ============================================
  // 6. TREASURE CHEST
  // ============================================

  openTreasure() {
    if (!state.treasureOpen) {
      state.treasureOpen = true;
      this.elements.treasureChest.classList.add('open');
      this.elements.treasureChest.setAttribute('aria-pressed', 'true');
      this.elements.treasureMessage.style.display = 'block';
      setTimeout(() => {
        this.elements.treasureButton.style.display = 'block';
      }, 1000);
    }
  },

  // ============================================
  // 7. MEMORY BOOK
  // ============================================

  initializeMemoryBook() {
    const bookPages = this.elements.bookPages;
    bookPages.innerHTML = '';
    state.currentPage = 0;

    // Cover page
    const coverPage = document.createElement('div');
    coverPage.className = 'book-page active';
    coverPage.innerHTML = `
      <div class="book-cover">
        <h2 class="book-cover-title">Our Memories ❤️</h2>
        <p style="color: #d4af37; font-style: italic;">A collection of moments we treasure</p>
      </div>
    `;
    bookPages.appendChild(coverPage);

    // Photo pages
    config.photos.forEach((photo, index) => {
      const page = document.createElement('div');
      page.className = 'book-page';
      page.innerHTML = `
        <img src="images/${photo}" alt="Memory ${index + 1}" class="page-image">
        <p class="page-caption">${config.captions[index]}</p>
      `;
      bookPages.appendChild(page);
    });

    // Final page with us.jpg
    const finalPage = document.createElement('div');
    finalPage.className = 'book-page';
    finalPage.innerHTML = `
      <img src="images/us.jpg" alt="Us together" class="page-image" style="height: 70%;">
      <p class="page-caption">No matter how many memories we make... this will always be my favourite one.</p>
    `;
    bookPages.appendChild(finalPage);

    this.updateBookButtons();
    this.updatePageCounter();
  },

  nextPage() {
    const pages = this.elements.bookPages.querySelectorAll('.book-page');
    if (state.currentPage < pages.length - 1) {
      pages[state.currentPage].classList.remove('active');
      pages[state.currentPage].classList.add('prev');
      state.currentPage++;
      pages[state.currentPage].classList.remove('prev');
      pages[state.currentPage].classList.add('active');
      this.updateBookButtons();
      this.updatePageCounter();

      // Auto-advance after final page
      if (state.currentPage === pages.length - 1) {
        setTimeout(() => {
          this.goToNextScreen();
        }, 2000);
      }
    }
  },

  previousPage() {
    const pages = this.elements.bookPages.querySelectorAll('.book-page');
    if (state.currentPage > 0) {
      pages[state.currentPage].classList.remove('active');
      state.currentPage--;
      pages[state.currentPage].classList.remove('prev');
      pages[state.currentPage].classList.add('active');
      this.updateBookButtons();
      this.updatePageCounter();
    }
  },

  updateBookButtons() {
    const pages = this.elements.bookPages.querySelectorAll('.book-page');
    this.elements.prevPageBtn.disabled = state.currentPage === 0;
    this.elements.nextPageBtn.disabled = state.currentPage === pages.length - 1;
  },

  updatePageCounter() {
    const pages = this.elements.bookPages.querySelectorAll('.book-page');
    this.elements.pageCounter.textContent = `Page ${state.currentPage + 1} of ${pages.length}`;
  },

  // ============================================
  // 8. CATCH MY HEART GAME
  // ============================================

  startGame() {
    state.gameActive = true;
    state.gameScore = 0;
    state.gameTime = 60;
    this.elements.gameScore.textContent = '0';
    this.elements.gameTimer.textContent = '60';
    this.elements.gameButton.style.display = 'none';
    this.elements.gameCanvas.innerHTML = '';

    // Spawn hearts
    const spawnInterval = setInterval(() => {
      if (!state.gameActive) {
        clearInterval(spawnInterval);
        return;
      }
      this.createFallingHeart();
    }, 400);

    // Timer
    if (state.gameInterval) clearInterval(state.gameInterval);
    state.gameInterval = setInterval(() => {
      state.gameTime--;
      this.elements.gameTimer.textContent = state.gameTime;

      if (state.gameTime <= 0) {
        this.endGame();
        clearInterval(state.gameInterval);
        clearInterval(spawnInterval);
      }
    }, 1000);
  },

  createFallingHeart() {
    if (!state.gameActive) return;

    const canvas = this.elements.gameCanvas;
    const heart = document.createElement('div');
    heart.className = 'falling-heart-game';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * (canvas.offsetWidth - 30) + 'px';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';

    heart.onclick = (e) => {
      e.stopPropagation();
      state.gameScore++;
      this.elements.gameScore.textContent = state.gameScore;
      heart.remove();
    };

    canvas.appendChild(heart);
    state.gameHearts.push(heart);

    setTimeout(() => {
      if (heart.parentNode) heart.remove();
    }, 5000);
  },

  endGame() {
    state.gameActive = false;
    this.elements.gameButton.style.display = 'block';
    this.elements.gameButton.textContent = 'Play Again';
    this.elements.nextAfterGame.style.display = 'block';
  },

  // ============================================
  // 9. CAKE BUILDER
  // ============================================

  addDecoration(emoji) {
    const canvas = this.elements.cakeCanvas;
    const decoration = document.createElement('div');
    decoration.className = 'decoration';
    decoration.textContent = emoji;
    decoration.style.left = Math.random() * (canvas.offsetWidth - 40) + 'px';
    decoration.style.top = Math.random() * (canvas.offsetHeight - 40) + 'px';

    canvas.appendChild(decoration);
    state.decorationCount++;

    if (state.decorationCount >= 6) {
      this.showCakeBanner();
    }
  },

  showCakeBanner() {
    this.elements.cakeBanner.style.display = 'block';
    this.elements.cakeNextBtn.style.display = 'block';
  },

  // ============================================
  // 10. 23 REASONS
  // ============================================

  initializeReasons() {
    const grid = this.elements.envelopesGrid;
    grid.innerHTML = '';

    config.reasons.forEach((reason, index) => {
      const envelope = document.createElement('div');
      envelope.className = 'envelope';
      envelope.setAttribute('role', 'button');
      envelope.setAttribute('tabindex', '0');
      envelope.setAttribute('aria-label', `Reason ${index + 1}: ${reason}`);
      envelope.innerHTML = `
        <div class="envelope-flap"></div>
        <div class="envelope-number">${index + 1}</div>
        <div class="envelope-content">
          <p class="envelope-text">${reason}</p>
        </div>
      `;

      envelope.onclick = () => {
        envelope.classList.toggle('open');
      };

      envelope.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          envelope.classList.toggle('open');
        }
      });

      grid.appendChild(envelope);
    });
  },

  // ============================================
  // 11. MAILBOX
  // ============================================

  openMailbox() {
    if (!state.mailboxOpen) {
      state.mailboxOpen = true;
      this.elements.mailbox.classList.add('open');
      this.elements.mailbox.setAttribute('aria-pressed', 'true');
      setTimeout(() => {
        this.elements.mailboxNextBtn.style.display = 'block';
      }, 600);
    }
  },

  // ============================================
  // 12. LOVE LETTER
  // ============================================

  openLetter() {
    if (!state.letterOpen) {
      state.letterOpen = true;
      this.elements.letterEnvelope.classList.add('open');
      this.elements.letterEnvelope.setAttribute('aria-pressed', 'true');
      this.typeLetterContent();
      setTimeout(() => {
        this.elements.letterNextBtn.style.display = 'block';
      }, 2000);
    }
  },

  typeLetterContent() {
    const contentDiv = this.elements.letterContent;
    contentDiv.innerHTML = '';

    config.letterText.forEach((line) => {
      const lineElement = document.createElement('div');
      lineElement.className = 'letter-line';
      lineElement.textContent = line;
      contentDiv.appendChild(lineElement);
    });
  },

  // ============================================
  // 13. MOON ENDING
  // ============================================

  createMoonStars() {
    const container = this.elements.moonStars;
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 15; i++) {
      const star = document.createElement('div');
      star.className = 'moon-stars';
      star.textContent = '✨';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(star);
    }

    this.createMoonHearts();
  },

  createMoonHearts() {
    const container = this.elements.moonHearts;
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.className = 'moon-hearts';
      heart.textContent = '❤️';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = Math.random() * 100 + '%';
      heart.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(heart);
    }
  },

  // ============================================
  // 14. FINAL MESSAGE
  // ============================================

  revealFinal() {
    state.finalRevealed = true;
    this.elements.finalReveal.classList.add('show');
    setTimeout(() => {
      this.elements.restartBtn.style.display = 'block';
    }, 800);
  },

  // ============================================
  // 15. RESTART
  // ============================================

  restartJourney() {
    // Reset state
    state.currentScreen = 0;
    state.musicStarted = false;
    state.currentPage = 0;
    state.gameActive = false;
    state.gameScore = 0;
    state.gameTime = 60;
    state.decorationCount = 0;
    state.treasureOpen = false;
    state.mailboxOpen = false;
    state.letterOpen = false;
    state.finalRevealed = false;

    // Clear timers
    if (state.countdownTimer) clearInterval(state.countdownTimer);
    if (state.gameInterval) clearInterval(state.gameInterval);

    // Reset UI elements
    this.elements.gameCanvas.innerHTML = '';
    this.elements.gameButton.style.display = 'block';
    this.elements.gameButton.textContent = 'Start Game';
    this.elements.nextAfterGame.style.display = 'none';

    this.elements.cakeCanvas.innerHTML = '<div class="cake-base"><div class="cake-frosting"></div></div>';
    this.elements.cakeBanner.style.display = 'none';
    this.elements.cakeNextBtn.style.display = 'none';

    this.elements.passwordInput.value = '';

    this.elements.treasureChest.classList.remove('open');
    this.elements.treasureChest.setAttribute('aria-pressed', 'false');
    this.elements.treasureMessage.style.display = 'none';
    this.elements.treasureButton.style.display = 'none';

    this.elements.mailbox.classList.remove('open');
    this.elements.mailbox.setAttribute('aria-pressed', 'false');
    this.elements.mailboxNextBtn.style.display = 'none';

    this.elements.letterEnvelope.classList.remove('open');
    this.elements.letterEnvelope.setAttribute('aria-pressed', 'false');
    this.elements.letterNextBtn.style.display = 'none';

    this.elements.finalReveal.classList.remove('show');
    this.elements.restartBtn.style.display = 'none';

    // Stop music
    const audio = this.elements.bgMusic;
    audio.pause();
    audio.currentTime = 0;

    // Restart
    this.showScreen(0);
    this.startLoadingScreen();
  }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  app.init();
  // Initialize reasons screen early for better performance
  app.initializeReasons();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (state.countdownTimer) clearInterval(state.countdownTimer);
  if (state.gameInterval) clearInterval(state.gameInterval);
});
