// I will be creating a different pen with touch support but right // now I have no time for it due to school

const slider = document.querySelector(".carousel-items");
const slides = document.querySelectorAll(".carousel-item");
const button = document.querySelectorAll(".carousel-button");
const activeId = "carousel-active";
const prevId = "carousel-prev";
const nextId = "carousel-next"

const numSlides = slider.childElementCount;
let current = 0;
let prev = numSlides - 1;
let next = 1;

const gotoNum = number => {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].id = ""
    }

    if (next == numSlides) {
        next = 0;
    }

    if (prev == -1) {
        prev = numSlides - 1;
    }


    slides[current].id = activeId;
    slides[prev].id = prevId;
    slides[next].id = nextId;

    setTimeout(() => {
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
    }, 300)
}

const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);
const gotoNext = () => current < numSlides - 1 ? gotoNum(current + 1) : gotoNum(0);

const handleCarouselClick = (e) => {
    let target = e.currenTarget || e.srcElement;

    // Traverse up the DOM tree to find the parent with the ID
    while (!target.classList.contains("carousel-item")) {
        target = target.parentElement;
    }

    if (target.id === prevId) {
        gotoPrev();
    } else if (target.id === nextId) {
        gotoNext();
    } else if (target.id === activeId) {
        window.open(target.dataset.url);
    }
}

for (let i = 0; i < slides.length; i++) {
    slides[i].addEventListener("click", handleCarouselClick);
}