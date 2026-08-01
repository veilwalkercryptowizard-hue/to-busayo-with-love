/*==================================================
TO BUSAYO WITH LOVE
SCRIPT.JS
==================================================*/

/*==========================================
GLOBAL VARIABLES
==========================================*/

const screens = document.querySelectorAll(".screen");

const music =
document.getElementById("birthdayMusic");

const pageTurn =
document.getElementById("pageTurn");

const memoryFlash =
document.getElementById("memoryFlash");

let currentScreen = 0;

let musicStarted = false;

/*==========================================
HELPER FUNCTIONS
==========================================*/

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

function showScreen(id){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    document
    .getElementById(id)
    .classList
    .add("active");

}

function fadeFlash(){

    memoryFlash.classList.add("show");

    setTimeout(()=>{

        memoryFlash.classList.remove("show");

    },700);

}

function pageFlip(callback){

    pageTurn.classList.add("turn");

    setTimeout(()=>{

        if(callback){

            callback();

        }

    },550);

    setTimeout(()=>{

        pageTurn.classList.remove("turn");

    },1100);

}

/*==========================================
MUSIC
==========================================*/

function startMusic(){

    if(musicStarted) return;

    music.volume = .45;

    music.play();

    musicStarted = true;

}

/*==========================================
LOADING
==========================================*/

window.addEventListener("load",()=>{

    startLoading();

});

async function startLoading(){

    showScreen("loadingScreen");

    await sleep(3000);

    startCountdown();

}

/*==========================================
COUNTDOWN
==========================================*/

async function startCountdown(){

    showScreen("countdownScreen");

    const number =

    document.getElementById("countNumber");

    for(let i=3;i>=1;i--){

        number.textContent=i;

        number.animate([

        {

        transform:"scale(.5)",

        opacity:0

        },

        {

        transform:"scale(1)",

        opacity:1

        }

        ],{

        duration:700

        });

        await sleep(1000);

    }

    number.textContent="❤️";

    await sleep(900);

    birthdayScreen();

}

/*==========================================
BIRTHDAY
==========================================*/

async function birthdayScreen(){

    showScreen("birthdayScreen");

    createBalloons();

}

/*==========================================
BALLOONS
==========================================*/

function createBalloons(){

    const area =

    document.getElementById("balloons");

    const colors=[

    "#FF6B6B",

    "#FFD93D",

    "#6BCB77",

    "#4D96FF",

    "#FF74B1",

    "#A66CFF"

    ];

    setInterval(()=>{

        const balloon=

        document.createElement("div");

        balloon.className="balloon";

        balloon.style.left=

        Math.random()*100+"%";

        balloon.style.background=

        colors[

        Math.floor(

        Math.random()*colors.length

        )

        ];

        balloon.style.animationDuration=

        8+

        Math.random()*6+

        "s";

        area.appendChild(balloon);

        setTimeout(()=>{

            balloon.remove();

        },15000);

    },450);

}

/*==========================================
START BUTTON
==========================================*/

document

.getElementById("beginSurprise")

.addEventListener("click",()=>{

    startMusic();

    pageFlip(()=>{

        showIntro();

    });

});

/*==========================================
INTRO
==========================================*/

async function showIntro(){

    showScreen("introScreen");

    await sleep(4500);

    pageFlip(()=>{

        showPassword();

    });

}

/*==========================================
PASSWORD
==========================================*/

const unlock=

document.getElementById(

"unlockButton"

);

unlock.onclick=checkPassword;

function checkPassword(){

const input=

document.getElementById(

"password"

);

const card=

document.querySelector(

".passwordCard"

);

const error=

document.getElementById(

"error"

);

/*
CHANGE THIS PASSWORD
TO WHATEVER YOU WANT
*/

const correctPassword=

"busayo";

if(

input.value

.trim()

.toLowerCase()

===

correctPassword

){

card.classList.add(

"success"

);

error.textContent="";

setTimeout(()=>{

pageFlip(()=>{

showTreasure();

});

},800);

}

else{

card.classList.add(

"shake"

);

error.textContent=

"Wrong password ❤️";

setTimeout(()=>{

card.classList.remove(

"shake"

);

},600);

}

}

/*==========================================
TREASURE
==========================================*/

function showTreasure(){

    showScreen("chapter2");

}

/*==========================================
TREASURE CHEST ENGINE
==========================================*/

const chest =
document.getElementById("treasureChest");

const openChest =
document.getElementById("openChest");

let chestOpened=false;

openChest.addEventListener("click",openTreasure);

async function openTreasure(){

if(chestOpened) return;

chestOpened=true;

openChest.disabled=true;

chest.classList.add("open");

createGoldExplosion();

createGoldenDust();

await sleep(1800);

fadeFlash();

await sleep(900);

pageFlip(()=>{

showMemoryDesk();

});

}

/*==========================================
GOLD EXPLOSION
==========================================*/

function createGoldExplosion(){

for(let i=0;i<120;i++){

const particle=

document.createElement("div");

particle.className="goldParticle";

particle.style.left="50%";

particle.style.top="52%";

particle.style.setProperty(

"--x",

(Math.random()-0.5)*900+"px"

);

particle.style.setProperty(

"--y",

Math.random()*800+"px"

);

particle.style.animationDuration=

1+

Math.random()+"s";

document.body.appendChild(particle);

setTimeout(()=>{

particle.remove();

},2200);

}

}

/*==========================================
GOLD DUST
==========================================*/

function createGoldenDust(){

for(let i=0;i<60;i++){

const dust=

document.createElement("div");

dust.className="goldenDust";

dust.style.left=

Math.random()*100+"vw";

dust.style.top=

Math.random()*100+"vh";

dust.style.animationDuration=

5+

Math.random()*6+

"s";

document.body.appendChild(dust);

setTimeout(()=>{

dust.remove();

},12000);

}

}

/*==========================================
MEMORY DESK
==========================================*/

const memories=[

{

image:"images/photo1.jpg",

title:"A Beautiful Beginning",

text:"Every story has a first page."

},

{

image:"images/photo2.jpg",

title:"Your Smile",

text:"It lights up everything."

},

{

image:"images/photo4.jpg",

title:"Special Moments",

text:"The little moments matter."

},

{

image:"images/photo5.jpg",

title:"Joy",

text:"Happiness looks good on you."

},

{

image:"images/photo6.jpg",

title:"Laughter",

text:"One of my favourite sounds."

},

{

image:"images/photo7.jpg",

title:"Unforgettable",

text:"Some memories never fade."

},

{

image:"images/photo8.jpg",

title:"Beautiful Soul",

text:"That's who you are."

},

{

image:"images/photo10.jpg",

title:"Adventure",

text:"More memories await."

},

{

image:"images/photo12.jpg",

title:"Grateful",

text:"Thank you for existing."

},

{

image:"images/photo13.jpg",

title:"Cherished",

text:"Always."

},

{

image:"images/photo14.jpg",

title:"Forever",

text:"One photo, countless emotions."

}

];

/*==========================================
SHOW MEMORY DESK
==========================================*/

async function showMemoryDesk(){

showScreen("chapter3");

const desk=

document.getElementById("memoryDesk");

desk.innerHTML="";

for(let i=0;i<memories.length;i++){

await sleep(450);

dropPhoto(

desk,

memories[i],

i

);

}

await sleep(1800);

showDeskNote();

}

/*==========================================
DROP PHOTO
==========================================*/

function dropPhoto(

desk,

memory,

index

){

const card=

document.createElement("div");

card.className=

"polaroid";

card.style.left=

80+

(index%4)*250+

"px";

card.style.top=

60+

Math.floor(index/4)*220+

"px";

card.style.setProperty(

"--rotation",

(Math.random()*18-9)+"deg"

);

card.innerHTML=`

<img src="${memory.image}">

<h3>${memory.title}</h3>

<p>${memory.text}</p>

`;

desk.appendChild(card);

requestAnimationFrame(()=>{

card.classList.add(

"show",

"drop"

);

});

card.addEventListener(

"click",

()=>{

zoomPhoto(card);

}

);

}

/*==========================================
ZOOM PHOTO
==========================================*/

function zoomPhoto(card){

document

.querySelectorAll(

".polaroid"

)

.forEach(photo=>{

photo.classList.remove(

"zoomed"

);

});

card.classList.add(

"zoomed"

);

setTimeout(()=>{

card.classList.remove(

"zoomed"

);

},2200);

}

/*==========================================
NOTE
==========================================*/

function showDeskNote(){

const note=

document.createElement("div");

note.className="memoryNote";

note.innerHTML=`

<h2>🤍</h2>

<p>

Every photograph tells a story...

but my favourite one

will always be the one

that has you in it.

</p>

<button

class="primaryButton"

id="continueProjector"

>

Continue

</button>

`;

document

.getElementById(

"memoryDesk"

)

.appendChild(note);

requestAnimationFrame(()=>{

note.style.opacity=1;

});

document

.getElementById(

"continueProjector"

)

.onclick=()=>{

pageFlip(()=>{

showProjector();

});

};

}

/*==========================================
PROJECTOR
==========================================*/

function showProjector(){

    showScreen("chapter4");

    const strip =
    document.getElementById("filmStrip");

    const final =
    document.getElementById("finalFrame");

    strip.innerHTML = "";

    final.innerHTML = "";

    createDust();

    buildFilmStrip(strip);

}

/*==========================================
FILM STRIP
==========================================*/

function buildFilmStrip(strip){

    memories.forEach((memory,index)=>{

        const frame = document.createElement("div");

        frame.className="filmFrame";

        frame.innerHTML=`

        <img src="${memory.image}">

        <p>${memory.text}</p>

        `;

        strip.appendChild(frame);

    });

    autoScrollFilm(strip);

}

/*==========================================
AUTO SCROLL
==========================================*/

async function autoScrollFilm(strip){

    let position = 0;

    const distance = strip.scrollWidth;

    while(position < distance){

        strip.scrollLeft = position;

        position += 3;

        await sleep(16);

    }

    await sleep(1200);

    revealUsPhoto();

}

/*==========================================
PROJECTOR DUST
==========================================*/

function createDust(){

    for(let i=0;i<120;i++){

        const dust = document.createElement("div");

        dust.className="dust";

        dust.style.left=Math.random()*100+"%";

        dust.style.top=Math.random()*100+"%";

        dust.style.animationDuration=
        5+Math.random()*8+"s";

        document
        .getElementById("filmProjector")
        .appendChild(dust);

    }

}

/*==========================================
US PHOTO
==========================================*/

function revealUsPhoto(){

    const final =
    document.getElementById("finalFrame");

    final.innerHTML=`

    <img src="images/us.jpg">

    <h2>

        My Favourite Memory ❤️

    </h2>

    <p>

        Out of every picture...

        every smile...

        every beautiful moment...

        this one will always mean

        the most to me.

    </p>

    <button

    id="continueGames"

    class="primaryButton"

    >

    Continue

    </button>

    `;

    final.classList.add("show");

    document

    .getElementById("continueGames")

    .onclick=()=>{

        pageFlip(()=>{

            startHeartGame();

        });

    };

}

/*==========================================
FILM GRAIN
==========================================*/

const grain=document.createElement("div");

grain.className="filmGrain";

document

.getElementById("filmProjector")

.appendChild(grain);

/*==========================================
HEART GAME
==========================================*/

let heartScore = 0;
let gameTime = 60;
let gameRunning = false;
let heartInterval;
let timerInterval;

function startHeartGame(){

    showScreen("chapter5");

    heartScore = 0;
    gameTime = 60;
    gameRunning = true;

    document.getElementById("heartScore").textContent = heartScore;
    document.getElementById("heartTimer").textContent = gameTime;

    const canvas = document.getElementById("heartCanvas");
    canvas.innerHTML = "";

    spawnHeart();

    heartInterval = setInterval(spawnHeart, 600);

    timerInterval = setInterval(()=>{

        gameTime--;

        document.getElementById("heartTimer").textContent = gameTime;

        if(gameTime<=0){

            endHeartGame();

        }

    },1000);

}

/*==========================================
SPAWN HEART
==========================================*/

function spawnHeart(){

    if(!gameRunning) return;

    const canvas = document.getElementById("heartCanvas");

    const heart = document.createElement("div");

    heart.className = "catchHeart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random()*90 + "%";

    heart.style.animationDuration =
    3 + Math.random()*3 + "s";

    canvas.appendChild(heart);

    heart.onclick = ()=>{

        heart.remove();

        heartScore++;

        document.getElementById("heartScore").textContent = heartScore;

        showCombo(heart);

    };

    setTimeout(()=>{

        heart.remove();

    },7000);

}

/*==========================================
COMBO TEXT
==========================================*/

function showCombo(target){

    const combo = document.createElement("div");

    combo.className="comboText";

    combo.innerHTML="+1 ❤️";

    combo.style.left = target.style.left;

    combo.style.top = target.offsetTop+"px";

    document
    .getElementById("heartCanvas")
    .appendChild(combo);

    setTimeout(()=>{

        combo.remove();

    },1000);

}

/*==========================================
END HEART GAME
==========================================*/

function endHeartGame(){

    clearInterval(timerInterval);

    clearInterval(heartInterval);

    gameRunning=false;

    createConfetti();

    setTimeout(()=>{

        pageFlip(()=>{

            startCakeGame();

        });

    },2500);

}

/*==========================================
CONFETTI
==========================================*/

function createConfetti(){

    for(let i=0;i<180;i++){

        const piece = document.createElement("div");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"vw";

        piece.style.background=

        `hsl(${Math.random()*360},90%,60%)`;

        piece.style.animationDuration=

        3+Math.random()*3+"s";

        document.body.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },6000);

    }

}

/*==========================================
CAKE GAME
==========================================*/

const cakeDecorations=[

"🍓",

"🍒",

"🕯",

"🎀",

"🌸",

"🍫",

"🍬",

"❤️"

];

let placedDecorations=0;

function startCakeGame(){

    showScreen("chapter6");

    placedDecorations=0;

    const tools=

    document.getElementById("cakeTools");

    const cake=

    document.getElementById("cakeBase");

    const banner=

    document.getElementById("birthdayBanner");

    tools.innerHTML="";

    cake.innerHTML="";

    banner.classList.remove("show");

    cakeDecorations.forEach(icon=>{

        const item=

        document.createElement("div");

        item.className="cakeItem";

        item.innerHTML=icon;

        item.onclick=()=>{

            placeDecoration(icon);

        };

        tools.appendChild(item);

    });

}

/*==========================================
PLACE DECORATION
==========================================*/

function placeDecoration(icon){

    const cake=

    document.getElementById("cakeBase");

    const deco=

    document.createElement("div");

    deco.innerHTML=icon;

    deco.style.position="absolute";

    deco.style.left=

    Math.random()*75+10+"%";

    deco.style.top=

    Math.random()*75+10+"%";

    deco.style.fontSize="34px";

    cake.appendChild(deco);

    placedDecorations++;

    if(icon==="🕯"){

        const flame=

        document.createElement("div");

        flame.className="candleFlame";

        flame.style.left=deco.style.left;

        flame.style.top=

        `calc(${deco.style.top} - 18px)`;

        cake.appendChild(flame);

    }

    if(placedDecorations>=8){

        finishCake();

    }

}

/*==========================================
FINISH CAKE
==========================================*/

function finishCake(){

    document

    .getElementById("cakeBase")

    .classList.add("finished");

    const banner=

    document.getElementById("birthdayBanner");

    banner.innerHTML=`

    <h1>Happy Birthday ❤️</h1>

    <h2>Your cake is ready!</h2>

    <p>

    Beautiful... just like the person

    this surprise was made for.

    </p>

    <button

    id="continueReasons"

    class="primaryButton">

    Continue

    </button>

    `;

    banner.classList.add("show");

    document

    .getElementById("continueReasons")

    .onclick=()=>{

        pageFlip(()=>{

            showReasons();

        });

    };

}

/*==========================================
23 REASONS
==========================================*/

const reasons = [

"Your smile brightens every room.",
"Your kindness inspires people.",
"You make ordinary moments special.",
"You are beautifully unique.",
"Your laugh is contagious.",
"You care deeply about others.",
"You have a beautiful heart.",
"You make life more colorful.",
"You are stronger than you know.",
"You always try your best.",
"You deserve endless happiness.",
"You are incredibly thoughtful.",
"You make memories unforgettable.",
"You bring peace wherever you go.",
"You make people feel appreciated.",
"You have amazing dreams.",
"You are full of potential.",
"You are wonderfully genuine.",
"You make me smile too.",
"You deserve to be celebrated.",
"You are loved more than you realize.",
"You are God's beautiful masterpiece.",
"And simply... because you're Busayo. ❤️"

];

function showReasons(){

    showScreen("chapter7");

    const grid =
    document.getElementById("reasonsGrid");

    grid.innerHTML = "";

    reasons.forEach((reason,index)=>{

        const envelope =
        document.createElement("div");

        envelope.className="reasonEnvelope";

        if(index===22){

            envelope.classList.add("gold");

        }

        envelope.innerHTML=`

        <div class="body"></div>

        <div class="flap"></div>

        <div class="seal"></div>

        <div class="reasonLetter">

        ${reason}

        </div>

        <div class="reasonNumber">

        ${index+1}

        </div>

        `;

        envelope.onclick=()=>{

            openReason(envelope);

        };

        grid.appendChild(envelope);

    });

}

/*==========================================
OPEN ENVELOPE
==========================================*/

let openedReasons = 0;

function openReason(card){

    if(card.classList.contains("open")) return;

    card.classList.add("open");

    openedReasons++;

    createReasonSpark();

    if(openedReasons===23){

        setTimeout(()=>{

            pageFlip(()=>{

                showMailbox();

            });

        },2500);

    }

}

/*==========================================
SPARKLES
==========================================*/

function createReasonSpark(){

    for(let i=0;i<20;i++){

        const spark =
        document.createElement("div");

        spark.className="reasonSpark";

        spark.style.left=
        Math.random()*100+"vw";

        spark.style.top=
        Math.random()*100+"vh";

        document.body.appendChild(spark);

        setTimeout(()=>{

            spark.remove();

        },900);

    }

}

/*==========================================
MAILBOX
==========================================*/

function showMailbox(){

    showScreen("chapter8");

    const mailbox =
    document.getElementById("mailbox");

    mailbox.onclick=openMailbox;

}

/*==========================================
OPEN MAILBOX
==========================================*/

async function openMailbox(){

    document
    .querySelector(".mailFlag")
    .classList
    .add("up");

    document
    .getElementById("letterEnvelope")
    .classList
    .add("show");

    await sleep(1800);

    document
    .getElementById("letterPaper")
    .classList
    .add("show");

    typeLetter();

}

/*==========================================
LETTER
==========================================*/

const finalLetter = `

Happy Birthday Busayo ❤️

I honestly don't know if words will ever
be enough to explain how special you are.

This little website isn't just code.

It's time...
effort...
thought...
and appreciation wrapped into something
I hope you'll remember.

Every page you've gone through
was made with one purpose:

To make you smile.

Life will keep moving.

People will change.

Moments will pass.

But I hope today reminds you
that you are appreciated,
valued,
and celebrated.

Never stop being the wonderful person
you already are.

May this new year bring peace,
joy,
growth,
answered prayers,
beautiful surprises,
and countless reasons to smile.

Happy Birthday once again.

❤️
`;

async function typeLetter(){

    const output =
    document.getElementById("typedLetter");

    output.innerHTML="";

    for(let i=0;i<finalLetter.length;i++){

        output.innerHTML+=finalLetter.charAt(i);

        await sleep(32);

    }

    output.classList.add("finished");

    document
    .getElementById("signature")
    .style.opacity=1;

}

/*==========================================
CONTINUE
==========================================*/

document

.getElementById("continueJourney")

.onclick=()=>{

pageFlip(()=>{

showEnding();

});

};

/*==========================================
CHAPTER 9
MEMORY SKY
==========================================*/

const skyMemories = [

"You deserve every beautiful thing life has to offer. ✨",

"May your smile never fade. ❤️",

"Thank you for being you.",

"Today is all about celebrating you.",

"Keep shining brighter every year. 🌙",

"I hope all your dreams come true.",

"You are deeply appreciated.",

"You are unforgettable.",

"You make the world a little brighter."

];

function showEnding(){

    showScreen("endingPage");

    createStars();

    createMoonHearts();

    shootingStarLoop();

    showFinalWords();

}

/*==========================================
STARS
==========================================*/

function createStars(){

    const sky=document.getElementById("memorySky");

    sky.innerHTML="";

    for(let i=0;i<120;i++){

        const star=document.createElement("div");

        star.className="memoryStar";

        star.style.left=Math.random()*100+"%";

        star.style.top=Math.random()*100+"%";

        star.style.animationDelay=
        Math.random()*4+"s";

        star.onclick=()=>{

            showMemoryPopup(

            star,

            skyMemories[

            Math.floor(

            Math.random()*skyMemories.length

            )]

            );

        };

        sky.appendChild(star);

    }

}

/*==========================================
STAR POPUP
==========================================*/

function showMemoryPopup(star,text){

    const popup=document.createElement("div");

    popup.className="starMemory";

    popup.innerHTML=text;

    popup.style.left=star.style.left;

    popup.style.top=star.style.top;

    document

    .getElementById("memorySky")

    .appendChild(popup);

    setTimeout(()=>{

        popup.remove();

    },3500);

}

/*==========================================
SHOOTING STAR
==========================================*/

function shootingStarLoop(){

    setInterval(()=>{

        const star=

        document.createElement("div");

        star.className="shootingStar";

        star.style.left="-250px";

        star.style.top=

        Math.random()*300+"px";

        document

        .getElementById("memorySky")

        .appendChild(star);

        setTimeout(()=>{

            star.remove();

        },2500);

    },5000);

}

/*==========================================
FLOATING HEARTS
==========================================*/

function createMoonHearts(){

    setInterval(()=>{

        const heart=

        document.createElement("div");

        heart.className="finalHeart";

        heart.innerHTML="❤️";

        heart.style.left=

        Math.random()*100+"vw";

        heart.style.animationDuration=

        12+

        Math.random()*8+

        "s";

        document

        .getElementById("memorySky")

        .appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },20000);

    },900);

}

/*==========================================
FINAL WORDS
==========================================*/

async function showFinalWords(){

    await sleep(3500);

    const words=

    document.getElementById("finalWords");

    words.classList.add("show");

    words.innerHTML=`

    <h1>

    Happy Birthday

    Busayo ❤️

    </h1>

    <button

    class="primaryButton"

    id="restartJourney"

    >

    Begin Again

    </button>

    `;

    document

    .getElementById("restartJourney")

    .onclick=restartJourney;

}

/*==========================================
RESTART
==========================================*/

function restartJourney(){

    location.reload();

}

/*==========================================
END OF SCRIPT
==========================================*/

console.log(

"❤️ Happy Birthday Busayo ❤️"

);
