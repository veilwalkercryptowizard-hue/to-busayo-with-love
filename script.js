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
