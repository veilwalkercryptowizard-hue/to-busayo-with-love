/* ==========================================
   ELEMENTS
========================================== */

const screens = document.querySelectorAll(".screen");

const loadingScreen = document.getElementById("loadingScreen");
const countdownScreen = document.getElementById("countdownScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const introScreen = document.getElementById("introScreen");
const passwordScreen = document.getElementById("passwordScreen");
const treasureScreen = document.getElementById("treasureScreen");
const galleryScreen = document.getElementById("galleryScreen");
const projectorScreen = document.getElementById("projectorScreen");
const heartGameScreen = document.getElementById("heartGameScreen");
const cakeScreen = document.getElementById("cakeScreen");
const reasonsScreen = document.getElementById("reasonsScreen");
const mailboxScreen = document.getElementById("mailboxScreen");
const endingScreen = document.getElementById("endingScreen");

const loadingFill = document.getElementById("loadingFill");
const countNumber = document.getElementById("countNumber");

const music = document.getElementById("birthdayMusic");

/* ==========================================
   SHOW SCREEN
========================================== */

function showScreen(screen){

    screens.forEach(s=>{

        s.classList.remove("active");

    });

    screen.classList.add("active");

}

/* ==========================================
   START WEBSITE
========================================== */

window.onload=()=>{

    startLoading();

};

/* ==========================================
   LOADING
========================================== */

function startLoading(){

    let width=0;

    let loader=setInterval(()=>{

        width+=2;

        loadingFill.style.width=width+"%";

        if(width>=100){

            clearInterval(loader);

            startCountdown();

        }

    },40);

}

/* ==========================================
   COUNTDOWN
========================================== */

function startCountdown(){

    showScreen(countdownScreen);

    const numbers=["3","2","1"];

    let i=0;

    countNumber.innerHTML=numbers[i];

    const timer=setInterval(()=>{

        i++;

        if(i<numbers.length){

            countNumber.innerHTML=numbers[i];

        }else{

            clearInterval(timer);

            showWelcome();

        }

    },1000);

}

/* ==========================================
   WELCOME
========================================== */

function showWelcome(){

    showScreen(welcomeScreen);

    setTimeout(()=>{

        showBirthday();

    },2500);

}

/* ==========================================
   HAPPY BIRTHDAY
========================================== */

function showBirthday(){

    showScreen(birthdayScreen);

    createConfetti();

}

/* ==========================================
   BUTTON
========================================== */

document

.getElementById("beginJourney")

.addEventListener("click",()=>{

    music.play();

    showScreen(introScreen);

    setTimeout(()=>{

        showScreen(passwordScreen);

    },3000);

});

/* ==========================================
   PASSWORD
========================================== */

const correctPassword = "busayo23";

const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlockButton");
const error = document.getElementById("error");

unlockButton.addEventListener("click", () => {

    if (passwordInput.value === correctPassword) {

        error.innerHTML = "";

        showScreen(treasureScreen);

    } else {

        error.innerHTML = "Incorrect password ❤️";

    }

});

/* ==========================================
   TREASURE CHEST
========================================== */

const chest = document.getElementById("treasureChest");

document
.getElementById("openChest")
.addEventListener("click", () => {

    const lid = document.querySelector(".chestLid");

    lid.style.transform = "rotateX(-120deg)";

    setTimeout(() => {

        showScreen(galleryScreen);

        loadGallery();

    }, 1800);

});

/* ==========================================
   MEMORY GALLERY
========================================== */

const memoryDesk = document.getElementById("memoryDesk");

const memories = [

    {
        image:"images/photo1.jpg",
        caption:"One beautiful memory ❤️"
    },

    {
        image:"images/photo2.jpg",
        caption:"Your lovely smile 😊"
    },

    {
        image:"images/photo3.jpg",
        caption:"Moments I'll always cherish ❤️"
    },

    {
        image:"images/photo4.jpg",
        caption:"Forever beautiful 🤍"
    },

    {
        image:"images/photo5.jpg",
        caption:"My favourite person ❤️"
    },

    {
        image:"images/photo6.jpg",
        caption:"More memories together 📸"
    }

];

function loadGallery(){

    memoryDesk.innerHTML = "";

    memories.forEach(memory => {

        const card = document.createElement("div");

        card.className = "memoryPhoto";

        card.innerHTML = `

            <img src="${memory.image}">

            <div class="memoryCaption">

                ${memory.caption}

            </div>

        `;

        card.onclick = () => {

            openPhoto(memory.image, memory.caption);

        };

        memoryDesk.appendChild(card);

    });

}

/* ==========================================
   PHOTO MODAL
========================================== */

const photoModal = document.getElementById("photoModal");

const modalImage = document.getElementById("modalImage");

const modalCaption = document.getElementById("modalCaption");

document
.getElementById("closePhoto")
.addEventListener("click", () => {

    photoModal.style.display = "none";

});

function openPhoto(image, caption){

    modalImage.src = image;

    modalCaption.innerHTML = caption;

    photoModal.style.display = "flex";

}

/* ==========================================
   PROJECTOR
========================================== */

document
.getElementById("continueProjector")
.addEventListener("click", () => {

    showScreen(projectorScreen);

    startProjector();

});

const projectorImages = [

    "images/photo1.jpg",

    "images/photo2.jpg",

    "images/photo3.jpg",

    "images/photo4.jpg",

    "images/photo5.jpg",

    "images/photo6.jpg"

];

function startProjector(){

    const strip = document.getElementById("filmStrip");

    let index = 0;

    strip.innerHTML = `<img src="${projectorImages[index]}">`;

    const slide = setInterval(() => {

        index++;

        if(index >= projectorImages.length){

            clearInterval(slide);

            setTimeout(() => {

                showScreen(heartGameScreen);

                startHeartGame();

            },1500);

            return;

        }

        strip.innerHTML = `<img src="${projectorImages[index]}">`;

    },2000);

}

/* ==========================================
   HEART GAME
========================================== */

const heartCanvas = document.getElementById("heartCanvas");
const heartScore = document.getElementById("heartScore");
const heartTimer = document.getElementById("heartTimer");

let score = 0;
let timeLeft = 60;
let gameRunning = false;

function startHeartGame(){

    score = 0;
    timeLeft = 60;

    heartScore.innerHTML = score;
    heartTimer.innerHTML = timeLeft;

    gameRunning = true;

    spawnHearts();

    const timer = setInterval(()=>{

        timeLeft--;

        heartTimer.innerHTML = timeLeft;

        if(timeLeft<=0){

            clearInterval(timer);

            gameRunning=false;

            heartCanvas.innerHTML="";

            showScreen(cakeScreen);

        }

    },1000);

}

function spawnHearts(){

    if(!gameRunning) return;

    const heart=document.createElement("div");

    heart.className="fallingHeart";

    heart.innerHTML="❤️";

    heart.style.left=Math.random()*90+"%";

    heart.style.top="-40px";

    heartCanvas.appendChild(heart);

    let y=-40;

    const fall=setInterval(()=>{

        y+=5;

        heart.style.top=y+"px";

        if(y>550){

            clearInterval(fall);

            heart.remove();

        }

    },30);

    heart.onclick=()=>{

        score++;

        heartScore.innerHTML=score;

        clearInterval(fall);

        heart.remove();

    };

    setTimeout(spawnHearts,700);

}

/* ==========================================
   CAKE
========================================== */

const cakeTools=document.querySelectorAll(".cakeTool");
const cakeBase=document.getElementById("cakeBase");
const birthdayBanner=document.getElementById("birthdayBanner");

cakeTools.forEach(tool=>{

    tool.onclick=()=>{

        const deco=document.createElement("div");

        deco.innerHTML=tool.innerHTML;

        deco.style.position="absolute";
        deco.style.left=Math.random()*220+"px";
        deco.style.top=Math.random()*120+"px";
        deco.style.fontSize="30px";

        cakeBase.appendChild(deco);

    };

});

birthdayBanner.innerHTML="Happy Birthday Busayo ❤️";

setTimeout(()=>{

    showScreen(reasonsScreen);

    createReasons();

},8000);

/* ==========================================
   23 REASONS
========================================== */

const reasonsGrid=document.getElementById("reasonsGrid");

const reasons=[

"Your smile lights up every room.",
"You're kind.",
"You're thoughtful.",
"You're beautiful.",
"You're intelligent.",
"You're funny.",
"You're caring.",
"You're genuine.",
"You're inspiring.",
"You're calm.",
"You're supportive.",
"You're unique.",
"You're strong.",
"You're patient.",
"You're unforgettable.",
"You're elegant.",
"You're warm-hearted.",
"You're creative.",
"You're precious.",
"You're loved.",
"You're amazing.",
"You're enough.",
"And today is all about YOU ❤️"

];

function createReasons(){

    reasonsGrid.innerHTML="";

    reasons.forEach((text,index)=>{

        const card=document.createElement("div");

        card.className="reasonCard";

        card.innerHTML=`<h3>${index+1}</h3><p>${text}</p>`;

        reasonsGrid.appendChild(card);

    });

}

/* ==========================================
   LETTER
========================================== */

document.getElementById("continueJourney").onclick=()=>{

    document.getElementById("letterPaper").style.display="block";

    typeLetter();

};

const message=`Happy Birthday Busayo ❤️

I don't know what the future holds,
but I hope it brings you endless joy.

Thank you for existing.

Thank you for being you.

May your heart always find peace,
your dreams always find wings,
and your smile never fade.

Today is your day.

Happy Birthday.

— Veilwalker 🤍`;

function typeLetter(){

    const target=document.getElementById("typedLetter");

    target.innerHTML="";

    let i=0;

    const typing=setInterval(()=>{

        target.innerHTML+=message.charAt(i);

        i++;

        if(i>=message.length){

            clearInterval(typing);

            setTimeout(()=>{

                showScreen(endingScreen);

            },3000);

        }

    },40);

}

/* ==========================================
   RESTART
========================================== */

document
.getElementById("restartJourney")
.addEventListener("click",()=>{

    location.reload();

});

/* ==========================================
   CONFETTI
========================================== */

function createConfetti(){

    const layer=document.getElementById("confettiLayer");

    for(let i=0;i<120;i++){

        const piece=document.createElement("div");

        piece.style.position="absolute";
        piece.style.width="8px";
        piece.style.height="14px";
        piece.style.left=Math.random()*100+"%";
        piece.style.top="-20px";
        piece.style.background=`hsl(${Math.random()*360},90%,60%)`;
        piece.style.animation=`float ${3+Math.random()*4}s linear infinite`;

        layer.appendChild(piece);

    }

}

console.log("❤️ Birthday Website Loaded Successfully ❤️");
