// Elements
const keyboard = document.getElementById("keyboard-shape");
const computerScreen = document.getElementById("computer-screen-shape");
const clickme = document.getElementById("clickme");
const clickmeagain = document.getElementById("clickmeagain");
const githubScreen = document.getElementById("computer-screen-github");
const linkedInScreen = document.getElementById("computer-screen-linkedin");
const mailScreen = document.getElementById("computer-screen-mail");

const screenRotation = [githubScreen, linkedInScreen, mailScreen];
const linkRotation = ["https://github.com/blaukc", "https://www.linkedin.com/in/blaukc/", "mailto:brandonlau1@hotmail.com"];

let currentRotation = -1;
let firstClick = false, secondClick = false;
const onClickKeyboard = (evt) => {
    if (!firstClick) {
        computerScreen.style.cursor = 'pointer';
        clickme.style.display = 'none';
        clickmeagain.style.display = 'block';
        firstClick = true;
    } else if (!secondClick) {
        clickmeagain.style.display = 'none';
        secondClick = true;
    }

    currentRotation += 1;
    if (currentRotation >= screenRotation.length) {
        currentRotation = 0;
    }

    for (let i = 0; i < screenRotation.length; i++) {
        if (i === currentRotation) {
            screenRotation[i].style.display = 'block';
        } else {
            screenRotation[i].style.display = 'none';
        }
    }
}

keyboard.addEventListener("click", onClickKeyboard);

const onClickComputerScreen = (evt) => {
    if (currentRotation === -1) {
        return;
    } 

    window.open(linkRotation[currentRotation], "_blank")
}

computerScreen.addEventListener("click", onClickComputerScreen);

const onHoverComputerScreen = (evt) => {
    if (currentRotation === -1) {
        return;
    } 

    screenRotation[currentRotation].style.opacity = 0.8;
}

computerScreen.addEventListener("mouseover", onHoverComputerScreen);


const onBlurComputerScreen = (evt) => {
    if (currentRotation === -1) {
        return;
    } 

    screenRotation[currentRotation].style.opacity = 1;
}

computerScreen.addEventListener("mouseout", onBlurComputerScreen);
