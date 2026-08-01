/* ============================================
   LUXURY BIRTHDAY WEBSITE - SCRIPT.JS
   Complete interactive logic for all 15 sections
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================

let currentScreen = 0;
const screens = [
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
];

let musicStarted = false;
let currentPage = 0;
const photos = [
    'photo1.jpg', 'photo2.jpg', 'photo4.jpg', 'photo5.jpg',
    'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo10.jpg',
    'photo12.jpg', 'photo13.jpg', 'photo14.jpg'
];

const reasons = [
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
];

const letterText = [
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
];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    initializeMemoryBook();
    initializeReasons();
    initializeMoonStars();
});

// ============================================
// SCREEN NAVIGATION
// ============================================

function showScreen(screenIndex) {
    // Hide all screens
    screens.forEach(screenId => {
        document.getElementById(screenId).classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screens[screenIndex]).classList.add('active');
    currentScreen = screenIndex;
    
    // Trigger screen-specific logic
    if (screenIndex === 1) {
        startCountdown();
    } else if (screenIndex === 2) {
        triggerBirthdayAnimation();
    } else if (screenIndex === 6) {
        initializeMemoryBook();
    } else if (screenIndex === 7) {
        // Game screen
    } else if (screenIndex === 12) {
        createMoonStars();
    }
}

function goToNextScreen() {
    if (currentScreen < screens.length - 1) {
        showScreen(currentScreen + 1);
    }
}

// ============================================
// 1. LOADING SCREEN
// ============================================

function initializeLoadingScreen() {
    setTimeout(() => {
        showScreen(1);
    }, 3500);
}

// ============================================
// 2. COUNTDOWN SCREEN
// ============================================

function startCountdown() {
    let count = 3;
    const countdownElement = document.getElementById('countdownNumber');
    const arrowElement = document.querySelector('.countdown-arrow');
    
    const countdownInterval = setInterval(() => {
        count--;
        
        if (count >= 0) {
            countdownElement.textContent = count;
            countdownElement.style.animation = 'none';
            setTimeout(() => {
                countdownElement.style.animation = 'countdownPulse 1s ease-out forwards';
            }, 10);
        }
        
        if (count < 0) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                showScreen(2);
            }, 500);
        }
    }, 1000);
}

// ============================================
// 3. HAPPY BIRTHDAY REVEAL
// ============================================

function triggerBirthdayAnimation() {
    if (!musicStarted) {
        const audio = document.getElementById('bgMusic');
        audio.play().catch(err => console.log('Audio play failed:', err));
        musicStarted = true;
    }
    
    createConfetti();
    createBalloons();
    createFloatingHearts();
    createSparkles();
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti ' + (Math.random() > 0.5 ? 'gold' : 'white');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.animationDuration = (2 + Math.random() * 1) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3500);
    }
}

function createBalloons() {
    const screen = document.getElementById('birthdayScreen');
    const balloonCount = 8;
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon white';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.top = Math.random() * 100 + '%';
        balloon.style.animationDelay = Math.random() * 0.5 + 's';
        screen.appendChild(balloon);
        
        setTimeout(() => balloon.remove(), 4500);
    }
}

function createFloatingHearts() {
    const screen = document.getElementById('birthdayScreen');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDuration = (2 + Math.random() * 1) + 's';
        heart.style.animationDelay = Math.random() * 0.3 + 's';
        screen.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3500);
    }
}

function createSparkles() {
    const screen = document.getElementById('birthdayScreen');
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 1 + 's';
        screen.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 4500);
    }
}

// ============================================
// 5. PASSWORD SCREEN
// ============================================

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const correctPassword = 'busayo';
    
    if (input.value.toLowerCase() === correctPassword) {
        goToNextScreen();
    } else {
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 400);
        input.value = '';
    }
}

// Allow Enter key to submit password
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && currentScreen === 4) {
        checkPassword();
    }
});

// ============================================
// 6. TREASURE CHEST
// ============================================

function openTreasure() {
    const chest = document.getElementById('treasureChest');
    if (!chest.classList.contains('open')) {
        chest.classList.add('open');
        document.getElementById('treasureMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('treasureButton').style.display = 'block';
        }, 1000);
    }
}

// ============================================
// 7. MEMORY BOOK
// ============================================

function initializeMemoryBook() {
    const bookPages = document.getElementById('bookPages');
    bookPages.innerHTML = '';
    
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
    
    // Photo pages with captions
    const captions = [
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
    ];
    
    photos.forEach((photo, index) => {
        const page = document.createElement('div');
        page.className = 'book-page';
        page.innerHTML = `
            <img src="images/${photo}" alt="Memory ${index + 1}" class="page-image">
            <p class="page-caption">${captions[index]}</p>
        `;
        bookPages.appendChild(page);
    });
    
    // Final page with us.jpg
    const finalPage = document.createElement('div');
    finalPage.className = 'book-page';
    finalPage.innerHTML = `
        <img src="images/us.jpg" alt="Us" class="page-image" style="height: 70%;">
        <p class="page-caption">No matter how many memories we make... this will always be my favourite one.</p>
    `;
    bookPages.appendChild(finalPage);
    
    currentPage = 0;
    updateBookButtons();
    updatePageCounter();
}

function nextPage() {
    const pages = document.querySelectorAll('.book-page');
    if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove('active');
        pages[currentPage].classList.add('prev');
        currentPage++;
        pages[currentPage].classList.remove('prev');
        pages[currentPage].classList.add('active');
        updateBookButtons();
        updatePageCounter();
        
        // Go to next screen after final page
        if (currentPage === pages.length - 1) {
            setTimeout(() => {
                goToNextScreen();
            }, 2000);
        }
    }
}

function previousPage() {
    const pages = document.querySelectorAll('.book-page');
    if (currentPage > 0) {
        pages[currentPage].classList.remove('active');
        currentPage--;
        pages[currentPage].classList.remove('prev');
        pages[currentPage].classList.add('active');
        updateBookButtons();
        updatePageCounter();
    }
}

function updateBookButtons() {
    const pages = document.querySelectorAll('.book-page');
    document.getElementById('prevPageBtn').disabled = currentPage === 0;
    document.getElementById('nextPageBtn').disabled = currentPage === pages.length - 1;
}

function updatePageCounter() {
    const pages = document.querySelectorAll('.book-page');
    document.getElementById('pageCounter').textContent = `Page ${currentPage + 1} of ${pages.length}`;
}

// ============================================
// 8. CATCH MY HEART GAME
// ============================================

let gameActive = false;
let gameScore = 0;
let gameTime = 60;
let gameInterval = null;

function startGame() {
    gameActive = true;
    gameScore = 0;
    gameTime = 60;
    document.getElementById('gameScore').textContent = '0';
    document.getElementById('gameTimer').textContent = '60';
    document.getElementById('gameButton').style.display = 'none';
    document.getElementById('gameCanvas').innerHTML = '';
    
    // Create falling hearts
    const spawnInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(spawnInterval);
            return;
        }
        createFallingHeart();
    }, 400);
    
    // Timer countdown
    gameInterval = setInterval(() => {
        gameTime--;
        document.getElementById('gameTimer').textContent = gameTime;
        
        if (gameTime <= 0) {
            endGame();
            clearInterval(gameInterval);
            clearInterval(spawnInterval);
        }
    }, 1000);
}

function createFallingHeart() {
    if (!gameActive) return;
    
    const canvas = document.getElementById('gameCanvas');
    const heart = document.createElement('div');
    heart.className = 'falling-heart-game';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * (canvas.offsetWidth - 30) + 'px';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    
    heart.onclick = (e) => {
        e.stopPropagation();
        gameScore++;
        document.getElementById('gameScore').textContent = gameScore;
        heart.remove();
    };
    
    canvas.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) heart.remove();
    }, 5000);
}

function endGame() {
    gameActive = false;
    document.getElementById('gameButton').style.display = 'block';
    document.getElementById('gameButton').textContent = 'Play Again';
    document.getElementById('nextAfterGame').style.display = 'block';
}

// ============================================
// 9. CAKE BUILDER
// ============================================

let decorationCount = 0;

function addDecoration(emoji) {
    const canvas = document.getElementById('cakeCanvas');
    const decoration = document.createElement('div');
    decoration.className = 'decoration';
    decoration.textContent = emoji;
    decoration.style.left = Math.random() * (canvas.offsetWidth - 40) + 'px';
    decoration.style.top = Math.random() * (canvas.offsetHeight - 40) + 'px';
    
    canvas.appendChild(decoration);
    decorationCount++;
    
    if (decorationCount >= 6) {
        showCakeBanner();
    }
}

function showCakeBanner() {
    const banner = document.getElementById('cakeBanner');
    banner.style.display = 'block';
    document.getElementById('cakeNextBtn').style.display = 'block';
}

// ============================================
// 10. 23 REASONS
// ============================================

function initializeReasons() {
    const grid = document.getElementById('envelopesGrid');
    grid.innerHTML = '';
    
    reasons.forEach((reason, index) => {
        const envelope = document.createElement('div');
        envelope.className = 'envelope';
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
        
        grid.appendChild(envelope);
    });
}

// ============================================
// 11. MAILBOX
// ============================================

function openMailbox() {
    const mailbox = document.getElementById('mailbox');
    if (!mailbox.classList.contains('open')) {
        mailbox.classList.add('open');
        setTimeout(() => {
            document.getElementById('mailboxNextBtn').style.display = 'block';
        }, 600);
    }
}

// ============================================
// 12. LOVE LETTER
// ============================================

function openLetter() {
    const envelope = document.getElementById('letterEnvelope');
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        typeLetterContent();
        setTimeout(() => {
            document.getElementById('letterNextBtn').style.display = 'block';
        }, 2000);
    }
}

function typeLetterContent() {
    const contentDiv = document.getElementById('letterContent');
    contentDiv.innerHTML = '';
    
    letterText.forEach((line, index) => {
        const lineElement = document.createElement('div');
        lineElement.className = 'letter-line';
        lineElement.textContent = line;
        lineElement.style.animationDelay = (index * 0.1) + 's';
        contentDiv.appendChild(lineElement);
    });
}

// ============================================
// 13. MOON ENDING
// ============================================

function createMoonStars() {
    const container = document.getElementById('moonStars');
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
}

function initializeMoonStars() {
    const container = document.getElementById('moonHearts');
    if (!container) return;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'moon-hearts';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(heart);
    }
}

// ============================================
// 14. FINAL MESSAGE
// ============================================

function revealFinal() {
    const reveal = document.getElementById('finalReveal');
    reveal.classList.add('show');
    setTimeout(() => {
        document.getElementById('restartBtn').style.display = 'block';
    }, 800);
}

// ============================================
// 15. RESTART
// ============================================

function restartJourney() {
    // Reset all state
    currentScreen = 0;
    currentPage = 0;
    gameScore = 0;
    gameTime = 60;
    gameActive = false;
    decorationCount = 0;
    musicStarted = false;
    
    // Clear game canvas
    document.getElementById('gameCanvas').innerHTML = '';
    document.getElementById('gameButton').style.display = 'block';
    document.getElementById('gameButton').textContent = 'Start Game';
    document.getElementById('nextAfterGame').style.display = 'none';
    
    // Clear cake decorations
    document.getElementById('cakeCanvas').innerHTML = '<div class="cake-base"><div class="cake-frosting"></div></div>';
    document.getElementById('cakeBanner').style.display = 'none';
    document.getElementById('cakeNextBtn').style.display = 'none';
    
    // Reset password
    document.getElementById('passwordInput').value = '';
    
    // Reset treasure
    document.getElementById('treasureChest').classList.remove('open');
    document.getElementById('treasureMessage').style.display = 'none';
    document.getElementById('treasureButton').style.display = 'none';
    
    // Reset mailbox
    document.getElementById('mailbox').classList.remove('open');
    document.getElementById('mailboxNextBtn').style.display = 'none';
    
    // Reset letter
    document.getElementById('letterEnvelope').classList.remove('open');
    document.getElementById('letterNextBtn').style.display = 'none';
    
    // Reset final reveal
    document.getElementById('finalReveal').classList.remove('show');
    document.getElementById('restartBtn').style.display = 'none';
    
    // Stop music
    const audio = document.getElementById('bgMusic');
    audio.pause();
    audio.currentTime = 0;
    
    // Show loading screen
    showScreen(0);
    initializeLoadingScreen();
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(event) {
    // Skip to next screen with spacebar (except during games/interactions)
    if (event.code === 'Space' && currentScreen !== 7) {
        event.preventDefault();
        goToNextScreen();
    }
});
