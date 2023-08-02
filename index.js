const computer = document.getElementById("computer");
const keyboard = document.getElementById("keyboard");

const scrollComputerUpBreakpoint = 500;
const pauseComputerBreakpoint = 1000;
const splitComputerBreakpoint = 2250;

const computerScrollUpSpeed = 0.5;
const splitComputerSpeed = 0.5;
const computerSizeUpSpeed = 0.005;

const computerSize = 25;
computer.style.height = computerSize + 'vh';
computer.style.width = computerSize + 'vh';
keyboard.style.height = computerSize + 'vh';
keyboard.style.width = computerSize + 'vh';

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
    const scrollDifference = scrollDistance - pauseComputerBreakpoint
    const x = scrollDifference * splitComputerSpeed;
    const y = scrollDistance - scrollComputerUpBreakpoint * computerScrollUpSpeed;

    computer.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
    keyboard.style.transform = 'translate3d(' + -x + 'px, ' + y + 'px, 0px)';

    const newComputerSize = computerSize + scrollDifference * computerSizeUpSpeed;
    computer.style.height = newComputerSize + 'vh';
    computer.style.width = newComputerSize + 'vh';
    keyboard.style.height = newComputerSize + 'vh';
    keyboard.style.width = newComputerSize + 'vh';
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