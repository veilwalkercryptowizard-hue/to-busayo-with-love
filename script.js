/* ==========================================
TO BUSAYO, WITH LOVE
SCRIPT.JS V2
========================================== */


/* ==========================================
ELEMENTS
========================================== */

const pages = {

    password : document.getElementById("password-page"),

    welcome : document.getElementById("welcome-page"),

    memory : document.getElementById("memoryPage"),

    gallery : document.getElementById("galleryPage"),

    film : document.getElementById("filmPage"),

    reasons : document.getElementById("reasonsPage"),

    letter : document.getElementById("letterPage"),

    ending : document.getElementById("endingPage")

};

const loadingScreen =
document.getElementById("loading-screen");

const unlockButton =
document.getElementById("unlockButton");

const passwordInput =
document.getElementById("password");

const error =
document.getElementById("error");

const music =
document.getElementById("bgMusic");

const beginJourney =
document.getElementById("beginJourney");

const transition =
document.getElementById("chapterTransition");

const transitionChapter =
document.getElementById("transitionChapter");

const transitionTitle =
document.getElementById("transitionTitle");

/* ==========================================
LOADING
========================================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loadingScreen.style.opacity="0";

        setTimeout(()=>{

            loadingScreen.style.display="none";

        },500);

    },500);

});

/* ==========================================
MUSIC
========================================== */

function startMusic(){

    music.volume=0;

    music.play().catch(()=>{});

    let volume=0;

    const fade=setInterval(()=>{

        volume+=0.05;

        music.volume=volume;

        if(volume>=1){

            clearInterval(fade);

        }

    },150);

}

/* ==========================================
PASSWORD
========================================== */

function unlockWebsite(){

    const pass=

    passwordInput.value

    .trim()

    .toLowerCase();

    if(pass==="july"){

        error.textContent="";

        startMusic();

        showPage("welcome");

        startTyping();

    }

    else{

        error.textContent=

        "🤍 Wrong password.";

    }

}

unlockButton.onclick=

unlockWebsite;

passwordInput.addEventListener(

"keypress",

e=>{

if(e.key==="Enter"){

unlockWebsite();

}

});

/* ==========================================
PAGE ENGINE
========================================== */

function showPage(page){

    Object.values(pages).forEach(p=>{

        p.classList.remove("active");

    });

    pages[page].classList.add("active");

}

/* ==========================================
TRANSITIONS
========================================== */

function chapterTransition(

chapter,

title,

nextPage

){

    transitionChapter.textContent=

    chapter;

    transitionTitle.textContent=

    title;

    transition.classList.add("show");

    setTimeout(()=>{

        showPage(nextPage);

    },700);

    setTimeout(()=>{

        transition.classList.remove("show");

    },1500);

}

/* ==========================================
BEGIN JOURNEY
========================================== */

beginJourney.onclick=()=>{

    chapterTransition(

        "CHAPTER TWO",

        "The Keepsake Chest",

        "memory"

    );

};

/* ==========================================
RESTART
========================================== */

document

.getElementById("restartJourney")

.onclick=()=>{

location.reload();

};

/* ==========================================
TREASURE CHEST
========================================== */

const chest =
document.getElementById("chest");

const openChest =
document.getElementById("openChest");

let chestOpened = false;

openChest.onclick = () => {

    if(chestOpened) return;

    chestOpened = true;

    chest.classList.add("open");

    openChest.disabled = true;

    openChest.textContent = "Opening...";

    setTimeout(()=>{

        chapterTransition(

            "CHAPTER THREE",

            "Our Little Memories",

            "gallery"

        );

        loadMemory();

    },2200);

};

/* ==========================================
MEMORY GALLERY
========================================== */

let currentMemory = 0;

const memoryImage =
document.getElementById("memoryImage");

const memoryTitle =
document.getElementById("memoryTitle");

const memoryCaption =
document.getElementById("memoryCaption");

const memoryCounter =
document.getElementById("memoryCounter");

function loadMemory(){

    const memory = memories[currentMemory];

    memoryImage.src = memory.image;

    memoryTitle.textContent = memory.title;

    memoryCaption.textContent = memory.caption;

    memoryCounter.textContent =

    `Memory ${currentMemory + 1} of ${memories.length}`;

}

document
.getElementById("nextMemory")
.onclick = ()=>{

    currentMemory++;

    if(currentMemory >= memories.length){

        chapterTransition(

            "CHAPTER FOUR",

            "A Walk Through Our Moments",

            "film"

        );

        buildFilmStrip();

        return;

    }

    loadMemory();

};

document
.getElementById("previousMemory")
.onclick = ()=>{

    if(currentMemory > 0){

        currentMemory--;

        loadMemory();

    }

};

/* ==========================================
FILM STRIP
========================================== */

const filmStrip =
document.getElementById("filmStrip");

function buildFilmStrip(){

    filmStrip.innerHTML = "";

    memories.forEach(memory=>{

        const frame =
        document.createElement("div");

        frame.className = "film-frame";

        frame.innerHTML = `

            <img src="${memory.image}">

        `;

        filmStrip.appendChild(frame);

    });

}

document
.getElementById("filmNext")
.onclick = ()=>{

    chapterTransition(

        "CHAPTER FIVE",

        "23 Reasons",

        "reasons"

    );

    createReasons();

};

document
.getElementById("filmPrevious")
.onclick = ()=>{

    chapterTransition(

        "CHAPTER THREE",

        "Our Little Memories",

        "gallery"

    );

};

/* ==========================================
23 REASONS
========================================== */

const reasonsGrid =
document.getElementById("reasonsGrid");

const reasonModal =
document.getElementById("reasonModal");

const reasonText =
document.getElementById("reasonText");

const closeReason =
document.getElementById("closeReason");

let openedReasons = 0;

function createReasons(){

    reasonsGrid.innerHTML="";

    reasons.forEach((reason,index)=>{

        const envelope =
        document.createElement("div");

        envelope.className="envelope";

        envelope.innerHTML="💌";

        envelope.onclick=()=>{

            openReason(

                reason,

                envelope

            );

        };

        reasonsGrid.appendChild(envelope);

    });

}

function openReason(reason,envelope){

    reasonModal.style.display="flex";

    reasonText.textContent=reason;

    if(!envelope.classList.contains("opened")){

        envelope.classList.add("opened");

        envelope.innerHTML="🤍";

        openedReasons++;

        updateReasonProgress();

    }

}

closeReason.onclick=()=>{

    reasonModal.style.display="none";

};

window.onclick=(event)=>{

    if(event.target===reasonModal){

        reasonModal.style.display="none";

    }

};

function updateReasonProgress(){

    const title=

    document.querySelector(

    "#reasonsPage h1"

    );

    title.innerHTML=

    `Twenty-Three Reasons

    <br>

    <small>

    ${openedReasons} of

    ${reasons.length}

    opened

    </small>`;

}

document

.getElementById("toLetter")

.onclick=()=>{

    chapterTransition(

        "CHAPTER SIX",

        "One Last Thing...",

        "letter"

    );

};

document

.getElementById("backToFilm")

.onclick=()=>{

    chapterTransition(

        "CHAPTER FOUR",

        "A Walk Through Our Moments",

        "film"

    );

};

