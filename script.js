let number = 10;

const countdown = document.getElementById("countdown");
const startScreen = document.getElementById("startScreen");
const celebration = document.getElementById("celebration");

let audioContext;


/* =========================
   START
========================= */

function startBirthday() {

    startScreen.style.display = "none";

    countdown.style.display = "block";

    // Start browser audio
    audioContext =
        new (window.AudioContext ||
        window.webkitAudioContext)();

    startCountdown();
}


/* =========================
   COUNTDOWN
========================= */

function startCountdown() {

    countdown.innerText = number;

    // First sound
    playTick();

    const timer = setInterval(() => {

        number--;

        countdown.innerText = number;


        // Countdown sound
        if (number > 0) {

            playTick();

        }


        /* =========================
           WHEN COUNTDOWN REACHES 0
        ========================= */

        if (number === 0) {

            clearInterval(timer);

            // BIG BOOM
            playFinalImpact();


            // Zoom 0
            countdown.style.animation =
                "zoom .9s ease forwards";


            setTimeout(() => {

                countdown.style.display = "none";

                celebration.style.display = "flex";


                // 🎉 Birthday reveal sound
                playBirthdayReveal();

            }, 900);
        }

    }, 1000);
}


/* =========================
   CINEMATIC COUNTDOWN TICK
========================= */

function playTick() {

    /*
       Main tick
    */

    const osc =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    osc.type = "sine";


    // Pitch increases as countdown gets closer to 0

    const pitch =
        130 + (10 - number) * 25;


    osc.frequency.setValueAtTime(
        pitch,
        audioContext.currentTime
    );


    gain.gain.setValueAtTime(
        0.001,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.35,
        audioContext.currentTime + 0.02
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.45
    );


    osc.connect(gain);

    gain.connect(
        audioContext.destination
    );


    osc.start();

    osc.stop(
        audioContext.currentTime + 0.5
    );


    /*
       Low bass beat
    */

    const bass =
        audioContext.createOscillator();

    const bassGain =
        audioContext.createGain();


    bass.type = "triangle";


    bass.frequency.value =
        65 + (10 - number) * 8;


    bassGain.gain.setValueAtTime(
        0.25,
        audioContext.currentTime
    );


    bassGain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.3
    );


    bass.connect(bassGain);

    bassGain.connect(
        audioContext.destination
    );


    bass.start();

    bass.stop(
        audioContext.currentTime + 0.35
    );
}


/* =========================
   FINAL 0 IMPACT
========================= */

function playFinalImpact() {

    /*
       DEEP BOOM
    */

    const boom =
        audioContext.createOscillator();

    const boomGain =
        audioContext.createGain();


    boom.type = "sine";


    boom.frequency.setValueAtTime(
        90,
        audioContext.currentTime
    );


    boom.frequency.exponentialRampToValueAtTime(
        25,
        audioContext.currentTime + 1.2
    );


    boomGain.gain.setValueAtTime(
        0.8,
        audioContext.currentTime
    );


    boomGain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 1.2
    );


    boom.connect(boomGain);

    boomGain.connect(
        audioContext.destination
    );


    boom.start();

    boom.stop(
        audioContext.currentTime + 1.2
    );


    /*
       BRIGHT SPARKLE
    */

    const sparkle =
        audioContext.createOscillator();

    const sparkleGain =
        audioContext.createGain();


    sparkle.type = "sine";


    sparkle.frequency.setValueAtTime(
        600,
        audioContext.currentTime
    );


    sparkle.frequency.exponentialRampToValueAtTime(
        1400,
        audioContext.currentTime + 1
    );


    sparkleGain.gain.setValueAtTime(
        0.001,
        audioContext.currentTime
    );


    sparkleGain.gain.exponentialRampToValueAtTime(
        0.25,
        audioContext.currentTime + 0.15
    );


    sparkleGain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 1
    );


    sparkle.connect(sparkleGain);

    sparkleGain.connect(
        audioContext.destination
    );


    sparkle.start();

    sparkle.stop(
        audioContext.currentTime + 1
    );
}


/* =========================
   🎉 BIRTHDAY REVEAL SOUND
========================= */

function playBirthdayReveal() {

    const now =
        audioContext.currentTime;


    /*
       MAIN CELEBRATION CHORD
    */

    const notes = [
        261.63,
        329.63,
        392.00,
        523.25
    ];


    notes.forEach((frequency, index) => {

        const osc =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        osc.type = "sine";

        osc.frequency.value =
            frequency;


        /*
           Each note starts slightly
           after the previous one.
        */

        const startTime =
            now + (index * 0.12);


        gain.gain.setValueAtTime(
            0.001,
            startTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.30,
            startTime + 0.08
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            startTime + 1.8
        );


        osc.connect(gain);

        gain.connect(
            audioContext.destination
        );


        osc.start(startTime);

        osc.stop(
            startTime + 2
        );

    });


    /*
       ✨ BRIGHT SPARKLE
    */

    const sparkle =
        audioContext.createOscillator();

    const sparkleGain =
        audioContext.createGain();


    sparkle.type = "triangle";


    sparkle.frequency.setValueAtTime(
        900,
        now
    );


    sparkle.frequency.exponentialRampToValueAtTime(
        1800,
        now + 0.7
    );


    sparkleGain.gain.setValueAtTime(
        0.001,
        now
    );


    sparkleGain.gain.exponentialRampToValueAtTime(
        0.20,
        now + 0.1
    );


    sparkleGain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 1
    );


    sparkle.connect(sparkleGain);

    sparkleGain.connect(
        audioContext.destination
    );


    sparkle.start(now);

    sparkle.stop(
        now + 1
    );
}
