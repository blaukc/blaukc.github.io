// Elements
const computer = document.getElementById("computer");
const keyboard = document.getElementById("keyboard");
const computerSpacer = document.getElementById("computer-spacer");
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
const cardContainerWidth = {
    desktop: 40,
    tablet: 70,
    mobile: 90,
}
const breakpoints = {
    // Breakpoints are measured in vh, and assumes that parallax-container and computer-spacer take up total of 75vh
    scrollComputerUp: 50,
    pause: 100,
    splitComputer: 175,
}
computerSpacer.style.height = breakpoints.splitComputer + 'vh';

// remove these when possible
const splitComputerSpeed = 0.55;
const computerSizeUpSpeed = 0.0003;

// Global variables
let viewportWidth, viewportHeight, scrollComputerUpBreakpoint, pauseComputerBreakpoint, splitComputerBreakpoint, isMobile, isTablet, isDesktop;

const parallaxAnimation = (scrollDistance) => {
    // TODO: make separate slower one for mobile/tablet
    parallax1.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.9) + 'px, 0px)';
    parallax2.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.8) + 'px, 0px)';
    parallax3.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.7) + 'px, 0px)';
    parallax4.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.6) + 'px, 0px)';
    parallax5.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.5) + 'px, 0px)';
    parallax6.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.3) + 'px, 0px)';
    parallax7.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.1) + 'px, 0px)';
}

const scrollComputerUp = (scrollDistance) => {
    // const top = computerFinalTop + (computerInitialTop - computerFinalTop) * (1 - scrollDistance / scrollComputerUpBreakpoint);
    const top = 20 * scrollDistance / scrollComputerUpBreakpoint;

    computer.style.top = -top + 'vh';
    keyboard.style.top = -top + 'vh';
}

const pauseComputer = (scrollDistance, x, scale) => {
    computer.style.top = -20 + 'vh';
    keyboard.style.top = -20 + 'vh';
    computer.style.transform = 'translate3d(' + x + 'px, 0px, 0px) scale(' + scale + ')';
    keyboard.style.transform = 'translate3d(' + -x + 'px, 0px, 0px) scale(' + scale + ')';
}

const getHorizontalDisplacementAndScale = (scrollDistance) => {
    let x;
    const scrollDifference = scrollDistance - pauseComputerBreakpoint;
    if (isDesktop) {
        const splitDistanceInViewWidth = (100 - cardContainerWidth.desktop) / 2;
        const splitDistance = viewportWidth * splitDistanceInViewWidth / 100;
        x = splitDistance * (scrollDifference) / (splitComputerBreakpoint - pauseComputerBreakpoint)
    } else if (isTablet) {
        x = scrollDifference * splitComputerSpeed;
    } else if (isMobile) {
        x = scrollDifference * splitComputerSpeed;
    }
    const scale = 1 + scrollDifference * computerSizeUpSpeed;
    return [x, scale];
}

const splitComputer = (scrollDistance) => {
    const [x, scale] = getHorizontalDisplacementAndScale(scrollDistance);

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
        const [x, scale] = getHorizontalDisplacementAndScale(splitComputerBreakpoint);
        pauseComputer(scrollDistance, x, scale);
    }
}

const updateState = (evt) => {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    scrollComputerUpBreakpoint = breakpoints.scrollComputerUp / 100 * viewportHeight;
    pauseComputerBreakpoint = breakpoints.pause / 100 * viewportHeight;
    splitComputerBreakpoint = breakpoints.splitComputer / 100 * viewportHeight;
    isMobile = viewportWidth < 768;
    isTablet = viewportWidth >= 768 && viewportWidth < 1024;
    isDesktop = viewportWidth >= 1024;
    onUpdate(null);
}

updateState(null);

document.addEventListener("scroll", onUpdate);
window.addEventListener("resize", updateState);

window.onload = onUpdate(null);
