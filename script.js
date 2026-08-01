/* =========================================================
   TO BUSAYO, WITH LOVE — MAIN SCRIPT
   Every function below exists exactly once.
========================================================= */

/* ---------- CONFIG (edit these freely) ---------- */
const PASSWORD = "busayo23";           // change this to whatever password you want
const TOTAL_PHOTOS = 23;               // matches images/photo1.jpg ... photo23.jpg
const HEART_GAME_SECONDS = 60;

const REASONS = [
  "The way you laugh at your own jokes before you finish telling them.",
  "How you make every ordinary day feel like an occasion.",
  "Your patience, even when I don't deserve it.",
  "The way you say my name when you're excited about something.",
  "How safe I feel just being near you.",
  "Your kindness to people who can never repay you.",
  "The way you hum when you're cooking.",
  "How you remember the smallest things I mention in passing.",
  "Your courage to start over whenever life asks you to.",
  "The way you hold my hand without even thinking about it.",
  "How honest you are, even when it's hard.",
  "Your smile — it's genuinely my favourite thing in the world.",
  "The way you believe in me more than I believe in myself.",
  "How you turn bad days into inside jokes by night time.",
  "Your quiet strength that you never brag about.",
  "The way you care for everyone around you.",
  "How you make a house feel like home.",
  "Your curiosity — you ask the best questions.",
  "The way you dance when you think no one's watching.",
  "How you forgive so easily.",
  "Your ambition — watching you chase your dreams.",
  "The way your eyes light up over the smallest good news.",
  "Simply — you. All of you, exactly as you are.",
];

const SKY_MESSAGES = [
  "I love you more today than yesterday.",
  "You are my favourite person in every room.",
  "Every star reminds me of a reason to love you.",
  "You make my ordinary life feel like magic.",
  "I'm endlessly grateful for you.",
  "You are my favourite hello and hardest goodbye.",
  "With you, forever doesn't feel long enough.",
];

/* ---------- SCENE MANAGER ---------- */
const sceneOrder = [
  "scene-loading","scene-countdown","scene-birthday","scene-intro",
  "scene-password","scene-chest","scene-gallery","scene-projector",
  "scene-heartgame","scene-cakegame","scene-reasons","scene-mailbox",
  "scene-sky","scene-ending"
];

function goToScene(sceneId){
  sceneOrder.forEach(id => {
    document.getElementById(id).classList.remove("active");
  });
  document.getElementById(sceneId).classList.add("active");
  onSceneEnter(sceneId);
}

function onSceneEnter(sceneId){
  if(sceneId === "scene-countdown") runCountdown();
  if(sceneId === "scene-birthday") runBirthdayScene();
  if(sceneId === "scene-intro") runIntroScene();
  if(sceneId === "scene-gallery") buildGallery();
  if(sceneId === "scene-projector") runProjectorScene();
  if(sceneId === "scene-reasons") buildReasons();
  if(sceneId === "scene-sky") runSkyScene();
  if(sceneId === "scene-ending") runEndingScene();
}

/* ---------- SCENE 1: LOADING ---------- */
function runLoadingScene(){
  const fill = document.getElementById("loadingFill");
  requestAnimationFrame(() => { fill.style.width = "100%"; });
  setTimeout(() => goToScene("scene-countdown"), 3000);
}

/* ---------- SCENE 2: COUNTDOWN ---------- */
function runCountdown(){
  const el = document.getElementById("countdownNumber");
  const steps = ["3","2","1","❤️"];
  let i = 0;

  function showStep(){
    el.classList.remove("show");
    el.textContent = steps[i];
    void el.offsetWidth; // restart animation
    el.classList.add("show");
    i++;
    if(i < steps.length){
      setTimeout(showStep, 900);
    } else {
      setTimeout(() => goToScene("scene-birthday"), 1100);
    }
  }
  showStep();
}

/* ---------- SCENE 3: BIRTHDAY ---------- */
function runBirthdayScene(){
  const balloonField = document.getElementById("balloonField");
  const confettiField = document.getElementById("confettiField3");
  balloonField.innerHTML = "";
  confettiField.innerHTML = "";

  const balloonColors = ["#d4af37","#f0a8c4","#f6ecdd","#c98bab"];
  for(let i=0;i<14;i++){
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = Math.random()*100 + "%";
    b.style.background = balloonColors[Math.floor(Math.random()*balloonColors.length)];
    b.style.setProperty("--drift", (Math.random()*80-40) + "px");
    b.style.animationDuration = (7 + Math.random()*5) + "s";
    b.style.animationDelay = (Math.random()*4) + "s";
    balloonField.appendChild(b);
  }

  const confettiColors = ["#d4af37","#f0a8c4","#f6ecdd"];
  for(let i=0;i<40;i++){
    const c = document.createElement("div");
    c.className = "confetti-piece";
    c.style.left = Math.random()*100 + "%";
    c.style.background = confettiColors[Math.floor(Math.random()*confettiColors.length)];
    c.style.animationDuration = (3 + Math.random()*3) + "s";
    c.style.animationDelay = (Math.random()*3) + "s";
    confettiField.appendChild(c);
  }
}

function spawnConfettiBurst(container, count){
  const confettiColors = ["#d4af37","#f0a8c4","#f6ecdd"];
  for(let i=0;i<count;i++){
    const c = document.createElement("div");
    c.className = "confetti-piece";
    c.style.left = Math.random()*100 + "%";
    c.style.background = confettiColors[Math.floor(Math.random()*confettiColors.length)];
    c.style.animationDuration = (2.5 + Math.random()*2) + "s";
    container.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

/* ---------- SCENE 4: INTRO ---------- */
function runIntroScene(){
  setTimeout(() => goToScene("scene-password"), 4200);
}

/* ---------- SCENE 5: PASSWORD ---------- */
function checkPassword(){
  const input = document.getElementById("passwordInput");
  const card = document.getElementById("lockCard");
  const error = document.getElementById("lockError");
  const value = input.value.trim().toLowerCase();

  if(value === PASSWORD.toLowerCase()){
    card.classList.add("glow");
    error.classList.remove("show");
    setTimeout(() => goToScene("scene-chest"), 1000);
  } else {
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
    error.classList.add("show");
  }
}

/* ---------- SCENE 6: TREASURE CHEST ---------- */
function openChest(){
  const chest = document.getElementById("chestEl");
  if(chest.classList.contains("open")) return;
  chest.classList.add("open");

  const particlesField = document.getElementById("chestParticles");
  for(let i=0;i<30;i++){
    const p = document.createElement("div");
    p.className = "gold-particle";
    p.style.left = "50%";
    p.style.top = "45%";
    const angle = Math.random()*Math.PI*2;
    const dist = 80 + Math.random()*160;
    p.style.setProperty("--px", Math.cos(angle)*dist + "px");
    p.style.setProperty("--py", (Math.sin(angle)*dist - 60) + "px");
    particlesField.appendChild(p);
    setTimeout(() => p.remove(), 1300);
  }

  setTimeout(() => {
    const flash = document.getElementById("chestFlash");
    flash.classList.add("flash");
    setTimeout(() => flash.classList.remove("flash"), 700);
  }, 500);

  setTimeout(() => goToScene("scene-gallery"), 1700);
}

/* ---------- SCENE 7: MEMORY GALLERY ---------- */
function buildGallery(){
  const grid = document.getElementById("galleryGrid");
  if(grid.dataset.built) return;
  grid.dataset.built = "true";

  for(let i=1;i<=TOTAL_PHOTOS;i++){
    const p = document.createElement("div");
    p.className = "polaroid";
    p.style.setProperty("--rot", (Math.random()*16-8) + "deg");
    p.style.animationDelay = (i*0.04) + "s";
    const img = document.createElement("img");
    img.src = `images/photo${i}.jpg`;
    img.alt = `Memory ${i}`;
    img.loading = "lazy";
    img.onerror = function(){ this.style.background = "linear-gradient(135deg,#3a2f28,var(--pink))"; };
    p.appendChild(img);
    p.addEventListener("click", () => openPolaroidZoom(img.src));
    grid.appendChild(p);
  }
}

function openPolaroidZoom(src){
  const overlay = document.getElementById("polaroidZoomOverlay");
  const img = document.getElementById("polaroidZoomImg");
  img.src = src;
  overlay.classList.add("show");
}

function closePolaroidZoom(){
  document.getElementById("polaroidZoomOverlay").classList.remove("show");
}

/* ---------- SCENE 8: VINTAGE PROJECTOR ---------- */
function runProjectorScene(){
  const dustField = document.getElementById("dustField");
  const filmstrip = document.getElementById("filmstrip");
  const usImage = document.getElementById("usImage");
  dustField.innerHTML = "";
  filmstrip.innerHTML = "";
  usImage.classList.remove("show");

  for(let i=0;i<25;i++){
    const d = document.createElement("div");
    d.className = "dust-mote";
    d.style.left = Math.random()*100 + "%";
    d.style.animationDuration = (4 + Math.random()*5) + "s";
    d.style.animationDelay = (Math.random()*5) + "s";
    dustField.appendChild(d);
  }

  for(let i=1;i<=5;i++){
    const frame = document.createElement("img");
    frame.className = "frame";
    frame.src = `images/photo${i}.jpg`;
    frame.onerror = function(){ this.style.background = "linear-gradient(135deg,#3a2f28,var(--gold))"; };
    filmstrip.appendChild(frame);
  }

  setTimeout(() => usImage.classList.add("show"), 9200);
}

/* ---------- SCENE 9: HEART GAME ---------- */
let heartGameActive = false;
let heartGameScore = 0;
let heartGameTimeLeft = HEART_GAME_SECONDS;
let heartGameInterval = null;
let heartSpawnInterval = null;

function startHeartGame(){
  if(heartGameActive) return;
  heartGameActive = true;
  heartGameScore = 0;
  heartGameTimeLeft = HEART_GAME_SECONDS;
  document.getElementById("heartScore").textContent = "Score: 0";
  document.getElementById("heartTimer").textContent = "Time: " + heartGameTimeLeft;
  document.getElementById("heartGameResult").classList.remove("show");
  document.getElementById("startHeartGameBtn").style.display = "none";
  const field = document.getElementById("heartGameField");
  field.innerHTML = "";

  heartSpawnInterval = setInterval(spawnFallingHeart, 650);
  heartGameInterval = setInterval(() => {
    heartGameTimeLeft--;
    document.getElementById("heartTimer").textContent = "Time: " + heartGameTimeLeft;
    if(heartGameTimeLeft <= 0) endHeartGame();
  }, 1000);
}

function spawnFallingHeart(){
  const field = document.getElementById("heartGameField");
  if(!field.offsetWidth) return;
  const heart = document.createElement("div");
  heart.className = "falling-heart";
  heart.textContent = "❤️";
  heart.style.left = Math.random()*(field.offsetWidth-30) + "px";
  heart.style.animationDuration = (2 + Math.random()*1.5) + "s";
  heart.addEventListener("click", () => {
    heartGameScore++;
    document.getElementById("heartScore").textContent = "Score: " + heartGameScore;
    heart.remove();
  });
  heart.addEventListener("animationend", () => heart.remove());
  field.appendChild(heart);
}

function endHeartGame(){
  clearInterval(heartGameInterval);
  clearInterval(heartSpawnInterval);
  heartGameActive = false;
  document.getElementById("heartGameResult").classList.add("show");
  document.getElementById("startHeartGameBtn").style.display = "inline-block";
  document.getElementById("startHeartGameBtn").textContent = "Play Again";
  const field = document.getElementById("heartGameField");
  spawnConfettiBurst(field, 30);
}

/* ---------- SCENE 10: CAKE GAME ---------- */
const CAKE_DECORATIONS = [
  {emoji:"🕯️", label:"candle"},
  {emoji:"🕯️", label:"candle"},
  {emoji:"🕯️", label:"candle"},
  {emoji:"🍫", label:"chocolate"},
  {emoji:"🍫", label:"chocolate"},
  {emoji:"🌸", label:"flower"},
  {emoji:"🌸", label:"flower"},
  {emoji:"🍓", label:"strawberry"},
  {emoji:"🍓", label:"strawberry"},
];
let cakeDecosPlaced = 0;

function buildCakeGame(){
  const tray = document.getElementById("decorationTray");
  if(tray.dataset.built) return;
  tray.dataset.built = "true";
  cakeDecosPlaced = 0;

  CAKE_DECORATIONS.forEach((deco, index) => {
    const item = document.createElement("div");
    item.className = "deco-item";
    item.textContent = deco.emoji;
    item.draggable = true;
    item.dataset.index = index;
    item.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", index);
    });
    item.addEventListener("click", () => placeDecoRandom(item, deco));
    tray.appendChild(item);
  });

  const board = document.getElementById("cakeBoard");
  board.addEventListener("dragover", e => e.preventDefault());
  board.addEventListener("drop", e => {
    e.preventDefault();
    const index = e.dataTransfer.getData("text/plain");
    const item = tray.querySelector(`[data-index="${index}"]`);
    if(item && !item.classList.contains("placed")){
      const rect = board.getBoundingClientRect();
      placeDecoAt(item, CAKE_DECORATIONS[index], e.clientX-rect.left, e.clientY-rect.top);
    }
  });
}

function placeDecoRandom(item, deco){
  if(item.classList.contains("placed")) return;
  const board = document.getElementById("cakeBoard");
  const x = 20 + Math.random()*(board.offsetWidth-40);
  const y = 20 + Math.random()*(board.offsetHeight-40);
  placeDecoAt(item, deco, x, y);
}

function placeDecoAt(item, deco, x, y){
  item.classList.add("placed");
  const board = document.getElementById("cakeBoard");
  const placed = document.createElement("div");
  placed.className = "placed-deco";
  placed.textContent = deco.emoji;
  placed.style.left = Math.max(0,x-14) + "px";
  placed.style.top = Math.max(0,y-14) + "px";
  board.appendChild(placed);

  cakeDecosPlaced++;
  if(cakeDecosPlaced >= CAKE_DECORATIONS.length){
    setTimeout(() => {
      document.getElementById("cakeCompleteMsg").classList.add("show");
      spawnConfettiBurst(document.getElementById("scene-cakegame"), 30);
    }, 500);
  }
}

/* ---------- SCENE 11: 23 REASONS ---------- */
function buildReasons(){
  const grid = document.getElementById("envelopeGrid");
  if(grid.dataset.built) return;
  grid.dataset.built = "true";

  REASONS.forEach((reason, i) => {
    const env = document.createElement("div");
    env.className = "envelope";
    env.textContent = "✉️";
    env.style.animationDelay = (i*0.05) + "s";
    env.addEventListener("click", () => {
      env.classList.add("opened");
      showReason(reason);
    });
    grid.appendChild(env);
  });

  document.getElementById("goldenEnvelope").addEventListener("click", () => {
    showReason("Happy birthday, my love. Out of every reason above, the truest one is simply this: loving you is the easiest, best decision I make every single day.");
  }, {once:true});
}

function showReason(text){
  document.getElementById("reasonText").textContent = text;
  document.getElementById("reasonModal").classList.add("show");
}

function closeReasonModal(){
  document.getElementById("reasonModal").classList.remove("show");
}

/* ---------- SCENE 12: MAILBOX ---------- */
const LETTER_TEXT = "My dearest Busayo,\n\nToday isn't just another birthday, it's a celebration of you, of everything you are and everything you're becoming. I hope this little corner of the internet made you smile even for a moment.\n\nThank you for being exactly who you are.\n\nHappy Birthday, love.";

function openMailbox(){
  const mailboxWrap = document.getElementById("mailboxWrap");
  const letterWrap = document.getElementById("letterWrap");
  if(letterWrap.classList.contains("show")) return;
  mailboxWrap.style.display = "none";
  letterWrap.classList.add("show");
  typeLetterText();
}

function typeLetterText(){
  const el = document.getElementById("letterTyped");
  const signature = document.getElementById("letterSignature");
  el.textContent = "";
  let i = 0;
  function typeChar(){
    if(i < LETTER_TEXT.length){
      el.textContent += LETTER_TEXT.charAt(i);
      i++;
      setTimeout(typeChar, 22);
    } else {
      setTimeout(() => signature.classList.add("show"), 300);
    }
  }
  typeChar();
}

/* ---------- SCENE 13: MEMORY SKY ---------- */
function runSkyScene(){
  const starsField = document.getElementById("starsField");
  const heartsField = document.getElementById("floatingHeartsSky");
  const msg = document.getElementById("skyMessage");
  msg.classList.remove("show");

  if(!starsField.dataset.built){
    starsField.dataset.built = "true";
    for(let i=0;i<60;i++){
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random()*100 + "%";
      star.style.top = Math.random()*70 + "%";
      star.style.animationDelay = (Math.random()*2.4) + "s";
      star.addEventListener("click", () => {
        star.classList.add("tapped");
        const random = SKY_MESSAGES[Math.floor(Math.random()*SKY_MESSAGES.length)];
        msg.textContent = random;
        msg.classList.add("show");
      });
      starsField.appendChild(star);
    }
  }

  if(heartsSkyInterval) clearInterval(heartsSkyInterval);
  heartsSkyInterval = setInterval(() => {
    const h = document.createElement("div");
    h.className = "sky-heart";
    h.textContent = "❤️";
    h.style.left = Math.random()*100 + "%";
    h.style.animationDuration = (6 + Math.random()*4) + "s";
    heartsField.appendChild(h);
    setTimeout(() => h.remove(), 10000);
  }, 900);
}
let heartsSkyInterval = null;

/* ---------- SCENE 14: ENDING ---------- */
function runEndingScene(){
  const field = document.getElementById("endingHearts");
  field.innerHTML = "";
  for(let i=0;i<20;i++){
    const h = document.createElement("div");
    h.className = "sky-heart";
    h.textContent = "❤️";
    h.style.left = Math.random()*100 + "%";
    h.style.animationDuration = (5 + Math.random()*4) + "s";
    h.style.animationDelay = (Math.random()*3) + "s";
    field.appendChild(h);
  }
}

function restartExperience(){
  if(heartsSkyInterval) clearInterval(heartsSkyInterval);
  document.getElementById("loadingFill").style.width = "0%";
  goToScene("scene-loading");
  setTimeout(runLoadingScene, 50);
}

/* ---------- MUSIC ---------- */
function startMusic(){
  const music = document.getElementById("bgMusic");
  music.volume = 0.6;
  music.play().catch(() => { /* autoplay blocked until user gesture, this click counts */ });
}

/* ---------- EVENT WIRING ---------- */
document.addEventListener("DOMContentLoaded", () => {
  runLoadingScene();

  document.getElementById("startJourneyBtn").addEventListener("click", () => {
    startMusic();
    goToScene("scene-intro");
  });

  document.getElementById("passwordSubmit").addEventListener("click", checkPassword);
  document.getElementById("passwordInput").addEventListener("keydown", e => {
    if(e.key === "Enter") checkPassword();
  });

  document.getElementById("chestEl").addEventListener("click", openChest);

  document.getElementById("galleryNextBtn").addEventListener("click", () => goToScene("scene-projector"));
  document.getElementById("polaroidZoomOverlay").addEventListener("click", closePolaroidZoom);

  document.getElementById("projectorNextBtn").addEventListener("click", () => goToScene("scene-heartgame"));

  document.getElementById("startHeartGameBtn").addEventListener("click", startHeartGame);
  document.getElementById("heartGameNextBtn").addEventListener("click", () => goToScene("scene-cakegame"));

  buildCakeGame();
  document.getElementById("cakeNextBtn").addEventListener("click", () => goToScene("scene-reasons"));

  document.getElementById("reasonsNextBtn").addEventListener("click", () => goToScene("scene-mailbox"));
  document.getElementById("reasonCloseBtn").addEventListener("click", closeReasonModal);

  document.getElementById("mailboxEl").addEventListener("click", openMailbox);
  document.getElementById("mailboxNextBtn").addEventListener("click", () => goToScene("scene-sky"));

  document.getElementById("skyNextBtn").addEventListener("click", () => goToScene("scene-ending"));

  document.getElementById("restartBtn").addEventListener("click", restartExperience);
});
