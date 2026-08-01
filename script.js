document.addEventListener('DOMContentLoaded', () => {
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

  // Utility for next page
  const gotoPage = (index) => {
    if (index >= 0 && index < pages.length) {
      currentPageIndex = index;
      showPage(pages[currentPageIndex]);
    }
  };

  // Loading Screen
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.querySelector('.loading-bar');
  setTimeout(() => {
    loadingScreen.classList.remove('active');
    gotoPage(1); // Countdown
    startCountdown();
  }, 3500); // wait for loading animation

  // Countdown
  const countdownNumbers = ['3', '2', '1'];
  const countdownElement = document.getElementById('countdown-number');
  let countdownIndex = 0;

  const startCountdown = () => {
    if (countdownIndex < countdownNumbers.length) {
      countdownElement.textContent = countdownNumbers[countdownIndex];
      countdownElement.style.transform = 'scale(0.5)';
      countdownElement.style.opacity = '0';
      // Animate
      countdownElement.animate([
        { transform: 'scale(0.5)', opacity: 0 },
        { transform: 'scale(1.2)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 }
      ], { duration: 1000 }).onfinish = () => {
        countdownIndex++;
        setTimeout(startCountdown, 300);
      };
    } else {
      // Move to birthday reveal
      gotoPage(2);
      startBirthdayAnimation();
    }
  };

  // Birthday Animation
  const startBirthdayAnimation = () => {
    const reveal = document.getElementById('birthday-reveal');
    reveal.classList.add('active');

    // Animate balloons
    document.querySelectorAll('.balloon').forEach((b, i) => {
      b.style.left = `${20 + i * 30}%`;
      b.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(-300px)', opacity: 0 }
      ], { duration: 4000, delay: i * 200 }).onfinish = () => {
        b.remove();
      };
    });

    // Animate confetti and hearts - optional, can be added
  };

  // Button Handlers
  document.getElementById('start-journey').addEventListener('click', () => {
    gotoPage(3); // Cover page
  });

  // Cover page continue
  document.getElementById('to-cover-next').addEventListener('click', () => {
    gotoPage(4); // Password
  });

  // Password logic
  document.getElementById('unlock-btn').addEventListener('click', () => {
    const input = document.getElementById('password-input');
    const password = input.value.trim();
    if (password === 'secret123') {
      // Correct password
      gotoPage(5); // Treasure
    } else {
      // Shake input
      input.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
      ], { duration: 500 });
    }
  });

  // Open chest
  document.getElementById('open-chest').addEventListener('click', () => {
    // Animate light
    document.querySelector('.chest').classList.add('open');
    // Proceed after delay
    setTimeout(() => {
      gotoPage(6); // Memory Book
      initMemoryBook();
    }, 1000);
  });

  // Memory Book logic
  const captions = [
    "Our first memory ❤️",
    "Laughing together",
    "Adventures we had",
    "Special moments",
    "More to come..."
  ];
  let currentPage = 0;

  const initMemoryBook = () => {
    const bookDiv = document.getElementById('book');
    bookDiv.innerHTML = '';
    // Generate pages
    const pages = [
      { img: 'images/photo1.jpg', caption: 'First memory' },
      { img: 'images/photo2.jpg', caption: 'Laughs' },
      { img: 'images/photo4.jpg', caption: 'Adventures' },
      { img: 'images/photo5.jpg', caption: 'Love' },
      { img: 'images/photo6.jpg', caption: 'Joy' },
      { img: 'images/photo7.jpg', caption: 'Cherished' },
      { img: 'images/photo8.jpg', caption: 'Moments' },
      { img: 'images/photo10.jpg', caption: 'Forever' },
      { img: 'images/photo12.jpg', caption: 'Memories' },
      { img: 'images/photo13.jpg', caption: 'Sweetness' },
      { img: 'images/photo14.jpg', caption: 'The best' },
    ];

    pages.forEach((p, i) => {
      const pageDiv = document.createElement('div');
      pageDiv.className = 'page';
      pageDiv.innerHTML = `
        <img src="${p.img}" class="page-img" />
        <div class="caption">${p.caption}</div>
      `;
      if (i !== 0) pageDiv.style.display = 'none';
      bookDiv.appendChild(pageDiv);
    });
    showPageInBook(0);
  };

  const showPageInBook = (index) => {
    const pages = document.querySelectorAll('.page');
    pages.forEach((p, i) => {
      p.style.display = i === index ? 'block' : 'none';
    });
  };

  document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < 10) {
      currentPage++;
      showPageInBook(currentPage);
    }
  });
  document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      showPageInBook(currentPage);
    }
  });

  // Continue after photo14
  document.getElementById('to-final').addEventListener('click', () => {
    gotoPage(13); // Moon ending
  });

  // Moon ending
  document.getElementById('to-final-message').addEventListener('click', () => {
    gotoPage(14); // Final message
  });

  // Reveal love message
  document.getElementById('reveal-love').addEventListener('click', () => {
    gotoPage(15);
    document.getElementById('love-message').classList.add('active');
  });

  // Restart
  document.getElementById('restart').addEventListener('click', () => {
    window.location.reload();
  });

  // Play music when birthday reveal starts
  document.getElementById('start-journey').addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    music.play();
  });

  // Game - Falling Hearts
  const canvas = document.getElementById('heart-canvas');
  const ctx = canvas.getContext('2d');
  let hearts = [];
  let score = 0;
  let gameTimer = 60;
  let gameInterval;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const createHeart = () => {
    return {
      x: Math.random() * canvas.width,
      y: -20,
      size: 20 + Math.random() * 20,
      speed: 2 + Math.random() * 3,
    };
  };

  const drawHearts = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.size / 2, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const updateHearts = () => {
    hearts.forEach(h => {
      h.y += h.speed;
    });
    hearts = hearts.filter(h => h.y < canvas.height + 20);
  };

  const spawnHearts = () => {
    if (hearts.length < 20) {
      hearts.push(createHeart());
    }
  };

  const animateHearts = () => {
    spawnHearts();
    updateHearts();
    drawHearts();
    requestAnimationFrame(animateHearts);
  };

  document.getElementById('end-game').addEventListener('click', () => {
    clearInterval(gameInterval);
    cancelAnimationFrame(animateHearts);
  });

  // Start game
  const startGame = () => {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = 60;
    hearts = [];
    animateHearts();
    gameInterval = setInterval(() => {
      gameTimer--;
      document.getElementById('timer').textContent = gameTimer;
      if (gameTimer <= 0) {
        clearInterval(gameInterval);
      }
    }, 1000);
  };

  // Decorations for cake
  document.querySelectorAll('.decor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const decor = btn.dataset.decoration;
      // Add decoration to cake layers
      // For simplicity, just change background color or add small overlays
      alert(`Added ${decor} to cake!`);
    });
  });

  document.getElementById('finish-cake').addEventListener('click', () => {
    gotoPage(11); // Reasons
    generateReasons();
  });

  // Generate reasons
  const reasons = Array.from({ length: 23 }, (_, i) => `Reason ${i + 1}: You are special!`);
  const generateReasons = () => {
    const container = document.querySelector('.envelopes');
    container.innerHTML = '';
    reasons.forEach((reason, index) => {
      const envelope = document.createElement('div');
      envelope.className = 'envelope';
      envelope.innerHTML = `
        <div class="envelope-front">📩</div>
        <div class="envelope-back">${reason}</div>
      `;
      envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
        if (envelope.classList.contains('open')) {
          envelope.innerHTML = `<div class="envelope-back">${reason}</div>`;
        } else {
          envelope.innerHTML = `<div class="envelope-front">📩</div>`;
        }
      });
      container.appendChild(envelope);
    });
  };

  // Mailbox
  document.getElementById('to-mailbox').addEventListener('click', () => {
    gotoPage(12);
  });
  document.getElementById('open-envelope').addEventListener('click', () => {
    // Animate opening
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
});
