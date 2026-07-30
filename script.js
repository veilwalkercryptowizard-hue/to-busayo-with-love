/* =====================================
   TO BUSAYO, WITH LOVE
   SCRIPT.JS
===================================== */

// -------------------------------
// Elements
// -------------------------------

const loadingScreen = document.getElementById("loading-screen");
const passwordPage = document.getElementById("password-page");
const welcomePage = document.getElementById("welcome-page");

const unlockButton = document.getElementById("unlockButton");
const passwordInput = document.getElementById("password");
const error = document.getElementById("error");

const beginJourney = document.getElementById("beginJourney");

const music = document.getElementById("bgMusic");

// -------------------------------
// Loading Screen
// -------------------------------

window.addEventListener("load", () => {

    setTimeout(() => {

        loadingScreen.style.opacity = "0";

        setTimeout(() => {

            loadingScreen.style.display = "none";

        },400);

      },3000);   

});

// -------------------------------
// Music Fade In
// -------------------------------

function startMusic(){

    music.volume = 0;

    music.play()
.then(()=>{

console.log("Music started");

})
.catch((error)=>{

console.log("Music blocked", error);

});

    let volume = 0;

    const fade = setInterval(()=>{

        if(volume < 1){

            volume += 0.05;

            music.volume = volume;

        }else{

            clearInterval(fade);

        }

    },150);

}

// -------------------------------
// Password
// -------------------------------

function unlockWebsite(){

    const pass = passwordInput.value.trim().toLowerCase();

    if(
        pass === "july"
    ){

        error.innerHTML = "";

        startMusic();

        passwordPage.classList.remove("active");

       setTimeout(()=>{

    welcomePage.classList.add("active");

    startTyping();

},500);

    }

    else{

        error.innerHTML =
        "🤍 Wrong password. Try again.";

    }

}

unlockButton.addEventListener(
"click",
unlockWebsite
);

passwordInput.addEventListener(
"keypress",
function(e){

if(e.key==="Enter"){

unlockWebsite();

}

});

// -------------------------------
// Begin Journey
// -------------------------------

beginJourney.addEventListener("click",()=>{

    const transition =
    document.getElementById("chapterTransition");

    transition.classList.add("show");

    setTimeout(()=>{

        welcomePage.classList.remove("active");

        transition.classList.remove("show");

        // Chapter Two starts here

        document
.getElementById("memoryPage")
.classList.add("active");
    },3000);

});
/* =========================
Typing Animation
========================= */

const title =
"Happy Birthday\nBusayo 🤍";

const paragraph =
"Every beautiful journey begins with a single memory.\nToday is all about celebrating you.";

function typeText(element,text,speed,callback){

    let i=0;

    element.innerHTML="";

    const timer=setInterval(()=>{

        if(i<text.length){

            if(text.charAt(i)==="\n"){

                element.innerHTML+="<br>";

            }else{

                element.innerHTML+=text.charAt(i);

            }

            i++;

        }else{

            clearInterval(timer);

            if(callback){

                callback();

            }

        }

    },speed);

}

function startTyping(){

    const titleElement=
    document.getElementById("typingTitle");

    const textElement=
    document.getElementById("typingText");

    const button=
    document.getElementById("beginJourney");

    button.style.opacity="0";

    typeText(

        titleElement,

        title,

        30,

        ()=>{

            typeText(

                textElement,

                paragraph,

                18,

                ()=>{

                    button.style.transition="1s";

                    button.style.opacity="1";

                }

            );

        }

    );

}
/* ===========================
CHEST
=========================== */

const chest =
document.getElementById("chest");

const openButton =
document.getElementById("openChest");

openButton.addEventListener("click",()=>{

    chest.style.transform = "scale(1.15)";

    setTimeout(()=>{

        chest.classList.add("open");

        openButton.style.display = "none";

    },300);

    setTimeout(()=>{

        const viewer =
        document.getElementById("memoryViewer");

        viewer.style.display = "flex";

        setTimeout(()=>{

            viewer.classList.add("show");

        },50);

    },1000);

});
    setTimeout(()=>{

        chest.classList.add("open");

    },300);

    setTimeout(()=>{

        const viewer =
        document.getElementById("memoryViewer");

        viewer.style.display="flex";

        setTimeout(()=>{

            viewer.classList.add("show");

        },50);

    },1000);

});
/* =========================
MEMORIES
========================= */

const memories=[

{

image:"photo1.jpg",

title:"The Beginning",

caption:"Every beautiful story begins with one unforgettable smile."

},

{

image:"photo2.jpg",

title:"Another Beautiful Moment",

caption:"Every memory with you became another reason to smile."

},

{

image:"photo3.jpg",

title:"A Moment Worth Keeping",

caption:"Some moments deserve to live forever."

}

];

let currentMemory=0;

const memoryImage=
document.getElementById("memoryImage");

const memoryTitle=
document.getElementById("memoryTitle");

const memoryCaption=
document.getElementById("memoryCaption");

function loadMemory(direction="next"){

const card =
document.querySelector(".polaroid");

card.classList.remove(
"show",
"next",
"previous"
);

card.classList.add(direction);

setTimeout(()=>{

memoryImage.src=
memories[currentMemory].image;

memoryTitle.innerHTML=
memories[currentMemory].title;

memoryCaption.innerHTML=
memories[currentMemory].caption;

card.classList.remove(
"next",
"previous"
);

card.classList.add("show");

},400);

}

document.getElementById("nextMemory").onclick=()=>{

currentMemory++;

if(currentMemory>=memories.length){

currentMemory=0;

}

loadMemory("next");

};

document.getElementById("previousMemory").onclick=()=>{

currentMemory--;

if(currentMemory<0){

currentMemory=
memories.length-1;

}

loadMemory("previous");

};

loadMemory("next");
