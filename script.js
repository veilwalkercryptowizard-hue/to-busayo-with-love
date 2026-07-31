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
