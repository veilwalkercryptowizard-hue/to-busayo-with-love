/* ==========================================
   TO BUSAYO, WITH LOVE 🤍
   MAIN SCRIPT
========================================== */

const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentPage = 0;

function showPage(index){

pages.forEach(page=>page.classList.remove("active"));

pages[index].classList.add("active");

currentPage=index;

updateNavigation();

document.title=pages[index].id.replace("page","Chapter ");

}

function updateNavigation(){

prevBtn.style.display=currentPage===0?"none":"inline-block";

nextBtn.style.display=currentPage===pages.length-1?"none":"inline-block";

}

nextBtn.addEventListener("click",()=>{

if(currentPage<pages.length-1){

showPage(currentPage+1);

}

});

prevBtn.addEventListener("click",()=>{

if(currentPage>0){

showPage(currentPage-1);

}

});

showPage(0);

/* ==========================================
   LOADING SCREEN
========================================== */

setTimeout(()=>{

showPage(1);

startCountdown();

},5500);

/* ==========================================
   COUNTDOWN
========================================== */

const count=document.getElementById("countNumber");

function startCountdown(){

let numbers=[3,2,1];

let index=0;

count.textContent=numbers[index];

let timer=setInterval(()=>{

index++;

if(index<numbers.length){

count.textContent=numbers[index];

count.animate([

{transform:"scale(.7)"},

{transform:"scale(1.2)"},

{transform:"scale(1)"}

],{

duration:700

});

}else{

clearInterval(timer);

setTimeout(()=>{

showPage(2);

createBalloons();

createConfetti();

},900);

}

},1200);

}

/* ==========================================
   MUSIC
========================================== */

const music=document.getElementById("bgMusic");

const beginJourney=document.getElementById("beginJourney");

beginJourney.addEventListener("click",()=>{

music.play().catch(()=>{});

showPage(3);

});

/* ==========================================
   BALLOONS
========================================== */

function createBalloons(){

const container=document.getElementById("balloonContainer");

if(!container)return;

for(let i=0;i<25;i++){

let balloon=document.createElement("div");

balloon.className="balloon";

balloon.innerHTML=["🎈","🤍","💛"][Math.floor(Math.random()*3)];

balloon.style.left=Math.random()*100+"%";

balloon.style.animationDuration=(8+Math.random()*6)+"s";

container.appendChild(balloon);

}

}

/* ==========================================
   CONFETTI
========================================== */

function createConfetti(){

const container=document.getElementById("confettiContainer");

if(!container)return;

for(let i=0;i<180;i++){

let piece=document.createElement("div");

piece.className="confetti";

piece.style.left=Math.random()*100+"%";

piece.style.animationDuration=(3+Math.random()*4)+"s";

piece.style.background=["gold","#fff","#ffe08a"][Math.floor(Math.random()*3)];

container.appendChild(piece);

}

}

/* ==========================================
   FLOATING HEARTS
========================================== */

const heartContainer=document.getElementById("floatingHearts");

function spawnHeart(){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML=["🤍","💛","❤️"][Math.floor(Math.random()*3)];

heart.style.left=Math.random()*100+"%";

heart.style.animationDuration=(8+Math.random()*6)+"s";

heartContainer.appendChild(heart);

setTimeout(()=>{

heart.remove();

},14000);

}

setInterval(spawnHeart,500);

/* ==========================================
   PASSWORD
========================================== */

const unlockBtn=document.getElementById("unlockBtn");

const password=document.getElementById("passwordInput");

const error=document.getElementById("passwordError");

unlockBtn.addEventListener("click",()=>{

let value=password.value.trim().toLowerCase();

if(value==="july"){

error.textContent="";

showPage(5);

}else{

error.textContent="Wrong Password";

password.animate([

{transform:"translateX(-10px)"},

{transform:"translateX(10px)"},

{transform:"translateX(-10px)"},

{transform:"translateX(10px)"},

{transform:"translateX(0)"}

],{

duration:500

});

}

});

/* ==========================================
   TREASURE CHEST
========================================== */

const chest = document.getElementById("treasureChest");
const treasureMessage = document.getElementById("treasureMessage");

if (chest) {

    chest.addEventListener("click", () => {

        chest.classList.add("treasureOpen");

        document.body.classList.add("treasureOpen");

        if (treasureMessage) {

            treasureMessage.innerHTML = `
                <h3>✨ Every treasure tells a story...</h3>
                <p>Some treasures are made of gold, but mine smiles, laughs, and answers to the name <strong>Busayo</strong>. ❤️</p>
            `;

            treasureMessage.classList.add("show");

        }

        setTimeout(() => {

            showPage(6);

        }, 2500);

    });

}

/* ==========================================
   MEMORY BOOK
========================================== */

const bookCover=document.querySelector(".bookCover");
const memoryBook=document.querySelector(".memoryBook");
const pagesBook=document.querySelectorAll(".memoryPage");
const nextMemory=document.getElementById("nextMemory");

let memoryIndex=0;

if(bookCover){

bookCover.addEventListener("click",()=>{

bookCover.style.display="none";

memoryBook.style.display="block";

pagesBook[0].classList.add("active");

});

}

if(nextMemory){

nextMemory.addEventListener("click",()=>{

pagesBook[memoryIndex].classList.remove("active");

memoryIndex++;

if(memoryIndex<pagesBook.length){

pagesBook[memoryIndex].classList.add("active");

}else{

showPage(7);

}

});

}

/* ==========================================
   SPECIAL MEMORY
========================================== */

const specialImage=document.querySelector(".specialImage img");

if(specialImage){

specialImage.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.08)"

},

{

transform:"scale(1)"

}

],{

duration:12000,

iterations:Infinity

});

}

/* ==========================================
   HEART GAME
========================================== */

const gameArea=document.getElementById("heartGameArea");
const basket=document.getElementById("basket");

const scoreDisplay=document.getElementById("score");

const timerDisplay=document.getElementById("timer");

const startGame=document.getElementById("startGame");

let score=0;

let gameTime=60;

let gameRunning=false;

let fallSpeed=4;

function moveBasket(e){

const rect=gameArea.getBoundingClientRect();

let x;

if(e.touches){

x=e.touches[0].clientX;

}else{

x=e.clientX;

}

basket.style.left=(x-rect.left)+"px";

}

gameArea.addEventListener("mousemove",moveBasket);

gameArea.addEventListener("touchmove",moveBasket);

function createHeart(){

if(!gameRunning)return;

const heart=document.createElement("div");

heart.className="fallingHeart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*90+"%";

heart.style.animationDuration=fallSpeed+"s";

gameArea.appendChild(heart);

const interval=setInterval(()=>{

const heartRect=heart.getBoundingClientRect();

const basketRect=basket.getBoundingClientRect();

if(

heartRect.bottom>=basketRect.top &&

heartRect.left<basketRect.right &&

heartRect.right>basketRect.left

){

score++;

scoreDisplay.textContent=score;

heart.remove();

clearInterval(interval);

}

},40);

setTimeout(()=>{

heart.remove();

clearInterval(interval);

},fallSpeed*1000);

}

startGame.addEventListener("click",()=>{

if(gameRunning)return;

gameRunning=true;

score=0;

gameTime=60;

fallSpeed=4;

scoreDisplay.textContent=0;

timerDisplay.textContent=60;

const gameLoop=setInterval(createHeart,450);

const timerLoop=setInterval(()=>{

gameTime--;

timerDisplay.textContent=gameTime;

if(gameTime%10===0 && fallSpeed>1.5){

fallSpeed-=0.4;

}

if(gameTime<=0){

clearInterval(gameLoop);

clearInterval(timerLoop);

gameRunning=false;

setTimeout(()=>{

alert("You caught "+score+" hearts ❤️");

showPage(9);

},800);

}

},1000);

});

/* ==========================================
   CAKE BUILDER
========================================== */

const cakeMessage=document.getElementById("cakeMessage");

const cakeLayers=document.getElementById("cakeLayers");

const tools=document.querySelectorAll(".tool");

let cakeStep=0;

const cakeSteps=[

"Mixing ingredients...",

"Batter ready!",

"Baking...",

"First layer added!",

"Second layer added!",

"Adding frosting...",

"Decorating with strawberries...",

"Adding cherries...",

"Chocolate time!",

"Adding flowers...",

"Tying ribbon...",

"Lighting candles..."

];

tools.forEach(tool=>{

tool.addEventListener("click",()=>{

if(cakeStep<cakeSteps.length){

cakeMessage.textContent=cakeSteps[cakeStep];

cakeLayers.style.height=(60+(cakeStep*12))+"px";

cakeStep++;

}

if(cakeStep===cakeSteps.length){

setTimeout(()=>{

cakeMessage.innerHTML=

"🎉 Happy Birthday Busayo ❤️";

cakeLayers.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.08)"

},

{

transform:"scale(1)"

}

],{

duration:900,

iterations:5

});

},500);

}

});

});

/* ==========================================
   23 REASONS
========================================== */

const reasons=[

"You have a beautiful smile.",

"You are kind.",

"You care deeply.",

"You make people happy.",

"You brighten every room.",

"Your laugh is contagious.",

"You inspire others.",

"You are thoughtful.",

"You are genuine.",

"You are intelligent.",

"You are patient.",

"You are caring.",

"You are beautiful inside and out.",

"You never stop growing.",

"You are unforgettable.",

"You are supportive.",

"You make ordinary moments special.",

"You believe in people.",

"You are full of warmth.",

"You deserve happiness.",

"You make life brighter.",

"You are one of a kind.",

"Simply because you are Busayo."

];

const cardContainer=document.getElementById("reasonCards");

reasons.forEach((reason,index)=>{

const card=document.createElement("div");

card.className="reasonCard";

card.innerHTML=`

<div class="reasonInner">

<div class="reasonFront">

Reason #${index+1}<br><br>❤️<br><br>Tap to Flip

</div>

<div class="reasonBack">

${reason}

</div>

</div>

`;

card.onclick=()=>{

card.classList.toggle("flip");

};

cardContainer.appendChild(card);

});

/* ==========================================
   MAILBOX
========================================== */

const mailbox=document.getElementById("mailbox");

if(mailbox){

mailbox.addEventListener("click",()=>{

mailbox.animate([

{

transform:"translateY(0)"

},

{

transform:"translateY(-18px)"

},

{

transform:"translateY(0)"

}

],{

duration:600

});

setTimeout(()=>{

showPage(12);

},700);

});

}

/* ==========================================
   LOVE LETTER
========================================== */

const openLetter=document.getElementById("openLetter");

const letter=document.getElementById("letter");

const typedLetter=document.getElementById("typedLetter");

const fullLetter=`

Happy Birthday Busayo,

From the very beginning, this little website was created with one purpose—to make you smile.

Every page, every animation, every little detail was carefully put together with you in mind.

I hope today reminds you how truly wonderful you are.

May this new year of your life bring countless beautiful memories, genuine laughter, peace, success, and every blessing your heart desires.

Thank you for being such an incredible person.

Never stop smiling.

Never stop believing in yourself.

Always remember that you are deeply appreciated, treasured, and loved.

Happy Birthday once again.

Enjoy every moment of today because you deserve nothing less than the very best.

`;

let letterIndex=0;

function typeLetter(){

if(letterIndex<fullLetter.length){

typedLetter.innerHTML+=fullLetter.charAt(letterIndex);

letterIndex++;

setTimeout(typeLetter,35);

}

}

if(openLetter){

openLetter.addEventListener("click",()=>{

letter.style.display="block";

typedLetter.innerHTML="";

letterIndex=0;

typeLetter();

});

}

/* ==========================================
   MOON POEM ANIMATION
========================================== */

const poemLines=document.querySelectorAll("#poem p");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

poemLines.forEach((line,index)=>{

setTimeout(()=>{

line.style.opacity="1";

line.style.transform="translateY(0)";

},index*1200);

});

}

});

});

const moonScene=document.querySelector(".moonScene");

if(moonScene){

observer.observe(moonScene);

}

poemLines.forEach(line=>{

line.style.opacity="0";

line.style.transform="translateY(25px)";

line.style.transition="all .8s ease";

});

/* ==========================================
   SHOOTING STAR
========================================== */

function createShootingStar(){

const star=document.createElement("div");

star.style.position="absolute";

star.style.width="3px";

star.style.height="3px";

star.style.background="white";

star.style.boxShadow="0 0 15px white";

star.style.top=Math.random()*40+"%";

star.style.left="-50px";

star.style.transform="rotate(-25deg)";

star.style.zIndex="20";

moonScene.appendChild(star);

star.animate([

{

transform:"translate(0,0) rotate(-25deg)",

opacity:1

},

{

transform:"translate(120vw,60vh) rotate(-25deg)",

opacity:0

}

],{

duration:2200

});

setTimeout(()=>{

star.remove();

},2200);

}

setInterval(createShootingStar,7000);

/* ==========================================
   ONE LAST THING
========================================== */

const revealLove=document.getElementById("revealLove");

const loveMessage=document.getElementById("loveMessage");

if(revealLove){

revealLove.addEventListener("click",()=>{

loveMessage.style.display="block";

loveMessage.animate([

{

opacity:0,

transform:"scale(.8)"

},

{

opacity:1,

transform:"scale(1.08)"

},

{

opacity:1,

transform:"scale(1)"

}

],{

duration:1200

});

});

}

/* ==========================================
   REPLAY
========================================== */

const restart=document.getElementById("restart");

if(restart){

restart.addEventListener("click",()=>{

music.currentTime=0;

showPage(0);

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/* ==========================================
   MOBILE SWIPE NAVIGATION
========================================== */

let touchStartX=0;

let touchEndX=0;

document.addEventListener("touchstart",(e)=>{

touchStartX=e.changedTouches[0].screenX;

});

document.addEventListener("touchend",(e)=>{

touchEndX=e.changedTouches[0].screenX;

handleSwipe();

});

function handleSwipe(){

if(touchEndX<touchStartX-80){

if(currentPage<pages.length-1){

showPage(currentPage+1);

}

}

if(touchEndX>touchStartX+80){

if(currentPage>0){

showPage(currentPage-1);

}

}

}

/* ==========================================
   PAGE TITLES
========================================== */

const titles=[

"To Busayo, With Love 🤍",

"Countdown",

"Happy Birthday Busayo ❤️",

"Our Journey",

"A Little Secret 🔐",

"Treasure",

"Our Memories ❤️",

"My Favourite Memory",

"Catch My Heart ❤️",

"Let's Bake A Cake 🎂",

"23 Reasons Why You Are Awesome ❤️",

"One More Surprise",

"A Letter For You",

"Under The Same Moon 🌙",

"Happy Birthday Busayo ❤️"

];

function updateTitle(){

document.title=titles[currentPage]||"To Busayo, With Love 🤍";

}

const originalShowPage=showPage;

showPage=function(index){

originalShowPage(index);

updateTitle();

};

/* ==========================================
   PRELOAD IMAGES
========================================== */

const imageList=[

"cover.jpg",

"us.jpg",

"photo1.jpg",

"photo2.jpg",

"photo4.jpg",

"photo5.jpg",

"photo6.jpg",

"photo7.jpg",

"photo8.jpg",

"photo10.jpg",

"photo12.jpg",

"photo13.jpg",

"photo14.jpg"

];

imageList.forEach(src=>{

const img=new Image();

img.src=src;

});

/* ==========================================
   INITIALIZE
========================================== */

updateNavigation();

updateTitle();

console.log("✨ To Busayo, With Love 🤍 loaded successfully.");
