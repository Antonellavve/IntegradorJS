const btnMenu = document.querySelector(".menu-label"); 
const contentOfMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");


const menuToggle= () => {
    contentOfMenu.classList.toggle("menu-open");
    overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
    if (!e.target.classList.contains("navbar-list")) {
        return;
    }
    contentOfMenu.classList.remove("menu-open");
};

const closeOnOverlay = () => { 
    contentOfMenu.classList.remove("menu-open");
    overlay.classList.remove("show-overlay");
}


const init = () => {
    btnMenu.addEventListener("click", menuToggle);
    contentOfMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlay);
};

init();