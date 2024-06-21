// Elements
const computerContainer = document.getElementById("computer-container");
const keyboardContainer = document.getElementById("keyboard-container");
const computerSpacer = document.getElementById("computer-spacer");
const cardContainer = document.getElementById("card-container");
const navbar = document.getElementById("navbar");
const parallaxContainer = document.getElementById("parallax-container");
const parallax1 = document.getElementById("parallax-1");
const parallax2 = document.getElementById("parallax-2");
const parallax3 = document.getElementById("parallax-3");
const parallax4 = document.getElementById("parallax-4");
const parallax5 = document.getElementById("parallax-5");
const parallax6 = document.getElementById("parallax-6");
const parallax7 = document.getElementById("parallax-7");
const cardWorkClassTablet = document.getElementById("card-workclass-tablet");
const cardCVWOMonitor = document.getElementById("card-cvwo-monitor");
const cardFoodpandaServer = document.getElementById("card-foodpanda-server");
const languagesSkillCard = document.getElementById("languages-skills-card");
const frameworksSkillCard = document.getElementById("frameworks-skills-card");
const toolsSkillCard = document.getElementById("tools-skills-card");

// Constants
const cardContainerWidth = {
    desktop: 50,
    tablet: 70,
    mobile: 90,
}
const breakpoints = {
    // Breakpoints are measured in vh, and assumes that parallax-container and computer-spacer take up total of 75vh
    scrollComputerUp: 50,
    pause: 75,
    splitComputer: 175,
    foodpanda: 200,
    cvwo: 230,
    workclass: 260,
    skills: 400,
}
computerSpacer.style.height = breakpoints.splitComputer + 'vh';

// remove these when possible
const splitComputerSpeed = 0.55;
const computerSizeUpSpeed = 0.0003;

// Global variables
let viewportWidth, viewportHeight, scrollComputerUpBreakpoint, pauseComputerBreakpoint, splitComputerBreakpoint,
    foodpandaBreakpoint, cvwoBreakpoint, workclassBreakpoint, skillsBreakpoint, isMobile, isTablet, isDesktop;

const mountainParallaxAnimation = (scrollDistance) => {
    if (isDesktop) {
        parallax1.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.9) + 'px, 0px)';
        parallax2.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.8) + 'px, 0px)';
        parallax3.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.7) + 'px, 0px)';
        parallax4.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.6) + 'px, 0px)';
        parallax5.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.5) + 'px, 0px)';
        parallax6.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.3) + 'px, 0px)';
        parallax7.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.1) + 'px, 0px)';
    } else if (isMobile || isTablet) {
        parallax1.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.4) + 'px, 0px)';
        parallax2.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.35) + 'px, 0px)';
        parallax3.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.3) + 'px, 0px)';
        parallax4.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.25) + 'px, 0px)';
        parallax5.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.2) + 'px, 0px)';
        parallax6.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.15) + 'px, 0px)';
        parallax7.style.transform = 'translate3d(0px, ' + (scrollDistance * 0.1) + 'px, 0px)';
    }
}

const scrollComputerUp = (scrollDistance) => {
    // const top = computerFinalTop + (computerInitialTop - computerFinalTop) * (1 - scrollDistance / scrollComputerUpBreakpoint);
    const top = 20 * scrollDistance / scrollComputerUpBreakpoint;

    computerContainer.style.top = -top + 'vh';
    keyboardContainer.style.top = -top + 'vh';
}

const changeNavBarColor = (scrollDistance) => {
    const gradients = ["--gradient-1", "--gradient-2", "--gradient-3", "--gradient-4", "--gradient-5", "--gradient-6", "--gradient-7", "--gradient-8"];
    const numIntervals = gradients.length // There are 8 colors from --gradient-1 to --gradient-8;
    const colorChangeHeightInterval = Math.floor(pauseComputerBreakpoint / numIntervals);
    const colorIndex = Math.floor(scrollDistance / colorChangeHeightInterval);

    // If valid index:
    if (colorIndex < numIntervals && colorIndex >= 0) {
        navbar.style.color = `var(${gradients[colorIndex]})`;
    }

    // Set the background to a gradient once on gradient 8
    if (colorIndex >= numIntervals - 1) {
        navbar.style.background = "linear-gradient(to bottom, var(--gradient-1-rgb-opaque) 70%, var(--gradient-1-rgb-transparent))"
    } else {
        navbar.style.background = ""
    }
}
const pauseComputer = (scrollDistance, x, scale) => {
    computerContainer.style.top = -20 + 'vh';
    keyboardContainer.style.top = -20 + 'vh';
    computerContainer.style.left = x + 'px';
    keyboardContainer.style.right = x + 'px';
}

const getHorizontalDisplacementAndScale = (scrollDistance) => {
    let x, scale;
    const scrollDifference = scrollDistance - pauseComputerBreakpoint;
    if (isDesktop) {
        const splitDistanceInViewWidth = 70;
        const splitDistance = viewportWidth * splitDistanceInViewWidth / 100;
        x = splitDistance * (scrollDifference) / (splitComputerBreakpoint - pauseComputerBreakpoint)
        scale = 1;
    } else if (isTablet) {
        const splitDistanceInViewWidth = 65;
        const splitDistance = viewportWidth * splitDistanceInViewWidth / 100;
        x = splitDistance * (scrollDifference) / (splitComputerBreakpoint - pauseComputerBreakpoint)
        scale = 1;
    } else if (isMobile) {
        const splitDistanceInViewWidth = 65;
        const splitDistance = viewportWidth * splitDistanceInViewWidth / 100;
        x = splitDistance * (scrollDifference) / (splitComputerBreakpoint - pauseComputerBreakpoint)
        scale = 1;
    }
    return [x, scale];
}

const splitComputer = (scrollDistance) => {
    const [x, scale] = getHorizontalDisplacementAndScale(scrollDistance);

    computerContainer.style.top = -20 + 'vh';
    keyboardContainer.style.top = -20 + 'vh';
    computerContainer.style.left = x + 'px';
    keyboardContainer.style.right = x + 'px';
}

const tabletParallaxAnimation = (scrollDistance) => {
    const scrollDifference = scrollDistance - workclassBreakpoint;
    const y = scrollDifference * 0.2 - 0.25 * viewportHeight;
    cardWorkClassTablet.style.transform = 'translate3d(0px, ' + y + 'px, 0px) skew(' + scrollDifference * 0.0075 + 'deg, 0deg)';
}

const monitorParallaxAnimation = (scrollDistance) => {
    const scrollDifference = scrollDistance - cvwoBreakpoint;
    const x = -scrollDifference * 0.125 + 0.15 * viewportHeight;
    const deg = scrollDifference * 0.02;

    cardCVWOMonitor.style.transform = 'translate3d(' + x + 'px, 0px, 0px) rotate3d(0, 1, 0, ' + deg + 'deg)';
}

const serverParallaxAnimation = (scrollDistance) => {
    const scrollDifference = scrollDistance - foodpandaBreakpoint;
    const vhToMax = 75;
    const pixelsToMax = vhToMax / 100 * viewportHeight;
    const scale = Math.min(scrollDifference / pixelsToMax, 1);

    cardFoodpandaServer.style.transform = 'scale(' + scale + ')';
}

const skillsAnimation = (scrollDistance) => {
    const scrollDifference = scrollDistance - skillsBreakpoint;
    const skillsBreakpointGap = 40
    const languagesBreakpoint = skillsBreakpointGap / 100 * viewportHeight;
    const frameworksBreakpoint = skillsBreakpointGap * 2 / 100 * viewportHeight;
    const toolsBreakpoint = skillsBreakpointGap * 3 / 100 * viewportHeight;
    let languagesBreakpointOpacity, frameworksBreakpointOpacity, toolsBreakpointOpacity;
    languagesBreakpointOpacity = Math.min(scrollDifference / languagesBreakpoint, 1);
    frameworksBreakpointOpacity = Math.min(scrollDifference / frameworksBreakpoint, 1);
    toolsBreakpointOpacity = Math.min(scrollDifference / toolsBreakpoint, 1);

    languagesSkillCard.style.opacity = languagesBreakpointOpacity;
    frameworksSkillCard.style.opacity = frameworksBreakpointOpacity;
    toolsSkillCard.style.opacity = toolsBreakpointOpacity;
}

const onUpdate = (evt) => {
    const scrollDistance = window.scrollY;

    // We want this to always update
    changeNavBarColor(scrollDistance);

    if (scrollDistance < scrollComputerUpBreakpoint) {
        scrollComputerUp(scrollDistance);
        mountainParallaxAnimation(scrollDistance);
    } else if (scrollDistance < pauseComputerBreakpoint) {
        pauseComputer(scrollDistance, 0, 1);
    } else if (scrollDistance < splitComputerBreakpoint) {
        splitComputer(scrollDistance);
    } else {
        const [x, scale] = getHorizontalDisplacementAndScale(splitComputerBreakpoint);
        pauseComputer(scrollDistance, x, scale);
        tabletParallaxAnimation(scrollDistance);
        monitorParallaxAnimation(scrollDistance);
        serverParallaxAnimation(scrollDistance);
        skillsAnimation(scrollDistance);
    }
}

const updateState = (evt) => {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    scrollComputerUpBreakpoint = breakpoints.scrollComputerUp / 100 * viewportHeight;
    pauseComputerBreakpoint = breakpoints.pause / 100 * viewportHeight;
    splitComputerBreakpoint = breakpoints.splitComputer / 100 * viewportHeight;
    foodpandaBreakpoint = breakpoints.foodpanda / 100 * viewportHeight;
    cvwoBreakpoint = breakpoints.cvwo / 100 * viewportHeight;
    workclassBreakpoint = breakpoints.workclass / 100 * viewportHeight;
    skillsBreakpoint = breakpoints.skills / 100 * viewportHeight;
    isMobile = viewportWidth < 768;
    isTablet = viewportWidth >= 768 && viewportWidth < 1024;
    isDesktop = viewportWidth >= 1024;
    onUpdate(null);
}

updateState(null);

document.addEventListener("scroll", onUpdate);
window.addEventListener("resize", updateState);

window.onload = onUpdate(null);

