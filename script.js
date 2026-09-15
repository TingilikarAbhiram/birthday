/* =========================================
   BIRTHDAY WEBSITE
   SREE ❤️
========================================= */


const particlesContainer =
    document.getElementById("particles");

const heartsContainer =
    document.getElementById("hearts");

const replayButton =
    document.getElementById("replayButton");

const birthdayCard =
    document.getElementById("birthdayCard");

const page =
    document.querySelector(".page");


/* =========================================
   CREATE PARTICLES
========================================= */

function createParticles() {

    particlesContainer.innerHTML = "";

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";


        const size =
            Math.random() * 4 + 2;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        particle.style.animationDuration =
            3 + Math.random() * 5 + "s";

        particle.style.animationDelay =
            Math.random() * 5 + "s";


        particlesContainer.appendChild(
            particle
        );
    }
}


/* =========================================
   CREATE FLOATING HEARTS
========================================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add("heart");


    heart.innerHTML =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.bottom =
        "-20px";


    heart.style.fontSize =
        10 + Math.random() * 15 + "px";


    const duration =
        4 + Math.random() * 5;


    heart.style.animationDuration =
        duration + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);
}


/* =========================================
   HEART LOOP
========================================= */

function startHearts() {

    setInterval(() => {

        createHeart();

    }, 800);
}


/* =========================================
   REPLAY
========================================= */

function replayAnimation() {

    /*
        Stop all animations.
    */

    birthdayCard.style.animation =
        "none";


    const animatedElements =
        birthdayCard.querySelectorAll("*");


    animatedElements.forEach(
        element => {

            element.style.animation =
                "none";

        }
    );


    /*
        Force browser reflow.
    */

    void birthdayCard.offsetWidth;


    /*
        Start animations again.
    */

    birthdayCard.style.animation =
        "";


    animatedElements.forEach(
        element => {

            element.style.animation =
                "";

        }
    );
}


/* =========================================
   REPLAY BUTTON
========================================= */

replayButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        replayAnimation();

    }
);


/* =========================================
   3D CARD TILT
========================================= */

page.addEventListener(
    "pointermove",
    function (event) {

        const bounds =
            birthdayCard.getBoundingClientRect();

        const x =
            (event.clientX - bounds.left) / bounds.width - 0.5;

        const y =
            (event.clientY - bounds.top) / bounds.height - 0.5;

        birthdayCard.style.setProperty(
            "--tilt-y",
            `${x * 12}deg`
        );

        birthdayCard.style.setProperty(
            "--tilt-x",
            `${y * -12}deg`
        );
    }
);

page.addEventListener(
    "pointerleave",
    function () {

        birthdayCard.style.setProperty(
            "--tilt-x",
            "0deg"
        );

        birthdayCard.style.setProperty(
            "--tilt-y",
            "0deg"
        );
    }
);


/* =========================================
   CLICK SPARKLES
========================================= */

birthdayCard.addEventListener(
    "click",
    function (event) {

        if (
            event.target === replayButton ||
            replayButton.contains(event.target)
        ) {
            return;
        }


        for (let i = 0; i < 8; i++) {

            const sparkle =
                document.createElement("div");


            sparkle.innerHTML = "✦";


            sparkle.style.position =
                "absolute";


            sparkle.style.left =
                event.offsetX + "px";


            sparkle.style.top =
                event.offsetY + "px";


            sparkle.style.color =
                "white";


            sparkle.style.fontSize =
                "12px";


            sparkle.style.pointerEvents =
                "none";


            sparkle.style.zIndex =
                "100";


            sparkle.style.transition =
                "1s ease";


            birthdayCard.appendChild(
                sparkle
            );


            setTimeout(() => {

                sparkle.style.transform =
                    `
                    translate(
                        ${(Math.random() - 0.5) * 120}px,
                        ${(Math.random() - 0.5) * 120}px
                    )
                    scale(0)
                    `;

                sparkle.style.opacity =
                    "0";

            }, 20);


            setTimeout(() => {

                sparkle.remove();

            }, 1100);

        }

    }
);


/* =========================================
   START
========================================= */

createParticles();

startHearts();