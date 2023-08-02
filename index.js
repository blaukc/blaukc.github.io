const computer = document.getElementById("computer");
const keyboard = document.getElementById("keyboard");
const cardContainer = document.getElementById("card-container");

const scrollComputerUpBreakpoint = 500;
const pauseComputerBreakpoint = 750;
const splitComputerBreakpoint = 2000;

const computerScrollUpSpeed = 0.5;
const splitComputerSpeed = 0.55;
const computerSizeUpSpeed = 0.0003;

const computerInitialTop = 60;
const computerFinalTop = 40;

cardContainer.style.top = (splitComputerBreakpoint + 400) + 'px'

const scrollComputerUp = (scrollDistance) => {
    const y = scrollDistance * computerScrollUpSpeed;
    const top = computerFinalTop + (computerInitialTop - computerFinalTop) * (1 - scrollDistance / scrollComputerUpBreakpoint);

    computer.style.top = top + 'vh';
    keyboard.style.top = top + 'vh';
    // computer.style.transform = 'translate3d(0px, ' + y + 'px, 0px) scale(1)';
    // keyboard.style.transform = 'translate3d(0px, ' + y + 'px, 0px) scale(1)';
}

const pauseComputer = (scrollDistance, x, scale) => {
    const y = scrollDistance - scrollComputerUpBreakpoint * computerScrollUpSpeed;

    computer.style.top = computerFinalTop + 'vh';
    keyboard.style.top = computerFinalTop + 'vh';
    computer.style.transform = 'translate3d(' + x + 'px, 0px, 0px) scale(' + scale + ')';
    keyboard.style.transform = 'translate3d(' + -x + 'px, 0px, 0px) scale(' + scale + ')';
    // computer.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ')';
    // keyboard.style.transform = 'translate3d(' + -x + 'px, ' + y + 'px, 0px) scale(' + scale + ')';
}

const splitComputer = (scrollDistance) => {
    const scrollDifference = scrollDistance - pauseComputerBreakpoint
    const x = scrollDifference * splitComputerSpeed;
    const y = scrollDistance - scrollComputerUpBreakpoint * computerScrollUpSpeed;
    const scale = 1 + scrollDifference * computerSizeUpSpeed;

    computer.style.top = computerFinalTop + 'vh';
    keyboard.style.top = computerFinalTop + 'vh';
    computer.style.transform = 'translate3d(' + x + 'px, 0px, 0px) scale(' + scale + ')';
    keyboard.style.transform = 'translate3d(' + -x + 'px, 0px, 0px) scale(' + scale + ')';
    // computer.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px) scale(' + scale + ')';
    // keyboard.style.transform = 'translate3d(' + -x + 'px, ' + y + 'px, 0px) scale(' + scale + ')';

}

document.addEventListener("scroll", (evt) => {
    const scrollDistance = window.scrollY;

    if (scrollDistance < scrollComputerUpBreakpoint) {
        scrollComputerUp(scrollDistance);
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
});