// Elements
// navbar declared in index
const whoamiNavbar = navbar.children[0];
const experienceNavbar = navbar.children[1];
const skillsNavbar = navbar.children[2];
const certificationsNavbar = navbar.children[3];
const contactmeNavbar = navbar.children[4];
const whoami = document.getElementById("intro");
const experience = document.getElementById("experience-header");
const skills = document.getElementById("skills-header");
const certifications = document.getElementById("certifications-header");
const contactme = document.getElementById("contact-header");


whoamiNavbar.addEventListener("click", () => whoami.scrollIntoView({ behavior: "smooth", block: "center" }));
experienceNavbar.addEventListener("click", () => experience.scrollIntoView({ behavior: "smooth", block: "center" }));
skillsNavbar.addEventListener("click", () => skills.scrollIntoView({ behavior: "smooth", block: "center" }));
certificationsNavbar.addEventListener("click", () => certifications.scrollIntoView({ behavior: "smooth", block: "center" }));
contactmeNavbar.addEventListener("click", () => contactme.scrollIntoView({ behavior: "smooth", block: "center" }));