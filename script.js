// Core page navigation setup
const pages = [
  'loading-screen', 'countdown-screen', 'birthday-reveal', 'cover-page',
  'password-screen', 'treasure-screen', 'memory-book', 'final-photo',
  'game-screen', 'cake-screen', 'reasons-screen', 'mailbox-screen',
  'letter-screen', 'moon-screen', 'final-message', 'love-message'
];

let currentPageIndex = 0;
const showPage = (id) => {
  pages.forEach(p => {
    document.getElementById(p).classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
};
const gotoPage = (index) => {
  if (index >= 0 && index < pages.length) {
    currentPageIndex = index;
    showPage(pages[currentPageIndex]);
  }
};

// 1. Loading Screen
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.querySelector('.loading-progress');

setTimeout(() => {
  progressBar.style.animationPlayState = 'running';
  setTimeout(() => {
    loadingScreen.classList.remove('active');
    gotoPage(1); // countdown
    startCountdown();
  }, 3500);
}, 500);

// 2. Countdown
const countdownNumbers = ['3', '2', '1'];
const countdownNumberEl = document.getElementById('countdown-number');
let countdownIdx = 0;

const startCountdown = () => {
  if (countdownIdx < countdownNumbers.length) {
    countdownNumberEl.textContent = countdownNumbers[countdownIdx];
    countdownNumberEl.classList.remove('animate');
    setTimeout(() => {
      countdownNumberEl.classList.add('animate');
    }, 10);
    countdownIdx++;
    setTimeout(() => {
      startCountdown();
    }, 1500);
  } else {
    gotoPage(2);
    startBirthdayAnimation();
  }
};

// 3. Birthday reveal
const birthdayScreen = document.getElementById('birthday-reveal');
const startButton = document.getElementById('start-journey');

const startBirthdayAnimation = () => {
  birthdayScreen.classList.add('active');

  // Animate balloons
  document.querySelectorAll('.balloon').forEach((b, i) => {
    b.style.left = `${10 + i * 30}%`;
    b.animate([
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(-400px)', opacity: 0 }
    ], { duration: 4000, delay: i * 200 }).onfinish = () => {
      b.remove();
    };
  });

  // Animate confetti
  // (confetti animation handled via CSS animation)

  // Animate hearts
  // (hearts floating animation)
};

// Start journey button
startButton.addEventListener('click', () => {
  // Play music
  document.getElementById('bg-music').play();
  // Balloon and confetti animation trigger
  startBirthdayAnimation();
  // Proceed after a moment
  setTimeout(() => {
    gotoPage(3);
  }, 1500);
});

// 4. Cover Page
document.getElementById('to-cover-next').addEventListener('click', () => {
  gotoPage(4);
});

// 5. Password Screen
const passwordInput = document.getElementById('password-input');
const unlockBtn = document.getElementById('unlock-btn');

unlockBtn.addEventListener('click', () => {
  const val = passwordInput.value.trim().toLowerCase();
  if (val === 'july') {
    gotoPage(5);
  } else {
    // Shake effect
    passwordInput.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' }
    ], { duration: 500 });
  }
});

// 6. Treasure Chest
document.getElementById('open-chest').addEventListener('click', () => {
  document.getElementById('chest').classList.add('open');
  setTimeout(() => {
    gotoPage(6);
    initMemoryBook();
  }, 1000);
});

// 7. Memory Book - generate pages
const reasons = [
  "Your kindness shines brightly.",
  "You make everyone smile.",
  "Your smile is contagious.",
  "You are truly special.",
  "Your laughter warms hearts.",
  "You are beautiful inside and out.",
  "Your kindness is a gift.",
  "You inspire others.",
  "Your presence is a blessing.",
  "You light up the room.",
  "Your smile is my favorite.",
  "You are loved beyond words.",
  "Your heart is gold.",
  "You are unique.",
  "You bring joy everywhere.",
  "You are a star.",
  "Your kindness makes a difference.",
  "You are my sunshine.",
  "You are the best.",
  "Your smile is magic.",
  "You are cherished.",
  "You make life brighter.",
  "You are loved always."
];

let currentReasonPage = 0;

function initMemoryBook() {
  const bookDiv = document.getElementById('book');
  bookDiv.innerHTML = '';
  for (let i = 0; i < reasons.length; i++) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page';
    pageDiv.innerHTML = `
      <div class="reason">${reasons[i]}</div>
    `;
    if (i !== 0) pageDiv.style.display = 'none';
    bookDiv.appendChild(pageDiv);
  }
  showMemoryPage(0);
}

function showMemoryPage(index) {
  const pages = document.querySelectorAll('.page');
  pages.forEach((p, i) => {
    p.style.display = i === index ? 'flex' : 'none';
  });
}

document.getElementById('next-page').addEventListener('click', () => {
  if (currentReasonPage < reasons.length -1) {
    currentReasonPage++;
    showMemoryPage(currentReasonPage);
  }
});
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentReasonPage > 0) {
    currentReasonPage--;
    showMemoryPage(currentReasonPage);
  }
});

// After reasons, go to mailbox
document.getElementById('to-mailbox').addEventListener('click', () => {
  gotoPage(12);
});

// Mailbox interactions
document.getElementById('open-envelope').addEventListener('click', () => {
  document.getElementById('envelope').classList.toggle('open');
});
document.getElementById('to-moon').addEventListener('click', () => {
  gotoPage(13);
});
document.getElementById('to-final-message').addEventListener('click', () => {
  gotoPage(14);
});
document.getElementById('reveal-love').addEventListener('click', () => {
  gotoPage(15);
});
document.getElementById('restart').addEventListener('click', () => {
  window.location.reload();
});

// 8. Moon scene
document.getElementById('to-final-message').addEventListener('click', () => {
  gotoPage(14);
});

// 9. Final message
document.getElementById('reveal-love').addEventListener('click', () => {
  gotoPage(15);
});

// 10. Restart
document.getElementById('restart').addEventListener('click', () => {
  window.location.reload();
});

// --- Additional animations on "Begin The Journey ❤️" ---
startButton.addEventListener('click', () => {
  // Create balloons and confetti animations
  createBalloonsAndConfetti();
  // Play music
  document.getElementById('bg-music').play();
});

// Function to create balloons and confetti
function createBalloonsAndConfetti() {
  const container = document.createElement('div');
  container.className = 'balloons';

  // Generate balloons
  for (let i=0; i<20; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + '%';
    balloon.style.backgroundColor = Math.random() > 0.5 ? '#ffd700' : '#fff';
    balloon.animate([
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(-600px)', opacity: 0 }
    ], { duration: 4000 + Math.random() * 2000, delay: Math.random() * 1000 });
    container.appendChild(balloon);
  }

  // Generate confetti
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti';
  // No need to add elements if using CSS animation only
  document.body.appendChild(container);
  document.body.appendChild(confettiContainer);
  setTimeout(() => {
    container.remove();
    confettiContainer.remove();
  }, 4000);
}
