/* ==========================================
   TO BUSAYO, WITH LOVE
   VERSION 2
   SCRIPT.JS
========================================== */

"use strict";

/* ==========================================
   ELEMENTS
========================================== */

const pages = {

    loading: document.getElementById("loading-screen"),

    password: document.getElementById("password-page"),

    welcome: document.getElementById("welcome-page"),

    memory: document.getElementById("memoryPage"),

    gallery: document.getElementById("galleryPage"),

    reasons: document.getElementById("reasonsPage"),

    letter: document.getElementById("letterPage"),

    ending: document.getElementById("endingPage")

};

const passwordInput =
document.getElementById("password");

const unlockButton =
document.getElementById("unlockButton");

const error =
document.getElementById("error");

const music =
document.getElementById("bgMusic");

const beginJourney =
document.getElementById("beginJourney");

/* ==========================================
   CURRENT PAGE
========================================== */

let currentPage = 0;

/* ==========================================
   PAGE ORDER
========================================== */

const pageOrder = [

    "password",

    "welcome",

    "memory",

    "gallery",

    "reasons",

    "letter",

    "ending"

];

/* ==========================================
   SHOW PAGE
========================================== */

function showPage(pageName){

    Object.values(pages).forEach(page=>{

        if(page){

            page.classList.remove("active");

        }

    });

    pages[pageName].classList.add("active");

}

/* ==========================================
   NEXT PAGE
========================================== */

function nextPage(){

    if(currentPage < pageOrder.length-1){

        currentPage++;

        showPage(pageOrder[currentPage]);

    }

}

/* ==========================================
   PREVIOUS PAGE
========================================== */

function previousPage(){

    if(currentPage > 0){

        currentPage--;

        showPage(pageOrder[currentPage]);

    }

}

/* ==========================================
   LOADING SCREEN
========================================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        pages.loading.style.opacity="0";

        setTimeout(()=>{

            pages.loading.style.display="none";

            showPage("password");

        },300);

    },500);

});

/* ==========================================
   MUSIC
========================================== */

function startMusic(){

    music.volume = 0;

    music.play().catch(()=>{});

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.05;

        if(volume >= 1){

            volume = 1;

            clearInterval(fade);

        }

        music.volume = volume;

    },150);

}

/* ==========================================
   PASSWORD
========================================== */

function unlockWebsite(){

    const pass =

    passwordInput.value

    .trim()

    .toLowerCase();

    if(pass==="july"){

        error.textContent="";

        startMusic();

        currentPage=1;

        showPage("welcome");

        startTyping();

    }

    else{

        error.textContent=

        "🤍 Wrong password.";

    }

}

unlockButton.onclick = unlockWebsite;

passwordInput.addEventListener(

"keydown",

e=>{

if(e.key==="Enter"){

unlockWebsite();

}

}

);

/* ==========================================
   STORY ENGINE
========================================== */

const chapters = [

    {
        id: "welcome",
        title: "Chapter One"
    },

    {
        id: "memory",
        title: "The Keepsake Chest"
    },

    {
        id: "gallery",
        title: "Our Little Album"
    },

    {
        id: "reasons",
        title: "Twenty Three Reasons"
    },

    {
        id: "letter",
        title: "One Last Thing"
    },

    {
        id: "ending",
        title: "Happy Birthday"
    }

];


/* ==========================================
   GO TO PAGE
========================================== */

function goTo(page){

    Object.values(pages).forEach(p=>{

        p.classList.remove("active");

    });

    pages[page].classList.add("active");

}


/* ==========================================
   PAGE TRANSITION
========================================== */

function transition(nextPage){

    const transitionScreen =
    document.getElementById("chapterTransition");

    transitionScreen.classList.add("show");

    setTimeout(()=>{

        goTo(nextPage);

    },700);

    setTimeout(()=>{

        transitionScreen.classList.remove("show");

    },1400);

}

/* ==========================================
   BEGIN JOURNEY
========================================== */

beginJourney.onclick = ()=>{

    currentPage = 2;

    transition("memory");

};

/* ==========================================
   TREASURE CHEST
========================================== */

const chest =
document.getElementById("chest");

const openChest =
document.getElementById("openChest");

let chestOpened = false;

openChest.onclick = ()=>{

    if(chestOpened) return;

    chestOpened = true;

    chest.classList.add("open");

    openChest.disabled = true;

    setTimeout(()=>{

        currentPage = 3;

        transition("gallery");

        loadMemory();

    },2200);

};

/* ==========================================
   MEMORY GALLERY
========================================== */

let currentMemory = 0;

const image =
document.getElementById("memoryImage");

const title =
document.getElementById("memoryTitle");

const caption =
document.getElementById("memoryCaption");

const counter =
document.getElementById("memoryCounter");

function loadMemory(){

    image.src =
    memories[currentMemory].image;

    title.textContent =
    memories[currentMemory].title;

    caption.textContent =
    memories[currentMemory].caption;

    counter.textContent =

    `Memory ${currentMemory+1}
    of ${memories.length}`;

}

document
.getElementById("nextMemory")
.onclick=()=>{

    currentMemory++;

    if(currentMemory>=memories.length){

        currentPage = 4;

        transition("reasons");

        return;

    }

    loadMemory();

};



document
.getElementById("previousMemory")
.onclick=()=>{

    if(currentMemory>0){

        currentMemory--;

        loadMemory();

    }

};
