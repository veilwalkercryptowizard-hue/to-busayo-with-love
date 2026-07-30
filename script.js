// Loading Screen
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
    }, 2500);
});

// Password
function checkPassword() {
    const password = document.getElementById("password").value.trim();

    if (
        password === "July" ||
        password === "july"
    ) {
        document.getElementById("password-screen").style.display = "none";
        document.getElementById("website").style.display = "block";
        window.scrollTo(0, 0);
    } else {
        document.getElementById("error").innerHTML =
            "Wrong password ❤️";
    }
}

// Music
function playMusic() {
    document.getElementById("music").play();
}

// Countdown
const birthday = new Date("July 31, 2026 00:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        /
        1000
    );

    const timer = document.getElementById("countdownTimer");

    if (timer) {

        timer.innerHTML =
            days +
            " Days " +
            hours +
            " Hours " +
            minutes +
            " Minutes " +
            seconds +
            " Seconds";

    }

}, 1000);

// Cake
const cake = document.getElementById("cakeButton");

if (cake) {

    cake.addEventListener("click", () => {

        cake.innerHTML = "🎉 Happy Birthday Busayo! 🎉";

        confetti();

    });

}

// Simple Confetti
function confetti() {

    for (let i = 0; i < 150; i++) {

        let piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}

// Easter Egg
document.addEventListener("keydown", function(e){

    if(e.key === "b" || e.key === "B"){

        alert("🤍 You found the hidden surprise! Happy Birthday Busayo!");

    }

});
