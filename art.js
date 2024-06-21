const navBar = document.getElementById("navbar");

const portfolioToNavBarMap = {
    0: "videography",
    1: "photography",
}

const getOnClickNavBarHandler = (index) => {
    return () => {
        for (let i = 0; i < navBar.childElementCount; i++) {
            if (i === index) {
                navBar.children[i].style.textDecoration = "underline";
                document.getElementById(portfolioToNavBarMap[i]).style.display = "flex";
            } else {
                navBar.children[i].style.textDecoration = "none";
                document.getElementById(portfolioToNavBarMap[i]).style.display = "none";
            }
        }

    }
}

for (let i = 0; i < navBar.childElementCount; i++) {
    navBar.children[i].addEventListener("click", getOnClickNavBarHandler(i));
}