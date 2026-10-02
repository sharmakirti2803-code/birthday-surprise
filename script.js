let number = 10;

const countdown = document.getElementById("countdown");
const celebration = document.getElementById("celebration");

const timer = setInterval(() => {

    number--;

    countdown.innerText = number;

    if (number === 0) {

        clearInterval(timer);

        countdown.style.transform =
            "translate(-50%, -50%) scale(8)";

        countdown.style.opacity = "0";

        setTimeout(() => {

            countdown.style.display = "none";

            celebration.classList.add("show");

        }, 500);
    }

}, 1000);