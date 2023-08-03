// Elements
const computer = document.getElementById("computer");
const keyboard = document.getElementById("keyboard");
const cardContainer = document.getElementById("card-container");
const parallaxContainer = document.getElementById("parallax-container");
const parallax1 = document.getElementById("parallax-1");
const parallax2 = document.getElementById("parallax-2");
const parallax3 = document.getElementById("parallax-3");
const parallax4 = document.getElementById("parallax-4");
const parallax5 = document.getElementById("parallax-5");
const parallax6 = document.getElementById("parallax-6");
const parallax7 = document.getElementById("parallax-7");

// Constants
const computerScrollUpSpeed = 0.5;
const splitComputerSpeed = 0.55;
const computerSizeUpSpeed = 0.0003;
const computerInitialTop = 60;
const computerFinalTop = 40;

// Global variables
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
let scrollComputerUpBreakpoint = 0.5 * viewportHeight;
let pauseComputerBreakpoint = 0.75 * viewportHeight;
let splitComputerBreakpoint = 2 * viewportHeight;

// const scrollComputerUpBreakpoint = 500;
// const pauseComputerBreakpoint = 750;
// const splitComputerBreakpoint = 2000;

const parallaxAnimation = (scrollDistance) => {
    parallax1.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.9) + 'px, 0px)';
    parallax2.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.8) + 'px, 0px)';
    parallax3.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.7) + 'px, 0px)';
    parallax4.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.6) + 'px, 0px)';
    parallax5.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.5) + 'px, 0px)';
    parallax6.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.3) + 'px, 0px)';
    parallax7.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.1) + 'px, 0px)';
}

const scrollComputerUp = (scrollDistance) => {
    // const y = scrollDistance * computerScrollUpSpeed;
    // const top = computerFinalTop + (computerInitialTop - computerFinalTop) * (1 - scrollDistance / scrollComputerUpBreakpoint);
    const top = 20 * scrollDistance / scrollComputerUpBreakpoint;

    computer.style.top = -top + 'vh';
    keyboard.style.top = -top + 'vh';
}

const pauseComputer = (scrollDistance, x, scale) => {
    const y = scrollDistance - scrollComputerUpBreakpoint * computerScrollUpSpeed;

    computer.style.top = -20 + 'vh';
    keyboard.style.top = -20 + 'vh';
    computer.style.transform = 'translate3d(' + x + 'px, 0px, 0px) scale(' + scale + ')';
    keyboard.style.transform = 'translate3d(' + -x + 'px, 0px, 0px) scale(' + scale + ')';
}

const splitComputer = (scrollDistance) => {
    const scrollDifference = scrollDistance - pauseComputerBreakpoint
    const x = scrollDifference * splitComputerSpeed;
    const y = scrollDistance - scrollComputerUpBreakpoint * computerScrollUpSpeed;
    const scale = 1 + scrollDifference * computerSizeUpSpeed;

    computer.style.top = -20 + 'vh';
    keyboard.style.top = -20 + 'vh';
    computer.style.transform = 'translate3d(' + x + 'px, 0px, 0px) scale(' + scale + ')';
    keyboard.style.transform = 'translate3d(' + -x + 'px, 0px, 0px) scale(' + scale + ')';

}

const onUpdate = (evt) => {
    const scrollDistance = window.scrollY;
    // viewportWidth = window.innerWidth

    if (scrollDistance < scrollComputerUpBreakpoint) {
        scrollComputerUp(scrollDistance);
        parallaxAnimation(scrollDistance);
    } else if (scrollDistance < pauseComputerBreakpoint) {
        pauseComputer(scrollDistance, 0, 1);
    } else if (scrollDistance < splitComputerBreakpoint) {
        splitComputer(scrollDistance);
    } else {
        const scrollDifference = splitComputerBreakpoint - pauseComputerBreakpoint
        const x = (scrollDifference) * splitComputerSpeed;
        const scale = 1 + (scrollDifference) * computerSizeUpSpeed;
        pauseComputer(scrollDistance, x, scale);
    }
}

document.addEventListener("scroll", onUpdate);

window.onload = onUpdate(null);
