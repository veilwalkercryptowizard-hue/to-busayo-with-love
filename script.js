// Loading Screen
window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";

    }, 2500);

});

// Password

function checkPassword(){

let password = document.getElementById("password").value.trim();

if(password === "July" || password === "july"){

document.getElementById("password-screen").style.display="none";

document.getElementById("website").style.display="block";

window.scrollTo(0,0);

}else{

document.getElementById("error").innerHTML="Wrong password ❤️";

}

}

// Enter Key

document.addEventListener("keypress",function(e){

if(e.key==="Enter"){

checkPassword();

}

});

// Begin Journey Button

const journey=document.getElementById("startJourney");

if(journey){

journey.addEventListener("click",()=>{

window.scrollBy({

top:window.innerHeight,

behavior:"smooth"

});

});

}

// Fade Animation

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".fade").forEach(section=>{

observer.observe(section);

});
