/*====================================================
TO BUSAYO WITH LOVE
SCRIPT.JS
Version 1.0
====================================================*/

"use strict";

/*====================================================
GLOBAL VARIABLES
====================================================*/

let currentChapter = 0;

let currentMemory = 0;

let openedReasons = 0;

let heartScore = 0;

let cakeFinished = false;

let musicStarted = false;

let typingFinished = false;

let saveKey = "busayoBirthdayJourney";

/*====================================================
ELEMENTS
====================================================*/

const audio = document.getElementById("backgroundMusic");

const loadingScreen =
document.getElementById("loadingScreen");

const countdownScreen =
document.getElementById("countdownScreen");

const birthdayScreen =
document.getElementById("birthdayScreen");

const introScreen =
document.getElementById("introScreen");

const passwordPage =
document.getElementById("passwordPage");

const passwordInput =
document.getElementById("password");

const unlockButton =
document.getElementById("unlockButton");

const error =
document.getElementById("error");

const screens =
document.querySelectorAll(".screen");

/*====================================================
HELPERS
====================================================*/

function hideAllScreens(){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

}

function showScreen(id){

    hideAllScreens();

    document
    .getElementById(id)
    .classList
    .add("active");

}

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

/*====================================================
MUSIC
====================================================*/

function startMusic(){

    if(musicStarted) return;

    musicStarted=true;

    audio.volume=0;

    audio.play();

    let volume=0;

    const fade=setInterval(()=>{

        volume+=0.02;

        audio.volume=Math.min(volume,0.45);

        if(volume>=0.45){

            clearInterval(fade);

        }

    },200);

}

/*====================================================
SAVE
====================================================*/

function saveProgress(){

    const data={

        chapter:currentChapter,

        reasons:openedReasons,

        memory:currentMemory

    };

    localStorage.setItem(

        saveKey,

        JSON.stringify(data)

    );

}

function loadProgress(){

    const data=

    localStorage.getItem(saveKey);

    if(!data) return;

    const progress=

    JSON.parse(data);

    currentChapter=

    progress.chapter;

    currentMemory=

    progress.memory;

    openedReasons=

    progress.reasons;

}

/*====================================================
RESTART
====================================================*/

function restartJourney(){

    localStorage.removeItem(saveKey);

    location.reload();

}

/*====================================================
INTRO SEQUENCE
====================================================*/

async function startExperience(){

    showScreen("loadingScreen");

    await sleep(3000);

    showScreen("countdownScreen");

    await countdown();

    showScreen("birthdayScreen");

    launchBirthday();

    await sleep(5000);

    showScreen("introScreen");

    await sleep(3000);

    showScreen("passwordPage");

}

window.onload=()=>{

    loadProgress();

    startExperience();

};

/*====================================================
COUNTDOWN
====================================================*/

async function countdown(){

    const number=

    document.getElementById("countdownNumber");

    for(let i=3;i>=1;i--){

        number.textContent=i;

        await sleep(1000);

    }

    number.textContent="🎉";

}

/*====================================================
BALLOONS
====================================================*/

function launchBirthday(){

    const container=

    document.getElementById("balloons");

    if(!container) return;

    for(let i=0;i<30;i++){

        const balloon=

        document.createElement("div");

        balloon.className="balloon";

        balloon.style.left=

        Math.random()*100+"%";

        balloon.style.animationDuration=

        8+Math.random()*8+"s";

        balloon.style.background=

        `hsl(${Math.random()*360},80%,75%)`;

        container.appendChild(balloon);

    }

}

/*====================================================
PASSWORD SYSTEM
====================================================*/

function validatePassword(){

    const entered =

    passwordInput.value

    .trim()

    .toLowerCase();

    if(entered===PASSWORD){

        unlockSuccess();

    }else{

        unlockFailure();

    }

}

/*====================================================
BUTTON
====================================================*/

unlockButton.addEventListener(

"click",

validatePassword

);

passwordInput.addEventListener(

"keydown",

function(event){

    if(event.key==="Enter"){

        validatePassword();

    }

});

/*====================================================
WRONG PASSWORD
====================================================*/

function unlockFailure(){

    error.textContent=

    "That's not the secret word 🤍";

    const card=

    document.querySelector(".passwordCard");

    card.classList.add("shake");

    setTimeout(()=>{

        card.classList.remove("shake");

    },600);

}

/*====================================================
CORRECT PASSWORD
====================================================*/

async function unlockSuccess(){

    error.textContent="";

    startMusic();

    unlockButton.disabled=true;

    unlockButton.textContent=

    "Unlocking...";

    const card=

    document.querySelector(".passwordCard");

    card.classList.add("success");

    await sleep(1800);

    transitionToChapterOne();

}

/*====================================================
TRANSITION
====================================================*/

async function transitionToChapterOne(){

    pageTurn();

    await sleep(1200);

    currentChapter=1;

    saveProgress();

    showScreen("chapter1");

}

/*====================================================
PAGE TURN
====================================================*/

function pageTurn(){

    const page=

    document.getElementById("pageTurn");

    page.classList.add("turn");

    setTimeout(()=>{

        page.classList.remove("turn");

    },1200);

}

/*====================================================
AUTO FOCUS
====================================================*/

const observer=

new MutationObserver(()=>{

    if(passwordPage.classList.contains("active")){

        passwordInput.focus();

    }

});

observer.observe(

passwordPage,

{

attributes:true

});

/*====================================================
TREASURE CHEST
====================================================*/

const chest =
document.getElementById("chest");

const openChestButton =
document.getElementById("openChest");

const flash =
document.getElementById("memoryFlash");

let chestOpened = false;

if(openChestButton){

openChestButton.addEventListener(

"click",

openTreasureChest

);

}

/*====================================================
OPEN CHEST
====================================================*/

async function openTreasureChest(){

if(chestOpened) return;

chestOpened=true;

openChestButton.disabled=true;

/* Lock wiggle */

await wiggleLock();

/* Lid opens */

chest.classList.add("open");

/* Gold particles */

createGoldParticles();

/* Wait */

await sleep(1800);

/* Flash */

flash.classList.add("show");

await sleep(1100);

flash.classList.remove("show");

/* Save */

currentChapter=2;

saveProgress();

/* Continue */

showScreen("chapter3");

startMemoryDesk();

}

/*====================================================
LOCK WIGGLE
====================================================*/

function wiggleLock(){

return new Promise(resolve=>{

const lock=

document.querySelector(".chestLock");

lock.animate([

{

transform:"translateX(-50%) rotate(0deg)"

},

{

transform:"translateX(-50%) rotate(-10deg)"

},

{

transform:"translateX(-50%) rotate(10deg)"

},

{

transform:"translateX(-50%) rotate(-8deg)"

},

{

transform:"translateX(-50%) rotate(0deg)"

}

],

{

duration:900

}

);

setTimeout(resolve,900);

});

}

/*====================================================
GOLD PARTICLES
====================================================*/

function createGoldParticles(){

for(let i=0;i<60;i++){

const particle=

document.createElement("div");

particle.className=

"goldParticle";

particle.style.left=

"50%";

particle.style.setProperty(

"--x",

(Math.random()*500-250)+"px"

);

particle.style.setProperty(

"--y",

(Math.random()*120)+"px"

);

particle.style.animationDuration=

1.5+

Math.random()*1.5+

"s";

document.body.appendChild(

particle

);

setTimeout(()=>{

particle.remove();

},3000);

}

}

/*====================================================
CHEST SPARKLES
====================================================*/

function createChestSparkles(){

for(let i=0;i<30;i++){

const sparkle=

document.createElement("div");

sparkle.className=

"goldenDust";

sparkle.style.left=

Math.random()*100+"%";

sparkle.style.top=

Math.random()*100+"%";

sparkle.style.animationDuration=

3+

Math.random()*4+

"s";

document.body.appendChild(

sparkle

);

setTimeout(()=>{

sparkle.remove();

},5000);

}

}

createGoldParticles();

createChestSparkles();

/*====================================================
FLASH
====================================================*/

function screenFlash(){

flash.classList.add("show");

setTimeout(()=>{

flash.classList.remove("show");

},1000);

}

/*====================================================
MEMORY DESK ENGINE
====================================================*/

const memoryDesk =
document.getElementById("memoryDesk");

let currentPhoto = 0;

let deskFinished = false;

const photoRotations = [

-12,
8,
-6,
13,
-9,
4,
-15,
7,
-5,
11,
-10

];

/*====================================================
START MEMORY DESK
====================================================*/

async function startMemoryDesk(){

memoryDesk.innerHTML="";

currentPhoto=0;

for(let i=0;i<memories.length;i++){

await createPolaroid(memories[i],i);

await sleep(1000);

}

showFinalMemoryCard();

}

/*====================================================
CREATE PHOTO
====================================================*/

async function createPolaroid(memory,index){

const card=

document.createElement("div");

card.className="polaroid";

card.style.setProperty(

"--rotation",

photoRotations[index]+"deg"

);

const positions=[

[8,8],

[34,10],

[60,8],

[12,34],

[42,30],

[68,28],

[18,56],

[48,54],

[74,52],

[30,70],

[58,72]

];

card.style.left=

positions[index][0]+"%";

card.style.top=

positions[index][1]+"%";

card.style.top=

20+

Math.random()*45+

"%";

card.style.transform=

`rotate(${photoRotations[index]}deg)`;

card.innerHTML=`

<img src="${memory.image}">

<h3>${memory.title}</h3>

<p>${memory.caption}</p>

`;

memoryDesk.appendChild(card);

requestAnimationFrame(()=>{

card.classList.add(

"show",

"drop"

);

});

enablePhotoInteraction(card);

}

/*====================================================
PHOTO INTERACTION
====================================================*/

function enablePhotoInteraction(card){

card.addEventListener(

"click",

()=>{

zoomPhoto(card);

});

makeDraggable(card);

}

/*====================================================
ZOOM
====================================================*/

function zoomPhoto(card){

card.classList.toggle("zoomed");

}

/*====================================================
DRAG
====================================================*/

function makeDraggable(element){

let active=false;

let x=0;

let y=0;

element.addEventListener(

"pointerdown",

e=>{

active=true;

x=e.clientX-element.offsetLeft;

y=e.clientY-element.offsetTop;

element.style.zIndex=999;

});

window.addEventListener(

"pointermove",

e=>{

if(!active) return;

element.style.left=

e.clientX-x+"px";

element.style.top=

e.clientY-y+"px";

});

window.addEventListener(

"pointerup",

()=>{

active=false;

});

}

/*====================================================
FINAL CARD
====================================================*/

function showFinalMemoryCard(){

const note=

document.createElement("div");

note.className="memoryNote";

note.innerHTML=`

<h2>🤍</h2>

<p>

One photograph...

was simply too special

to leave lying

on the table.

</p>

<button

class="primaryButton"

id="showFavourite">

See My Favourite One

</button>

`;

memoryDesk.appendChild(note);

requestAnimationFrame(()=>{

note.style.opacity=1;

});

document

.getElementById(

"showFavourite"

)

.addEventListener(

"click",

goToProjector

);

}

/*====================================================
PROJECTOR
====================================================*/

async function goToProjector(){

pageTurn();

await sleep(1000);

currentChapter=4;

saveProgress();

showScreen("chapter4");

startProjector();

}

/*====================================================
VINTAGE PROJECTOR ENGINE
====================================================*/

const filmStrip =
document.getElementById("filmStrip");

const projector =
document.getElementById("filmProjector");

const finalFrame =
document.getElementById("finalFrame");

let projectorStarted=false;

/*====================================================
START PROJECTOR
====================================================*/

async function startProjector(){

if(projectorStarted) return;

projectorStarted=true;

createDust();

createFilmGrain();

await sleep(1500);

playFilm();

}

/*====================================================
PLAY FILM
====================================================*/

async function playFilm(){

filmStrip.innerHTML="";

for(let i=0;i<memories.length;i++){

addFilmFrame(memories[i]);

await sleep(2200);

}

await sleep(1200);

showFavouriteMemory();

}

/*====================================================
ADD FILM FRAME
====================================================*/

function addFilmFrame(memory){

const frame=

document.createElement("div");

frame.className="filmFrame";

frame.innerHTML=`

<img src="${memory.image}">

<p>${memory.caption}</p>

`;

filmStrip.appendChild(frame);

frame.animate(

[

{

opacity:0,

transform:"translateX(100px)"

},

{

opacity:1,

transform:"translateX(0)"

}

],

{

duration:800,

fill:"forwards"

}

);

filmStrip.scrollTo({

left:filmStrip.scrollWidth,

behavior:"smooth"

});

}

/*====================================================
PROJECTOR DUST
====================================================*/

function createDust(){

for(let i=0;i<80;i++){

const dust=

document.createElement("div");

dust.className="dust";

dust.style.left=

Math.random()*100+"%";

dust.style.animationDuration=

4+

Math.random()*8+

"s";

dust.style.animationDelay=

Math.random()*6+"s";

projector.appendChild(dust);

}

}

/*====================================================
FILM GRAIN
====================================================*/

function createFilmGrain(){

const grain=

document.createElement("div");

grain.className="filmGrain";

projector.appendChild(grain);

}

/*====================================================
FINAL MEMORY
====================================================*/

async function showFavouriteMemory(){

filmStrip.style.opacity=0;

await sleep(1000);

finalFrame.classList.add("show");

finalFrame.innerHTML=`

<img src="images/us.jpg">

<h2>My Favourite Memory 🤍</h2>

<p>

Out of every photograph...

every laugh...

every moment...

this one will always mean a little more to me.

</p>

<button

class="primaryButton"

id="continueGames">

Continue

</button>

`;

document

.getElementById(

"continueGames"

)

.addEventListener(

"click",

goToGames

);

}

/*====================================================
NEXT
====================================================*/

async function goToGames(){

pageTurn();

await sleep(900);

currentChapter=5;

saveProgress();

showScreen("chapter5");

startHeartGame();

}

/*====================================================
CATCH THE HEARTS
====================================================*/

const heartCanvas =
document.getElementById("heartCanvas");

const scoreDisplay =
document.getElementById("heartScore");

const timerDisplay =
document.getElementById("heartTimer");

let gameRunning=false;

let score=0;

let combo=0;

let timer=60;

let spawnInterval;

let timerInterval;

/*====================================================
START GAME
====================================================*/

function startHeartGame(){

if(gameRunning) return;

gameRunning=true;

score=0;

combo=0;

timer=60;

scoreDisplay.textContent=0;

timerDisplay.textContent=60;

spawnInterval=

setInterval(

spawnHeart,

650

);

timerInterval=

setInterval(

updateTimer,

1000

);

}

/*====================================================
TIMER
====================================================*/

function updateTimer(){

timer--;

timerDisplay.textContent=timer;

if(timer<=0){

finishHeartGame();

}

}

/*====================================================
HEART TYPES
====================================================*/

const heartTypes=[

{

emoji:"🤍",

points:1,

weight:45

},

{

emoji:"❤️",

points:2,

weight:30

},

{

emoji:"💛",

points:5,

weight:15

},

{

emoji:"💔",

points:-3,

weight:10

}

];

/*====================================================
RANDOM
====================================================*/

function randomHeart(){

const roll=Math.random()*100;

let total=0;

for(const type of heartTypes){

total+=type.weight;

if(roll<=total){

return type;

}

}

return heartTypes[0];

}

/*====================================================
CREATE HEART
====================================================*/

function spawnHeart(){

const type=

randomHeart();

const heart=

document.createElement("div");

heart.className=

"catchHeart";

heart.textContent=

type.emoji;

heart.dataset.points=

type.points;

heart.style.left=

Math.random()*92+"%";

heart.style.animationDuration=

3+

Math.random()*2+

"s";

heartCanvas.appendChild(

heart

);

heart.onclick=()=>{

collectHeart(

heart,

type.points

);

};

setTimeout(()=>{

heart.remove();

combo=0;

},5000);

}

/*====================================================
COLLECT
====================================================*/

function collectHeart(

heart,

points

){

score+=points;

combo++;

if(score<0){

score=0;

}

scoreDisplay.textContent=

score;

showFloatingScore(

heart,

points

);

heart.remove();

if(combo>=10){

showCombo();

combo=0;

}

}

/*====================================================
FLOATING SCORE
====================================================*/

function showFloatingScore(

heart,

points

){

const text=

document.createElement("div");

text.className=

"comboText";

text.textContent=

(points>0?"+":"")+points;

text.style.left=

heart.style.left;

text.style.top=

heart.offsetTop+"px";

heartCanvas.appendChild(

text

);

setTimeout(()=>{

text.remove();

},1000);

}

/*====================================================
COMBO
====================================================*/

function showCombo(){

const comboText=

document.createElement("div");

comboText.className=

"comboText";

comboText.textContent=

"PERFECT ×10 ✨";

comboText.style.left="50%";

comboText.style.top="120px";

comboText.style.transform=

"translateX(-50%)";

heartCanvas.appendChild(

comboText

);

createConfetti();

setTimeout(()=>{

comboText.remove();

},1500);

}

/*====================================================
CONFETTI
====================================================*/

function createConfetti(){

for(let i=0;i<80;i++){

const piece=

document.createElement("div");

piece.className=

"confetti";

piece.style.left=

Math.random()*100+"%";

piece.style.background=

`hsl(${Math.random()*360},90%,65%)`;

piece.style.animationDuration=

2+

Math.random()*2+

"s";

document.body.appendChild(

piece

);

setTimeout(()=>{

piece.remove();

},4000);

}

}

/*====================================================
FINISH
====================================================*/

function finishHeartGame(){

clearInterval(

spawnInterval

);

clearInterval(

timerInterval

);

gameRunning=false;

if(score>=80){

showHeartVictory();

}else{

showHeartRetry();

}

}

/*====================================================
WIN
====================================================*/

function showHeartVictory(){

createConfetti();

setTimeout(()=>{

goToCakeGame();

},2500);

}

/*====================================================
RETRY
====================================================*/

function showHeartRetry(){

if(confirm(

"You scored "+score+

". Try again? ❤️"

)){

heartCanvas.innerHTML="";

startHeartGame();

}

}

/*====================================================
NEXT
====================================================*/

async function goToCakeGame(){

pageTurn();

await sleep(900);

showCakeGame();

}

/*====================================================
BUILD THE BIRTHDAY CAKE
====================================================*/

const cakeBase =
document.getElementById("cakeBase");

const cakeTools =
document.getElementById("cakeTools");

const birthdayBanner =
document.getElementById("birthdayBanner");

let cakePiecesPlaced = 0;

const requiredPieces = 7;

/*====================================================
CAKE ITEMS
====================================================*/

const cakeItems = [

{
emoji:"🍰",
name:"Frosting"
},

{
emoji:"🍫",
name:"Chocolate"
},

{
emoji:"🍓",
name:"Strawberries"
},

{
emoji:"🌹",
name:"Roses"
},

{
emoji:"✨",
name:"Gold Stars"
},

{
emoji:"🫐",
name:"Blueberries"
},

{
emoji:"🕯",
name:"Candles"
}

];

/*====================================================
START CAKE GAME
====================================================*/

function showCakeGame(){

cakeTools.innerHTML="";

cakeBase.innerHTML="";

cakePiecesPlaced=0;

cakeItems.forEach(createCakeItem);

}

/*====================================================
CREATE ITEM
====================================================*/

function createCakeItem(item){

const tool=document.createElement("div");

tool.className="cakeItem";

tool.textContent=item.emoji;

tool.draggable=true;

tool.dataset.name=item.name;

cakeTools.appendChild(tool);

tool.addEventListener(

"dragstart",

dragStart

);

}

/*====================================================
DRAG
====================================================*/

let draggedItem=null;

function dragStart(event){

draggedItem=

event.target;

}

/*====================================================
DROP
====================================================*/

cakeBase.addEventListener(

"dragover",

event=>{

event.preventDefault();

});

cakeBase.addEventListener(

"drop",

dropItem

);

function dropItem(event){

event.preventDefault();

if(!draggedItem) return;

placeDecoration(

draggedItem.textContent,

event.offsetX,

event.offsetY

);

draggedItem.remove();

cakePiecesPlaced++;

checkCake();

}

/*====================================================
PLACE
====================================================*/

function placeDecoration(

emoji,

x,

y

){

const piece=

document.createElement("div");

piece.textContent=emoji;

piece.style.position="absolute";

piece.style.left=x-15+"px";

piece.style.top=y-15+"px";

piece.style.fontSize="36px";

piece.style.pointerEvents="none";

piece.animate(

[

{

transform:"scale(.2)",

opacity:0

},

{

transform:"scale(1.2)",

opacity:1

},

{

transform:"scale(1)"

}

],

{

duration:500,

fill:"forwards"

}

);

cakeBase.appendChild(piece);

}

/*====================================================
CHECK
====================================================*/

function checkCake(){

if(

cakePiecesPlaced

>=requiredPieces

){

finishCake();

}

}

/*====================================================
FINISH
====================================================*/

async function finishCake(){

lightCandles();

createConfetti();

await sleep(1200);

birthdayBanner.classList.add("show");

await sleep(4000);

goToReasons();

}

/*====================================================
LIGHT CANDLES
====================================================*/

function lightCandles(){

const flames=

document.createElement("div");

flames.innerHTML="🕯✨";

flames.style.position="absolute";

flames.style.left="50%";

flames.style.top="-30px";

flames.style.transform=

"translateX(-50%)";

flames.style.fontSize="50px";

cakeBase.appendChild(

flames

);

}

birthdayBanner.innerHTML = `

<h1>🎉 Happy Birthday 🎉</h1>

<h2>Busayo 🤍</h2>

<p>

May your new year be filled

with laughter,

peace,

beautiful surprises,

and unforgettable memories.

</p>

`;

/*====================================================
NEXT
====================================================*/

async function goToReasons(){

pageTurn();

await sleep(1000);

currentChapter=6;

saveProgress();

showScreen("chapter6");

buildReasons();

}

/*====================================================
23 REASONS
====================================================*/

const reasonsGrid =
document.getElementById("reasonsGrid");

const reasonsFinished =
document.getElementById("reasonsFinished");

let openedLetters = 0;

/*====================================================
BUILD ENVELOPES
====================================================*/

function buildReasons(){

reasonsGrid.innerHTML="";

openedLetters=0;

reasons.forEach((reason,index)=>{

createEnvelope(reason,index);

});

}

/*====================================================
CREATE ENVELOPE
====================================================*/

function createEnvelope(reason,index){

const envelope=

document.createElement("div");

envelope.className=

"reasonEnvelope";

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

if(index===22){

envelope.classList.add("gold");

setInterval(()=>{

envelope.classList.toggle(

"pulse"

);

},1400);

}

envelope.onclick=()=>{

openEnvelope(envelope);

};

reasonsGrid.appendChild(envelope);

}

/*====================================================
OPEN
====================================================*/

function openEnvelope(envelope){

if(

envelope.classList.contains("open")

)

return;

envelope.classList.add("open");

openedLetters++;

saveProgress();

createEnvelopeSparkles(envelope);

checkReasons();

}

/*====================================================
SPARKLES
====================================================*/

function createEnvelopeSparkles(envelope){

const rect=

envelope.getBoundingClientRect();

for(let i=0;i<15;i++){

const spark=

document.createElement("div");

spark.className="reasonSpark";

spark.style.left=

rect.left+

rect.width/2+

(Math.random()*40-20)+"px";

spark.style.top=

rect.top+

40+"px";

document.body.appendChild(spark);

setTimeout(()=>{

spark.remove();

},900);

}

}

/*====================================================
CHECK
====================================================*/

function checkReasons(){

if(openedLetters===23){

finishReasons();

}

}

/*====================================================
FINISH
====================================================*/

async function finishReasons(){

const envelopes=

document.querySelectorAll(

".reasonEnvelope"

);

envelopes.forEach((env,index)=>{

setTimeout(()=>{

env.style.transition="1.8s";

env.style.transform=

"translateY(-250px) rotate("+

(Math.random()*40-20)

+"deg)";

env.style.opacity=0;

},index*80);

});

await sleep(2800);

showMailbox();

}

/*====================================================
MAILBOX
====================================================*/

function showMailbox(){

reasonsFinished.classList.add(

"show"

);

reasonsFinished.innerHTML=`

<h2>

💌

</h2>

<p>

You've discovered every little reason.

One final message

is waiting for you.

</p>

<button

class="primaryButton"

id="openMailbox"

>

Open My Letter

</button>

`;

document

.getElementById(

"openMailbox"

)

.addEventListener(

"click",

goToLetter

);

}

/*====================================================
NEXT
====================================================*/

async function goToLetter(){

pageTurn();

await sleep(900);

currentChapter=7;

saveProgress();

showScreen("chapter7");

startMailbox();

}

/*====================================================
MAILBOX ENGINE
====================================================*/

const mailbox =
document.getElementById("mailbox");

const mailboxFlag =
document.querySelector(".mailFlag");

const mailboxBird =
document.querySelector(".mailBird");

const envelope =
document.getElementById("letterEnvelope");

const letter =
document.getElementById("letterPaper");

const typedLetter =
document.getElementById("typedLetter");

const signature =
document.getElementById("signature");

const continueJourney =
document.getElementById("continueJourney");

let mailboxOpened=false;

/*====================================================
START
====================================================*/

async function startMailbox(){

mailbox.classList.remove("open");

mailboxFlag.classList.remove("up");

envelope.classList.remove("show");

letter.classList.remove("show");

typedLetter.textContent="";

signature.style.opacity=0;

continueJourney.style.display="none";

mailbox.onclick=openMailbox;

}

/*====================================================
OPEN
====================================================*/

async function openMailbox(){

if(mailboxOpened) return;

mailboxOpened=true;

mailbox.onclick=null;

/* Bird */

birdFlyAway();

/* Flag */

await sleep(500);

mailboxFlag.classList.add("up");

/* Door */

await sleep(700);

mailbox.classList.add("open");

/* Envelope */

await sleep(900);

envelope.classList.add("show");

/* Paper */

await sleep(1800);

showLetter();

}

/*====================================================
BIRD
====================================================*/

function birdFlyAway(){

mailboxBird.animate(

[

{

transform:"translate(0,0)"

},

{

transform:"translate(120px,-180px)"

},

{

transform:"translate(300px,-350px)"

}

],

{

duration:1800,

fill:"forwards"

}

);

}

/*====================================================
LETTER
====================================================*/

async function showLetter(){

letter.classList.add("show");

await sleep(1000);

typeLetter();

}

/*====================================================
TYPEWRITER
====================================================*/

async function typeLetter(){

typedLetter.textContent="";

const text=LETTER;

for(let i=0;i<text.length;i++){

typedLetter.textContent+=text[i];

window.scrollTo({

top:document.body.scrollHeight,

behavior:"smooth"

});

/* punctuation pauses */

if(text[i]==="."){

await sleep(220);

}

else if(text[i]===","){

await sleep(120);

}

else if(text[i]==="\n"){

await sleep(400);

}

else{

await sleep(

18+

Math.random()*35

);

}

}

finishLetter();

typedLetter.classList.add(

"finished"

);

}

/*====================================================
FINISH
====================================================*/

async function finishLetter(){

await sleep(1000);

signature.style.opacity=1;

signature.style.transition="1.5s";

await sleep(1500);

showPostScript();

}

/*====================================================
POSTSCRIPT
====================================================*/

async function showPostScript(){

const ps=

document.createElement("p");

ps.className="postScript";

ps.innerHTML=

"<strong>P.S.</strong><br>Thank you for existing 🤍";

letter.appendChild(ps);

await sleep(1500);

continueJourney.style.display="inline-flex";

continueJourney.style.opacity=1;

}

/*====================================================
NEXT
====================================================*/

continueJourney.onclick=async()=>{

pageTurn();

await sleep(900);

currentChapter=8;

saveProgress();

showScreen("endingPage");

startEnding();

};

