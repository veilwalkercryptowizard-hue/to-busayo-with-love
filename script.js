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

  const gotoPage = (index) => {
    if (index >= 0 && index < pages.length) {
      currentPageIndex = index;
      showPage(pages[currentPageIndex]);
    }
  };

  const loadingScreen = document.getElementById('loading-screen');

  // Animate loading bar
  const progressBar = document.querySelector('.loading-progress');

  // Start the loading animation
  setTimeout(() => {
    // Animate progress bar
    progressBar.style.animationPlayState = 'running';

    // After 3 seconds, proceed
    setTimeout(() => {
      loadingScreen.classList.remove('active');
      gotoPage(1); // countdown
      startCountdown();
    }, 3500);
  }, 500);

  // Countdown
  const countdownNumbers = ['3', '2', '1'];
  const countdownNumberEl = document.getElementById('countdown-number');
  let countdownIdx = 0;

  const startCountdown = () => {
    if (countdownIdx < countdownNumbers.length) {
      countdownNumberEl.textContent = countdownNumbers[countdownIdx];
      countdownNumberEl.classList.remove('animate');
      // Animate
      setTimeout(() => {
        countdownNumberEl.classList.add('animate');
      }, 10);
      countdownIdx++;
      setTimeout(() => {
        startCountdown();
      }, 1500);
    } else {
      // Proceed to birthday reveal
      gotoPage(2);
      startBirthdayAnimation();
    }
  };

  // Birthday animation
  const startBirthdayAnimation = () => {
    const reveal = document.getElementById('birthday-reveal');
    reveal.classList.add('active');

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
    // Trigger music on start
    document.getElementById('start-journey').addEventListener('click', () => {
      document.getElementById('bg-music').play();
    });
  };

  // Button event handlers
  document.getElementById('start-journey').addEventListener('click', () => {
    gotoPage(3);
  });

  document.getElementById('to-cover-next').addEventListener('click', () => {
    gotoPage(4);
  });

  // Password logic
  document.getElementById('unlock-btn').addEventListener('click', () => {
    const input = document.getElementById('password-input');
    const password = input.value.trim();
    if (password === 'secret123') {
      gotoPage(5);
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
    document.getElementById('chest').classList.add('open');
    setTimeout(() => {
      gotoPage(6);
      initMemoryBook();
    }, 1000);
  });

  // Memory Book setup
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
    const pagesData = [
      { img: 'images/photo1.jpg', caption: 'First Memory' },
      { img: 'images/photo2.jpg', caption: 'Laughs' },
      { img: 'images/photo4.jpg', caption: 'Adventures' },
      { img: 'images/photo5.jpg', caption: 'Love' },
      { img: 'images/photo6.jpg', caption: 'Joy' },
      { img: 'images/photo7.jpg', caption: 'Cherished' },
      { img: 'images/photo8.jpg', caption: 'Moments' },
      { img: 'images/photo10.jpg', caption: 'Forever' },
      { img: 'images/photo12.jpg', caption: 'Memories' },
      { img: 'images/photo13.jpg', caption: 'Sweetness' },
      { img: 'images/photo14.jpg', caption: 'The Best' }
    ];
    pagesData.forEach((p, i) => {
      const pDiv = document.createElement('div');
      pDiv.className = 'page';
      pDiv.innerHTML = `
        <img src="${p.img}" class="page-img" />
        <div class="caption">${p.caption}</div>
      `;
      if (i !== 0) pDiv.style.display = 'none';
      bookDiv.appendChild(pDiv);
    });
    showMemoryPage(0);
  };

  const showMemoryPage = (index) => {
    const allPages = document.querySelectorAll('.page');
    allPages.forEach((p, i) => {
      p.style.display = i === index ? 'block' : 'none';
    });
  };

  document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < 10) {
      currentPage++;
      showMemoryPage(currentPage);
    }
  });
  document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      showMemoryPage(currentPage);
    }
  });

  // After last photo
  document.getElementById('to-final').addEventListener('click', () => {
    gotoPage(13);
  });

  // Moon scene
  document.getElementById('to-final-message').addEventListener('click', () => {
    gotoPage(14);
  });

  // Show Love message
  document.getElementById('reveal-love').addEventListener('click', () => {
    gotoPage(15);
  });

  // Restart
  document.getElementById('restart').addEventListener('click', () => {
    window.location.reload();
  });

  // Additional animation for moon scene
  document.getElementById('to-final-message').addEventListener('click', () => {
    // No additional logic, just transition
  });
});
