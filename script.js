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

        },1000);

    },2500);

});

// -------------------------------
// Music Fade In
// -------------------------------

function startMusic(){

    music.volume = 0;

    music.play().catch(()=>{});

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

        70,

        ()=>{

            typeText(

                textElement,

                paragraph,

                35,

                ()=>{

                    button.style.transition="1s";

                    button.style.opacity="1";

                }

            );

        }

    );

}
