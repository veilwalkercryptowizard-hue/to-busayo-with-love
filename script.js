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

    alert(
"🚧 Chapter Two (The Keepsake Chest) is coming next!"
    );

});
