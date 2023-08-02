const computer = document.getElementById("computer");
const keyboard = document.getElementById("keyboard");

const scrollComputerUpBreakpoint = 500;
const pauseComputerBreakpoint = 750;
const splitComputerBreakpoint = 2000;

const computerScrollUpSpeed = 0.5;
const splitComputerSpeed = 0.5;

const scrollComputerUp = (scrollDistance) => {
    const y = scrollDistance * computerScrollUpSpeed;

    computer.style.transform = 'translate3d(0px, ' + y + 'px, 0px)';
    keyboard.style.transform = 'translate3d(0px, ' + y + 'px, 0px)';
}

const pauseComputer = (scrollDistance, x) => {
    const y = scrollDistance - scrollComputerUpBreakpoint * computerScrollUpSpeed;

    computer.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
    keyboard.style.transform = 'translate3d(' + -x + 'px, ' + y + 'px, 0px)';
}

const splitComputer = (scrollDistance) => {
    const x = (scrollDistance - pauseComputerBreakpoint) * splitComputerSpeed;
    const y = scrollDistance - scrollComputerUpBreakpoint * computerScrollUpSpeed;

    computer.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
    keyboard.style.transform = 'translate3d(' + -x + 'px, ' + y + 'px, 0px)';
}

document.addEventListener("scroll", (evt) => {
    const scrollDistance = window.scrollY;

    if (scrollDistance < scrollComputerUpBreakpoint) {
        scrollComputerUp(scrollDistance);
    } else if (scrollDistance < pauseComputerBreakpoint) {
        pauseComputer(scrollDistance, 0);
    } else if (scrollDistance < splitComputerBreakpoint) {
        splitComputer(scrollDistance);
    } else {
        const x = (splitComputerBreakpoint - pauseComputerBreakpoint) * splitComputerSpeed;
        pauseComputer(scrollDistance, x);
    }
});