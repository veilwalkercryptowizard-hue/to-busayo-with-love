/* =====================================
   BUSAYO LUXURY BIRTHDAY EXPERIENCE
   JAVASCRIPT
===================================== */


const pages = document.querySelectorAll(".page");

let currentPage = 0;



function showPage(index){

    if(index < 0) index = 0;

    if(index >= pages.length)
        index = pages.length - 1;


    pages.forEach(page=>{

        page.classList.remove("active");

    });


    pages[index].classList.add("active");


    currentPage = index;



    updateNavigation();


}





function nextPage(){

    if(currentPage < pages.length - 1){

        showPage(currentPage + 1);

    }

}



function previousPage(){

    if(currentPage > 0){

        showPage(currentPage - 1);

    }

}




function updateNavigation(){

    const prev =
    document.getElementById("previousButton");


    const next =
    document.getElementById("nextButton");



    if(currentPage === 0){

        prev.style.display="none";

    }

    else{

        prev.style.display="block";

    }



    if(currentPage === pages.length - 1){

        next.style.display="none";

    }

    else{

        next.style.display="block";

    }

}







/* =====================================
   LOADING + COUNTDOWN
===================================== */


window.onload=function(){


    updateNavigation();


    setTimeout(()=>{


        showPage(1);


        startCountdown();


    },4000);


};





function startCountdown(){


let number = 3;


let counter =
document.getElementById("countNumber");



let countdown =
setInterval(()=>{


    number--;


    if(number > 0){


        counter.innerHTML = number;


        counter.style.animation="none";


        setTimeout(()=>{

            counter.style.animation=
            "countAnimation 1s";

        },20);


    }



    else{


        clearInterval(countdown);


        showBirthday();


    }



},1000);



}





function showBirthday(){


showPage(2);



const music =
document.getElementById("birthdayMusic");


music.play();



}









/* =====================================
 PASSWORD
===================================== */


function checkPassword(){


const input =
document.getElementById("passwordInput");



const message =
document.getElementById("passwordMessage");



let password =
input.value.toLowerCase();



if(password === "july"){


message.innerHTML=
"Unlocked ❤️";


setTimeout(()=>{

nextPage();

},800);


}



else{


message.innerHTML=
"Wrong password";


input.classList.add("shake");


setTimeout(()=>{


input.classList.remove("shake");


},500);



}



}









/* =====================================
 TREASURE CHEST
===================================== */


function openChest(){


const chest =
document.getElementById("treasureChest");


chest.classList.add("open");



document.getElementById("treasureMessage")
.innerHTML=
"Every treasure tells a story... ❤️";


}









/* =====================================
 MEMORY BOOK
===================================== */


const memories=[


{
img:"photo1.jpg",
text:"A beautiful beginning."
},


{
img:"photo2.jpg",
text:"A moment worth remembering."
},


{
img:"photo4.jpg",
text:"A smile captured forever."
},


{
img:"photo5.jpg",
text:"Another beautiful chapter."
},


{
img:"photo6.jpg",
text:"Memories that shine."
},


{
img:"photo7.jpg",
text:"A special moment."
},


{
img:"photo8.jpg",
text:"Forever treasured."
},


{
img:"photo10.jpg",
text:"A memory close to my heart."
},


{
img:"photo12.jpg",
text:"Another page of happiness."
},


{
img:"photo13.jpg",
text:"A story worth keeping."
},


{
img:"photo14.jpg",
text:"The final memory."
}


];



let memoryIndex=0;



function nextMemory(){


memoryIndex++;


if(memoryIndex >= memories.length)

memoryIndex=0;



changeMemory();


}




function previousMemory(){


memoryIndex--;


if(memoryIndex < 0)

memoryIndex=memories.length-1;



changeMemory();


}



function changeMemory(){


const image =
document.getElementById("memoryImage");


const caption =
document.getElementById("memoryCaption");



image.src=
"images/"+memories[memoryIndex].img;



caption.innerHTML=
memories[memoryIndex].text;



image.style.animation="none";


setTimeout(()=>{


image.style.animation=
"photoReveal 1s";


},20);



}


/* =====================================
   CATCH MY HEART GAME
===================================== */


let score = 0;

let timeLeft = 60;

let gameTimer;

let heartInterval;



function startHeartGame(){


score = 0;

timeLeft = 60;



document.getElementById("score")
.innerHTML = score;



document.getElementById("timer")
.innerHTML = timeLeft;




clearInterval(gameTimer);

clearInterval(heartInterval);




gameTimer=setInterval(()=>{


timeLeft--;


document.getElementById("timer")
.innerHTML=timeLeft;



if(timeLeft <=0){


clearInterval(gameTimer);

clearInterval(heartInterval);



alert(
"Game Over ❤️ Your score is "+score
);


}



},1000);





heartInterval=setInterval(createHeart,600);



}





function createHeart(){



const area =
document.getElementById("heartArea");



const heart =
document.createElement("div");



heart.className="falling-heart";


heart.innerHTML="❤️";



heart.style.left =
Math.random()*450+"px";



heart.onclick=function(){


score++;


document.getElementById("score")
.innerHTML=score;


heart.remove();



};




area.appendChild(heart);



setTimeout(()=>{


heart.remove();


},4000);



}









/* =====================================
   CAKE BUILDER
===================================== */



function addDecoration(item){


const area =
document.getElementById("cakeDecorations");



area.innerHTML += item;



if(area.innerHTML.length > 0){


document.getElementById("cakeBanner")
.innerHTML=
"Happy Birthday Busayo ❤️";


}


}









/* =====================================
   23 REASONS
===================================== */



const reasons=[


"You bring happiness into my world ❤️",

"Your smile makes everything brighter",

"You are beautifully unique",

"You inspire me",

"You have a wonderful heart",

"You make ordinary moments special",

"Your kindness is unforgettable",

"You are someone worth celebrating",

"You create beautiful memories",

"You bring peace and joy",

"Your laughter is precious",

"You are stronger than you know",

"You deserve the best things in life",

"You make people feel special",

"You are truly one of a kind",

"Your presence is a gift",

"You make every day better",

"You are full of beautiful energy",

"You have an amazing soul",

"You make life sweeter",

"You are a beautiful story",

"You are deeply appreciated",

"You are simply awesome ❤️"


];






function createReasons(){


const container =
document.getElementById("envelopeContainer");



reasons.forEach((reason,index)=>{


const envelope =
document.createElement("div");



envelope.className=
"reason-envelope";



envelope.innerHTML=
"💌";



envelope.onclick=function(){


document.getElementById("reasonDisplay")
.innerHTML=
reason;


envelope.classList.add("open");


};



container.appendChild(envelope);



});



}



createReasons();









/* =====================================
   MAILBOX
===================================== */


function openMailbox(){


alert(
"A special letter is waiting for you 💌"
);



nextPage();


}









/* =====================================
   LOVE LETTER
===================================== */


const letterMessage = `

Dear Busayo,



Happy Birthday ❤️



I hope today reminds you how special,
valuable, and loved you are.



Every smile, every memory,
and every moment shared is something
I will always treasure.



Thank you for being you.



May this new year bring you endless happiness,
success, and beautiful surprises.



With all my heart,

`;



let letterStarted=false;



function openLetter(){


if(letterStarted) return;


letterStarted=true;


let index=0;


const output =
document.getElementById("letterText");



let typing=setInterval(()=>{


output.innerHTML +=
letterMessage[index];



index++;



if(index >= letterMessage.length){


clearInterval(typing);


}



},50);



}









/* =====================================
   FINAL MESSAGE
===================================== */



function revealLove(){



document.getElementById("loveReveal")
.innerHTML=

"I love you more than words could ever explain ❤️";



}









/* =====================================
   RESTART EXPERIENCE
===================================== */


function restartWebsite(){


location.reload();


}
