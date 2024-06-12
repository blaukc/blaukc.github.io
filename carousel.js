// I will be creating a different pen with touch support but right // now I have no time for it due to school

const slider = document.querySelector(".carousel-items");
const slides = document.querySelectorAll(".carousel-item");
const button = document.querySelectorAll(".carousel-button");

const numSlides = slider.childElementCount - 1; // minus 1 because we dont count the button container
let current = 0;
let prev = numSlides - 1;
let next = 1;

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
}

const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

const gotoNext = () => current < numSlides - 1 ? gotoNum(current + 1) : gotoNum(0);

const gotoNum = number => {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("carousel-active");
        slides[i].classList.remove("carousel-prev");
        slides[i].classList.remove("carousel-next");
    }

    if (next == numSlides) {
        next = 0;
    }

    if (prev == -1) {
        prev = numSlides - 1;
    }

    slides[current].classList.add("carousel-active");
    slides[prev].classList.add("carousel-prev");
    slides[next].classList.add("carousel-next");
}