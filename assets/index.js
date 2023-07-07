const productsContainer = document.querySelector(".contenedor-products");
const btnMore = document.querySelector (".btn-mas");
const containerCategories = document.querySelector (".categories");
const listOfCategories = document.querySelectorAll(".category");
const cartIcon = document.querySelector (".cart-label");
const cartOpen = document.querySelector (".cart-content");
const btnOfMenu = document.querySelector (".menu-label");
const contentOfMenu = document.querySelector (".navbar-list");
const overlay = document.querySelector (".overlay");
const cartProducts = document.querySelector (".cart-container");

let cart = JSON.parse(localStorage.getItem("cart-content")) || [];

const saveCart = () => {
    localStorage.setItem("cart-content", JSON.stringify());
};

// renderizar los productos
const createProductTemplate = (product) => {
    const{id, name, price, cardImg} = product;
    return `
        <div class="product">
            <img src=${cardImg} alt=${name}>
            <div class="info-product">
                <h3>${name}</h3>
                <p>$${price}</p>
                <button class="btn-comprar" data-id="${id}" data-name="${name}" data-price="$${price}" data-img="${cardImg}">Comprar</button>
            </div>
        </div>
    `;
};

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
        .map(createProductTemplate)
        .join("");
};

// Para desaparecer el btn ver mas cuando llega al ultimo producto
const theLastIndexOf = () =>{
    return appState.currentProductsIndex === appState.productsLimit - 1;
};

const moreProducts = () =>{
    appState.currentProductsIndex +=1;
    let {products, currentProductsIndex} = appState;
    renderProducts (products[currentProductsIndex]);
    if (theLastIndexOf()) {
        btnMore.classList.add("hidden");
    }
};

// para saber si es un boton inactivo de los botones de filtrar producto
const inactiveFilter = (element) => {
    return (
        element.classList.contains ("category") &&
        !element.classList.contains("active")
    );
};

const changeBtnActive = (selectCategory) => {
    const categories = [...listOfCategories];
    categories.forEach((btnCategory) => {
        if (btnCategory.dataset.category !== selectCategory){
            btnCategory.classList.remove("active");
            return;
        }
        btnCategory.classList.add("active");
    });
};

// mostrar el btn cuando se utilice una categoria
const setBtnVisibility = () => {
    if (!appState.activeFilter) {
        btnMore.classList.remove("hidden");
        return;
    }
    btnMore.classList.add("hidden");
}

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActive(appState.activeFilter);  
    setBtnVisibility();
};

const renderProductsFilter = () => {
    const filteredProducts = productsData.filter((product) => {
        return product.category === appState.activeFilter;
    });
    renderProducts(filteredProducts); 
}

// botones de filtrar productos
const btnForCategorie = ({ target }) => {
    if (!inactiveFilter(target)){   //chequea que sea btn y no este activo
        return;
    }
    changeFilterState(target); //cambia el estado del filtro
    productsContainer.innerHTML= ""; //si hay filtro activo renderizo prod filtrados
    if (appState.activeFilter){
        renderProductsFilter();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);  //si no hay filtro activo renderiza al primer array
};


//para que no se superponga carrito y menu (no funciona)

const btnCart = () => {
    cartOpen.classList.toggle("cart-open");
    if (contentOfMenu.classList.contains ("menu-open")) {
        contentOfMenu.classList.remove ("menu-open");
        return
    }
    overlay.classList.toggle("show-overlay");
};

const toggleMenu = () => {
    contentOfMenu.classList.toggle("menu-open");
    if (cartOpen.classList.contains ("cart-open")) {
        cartOpen.classList.remove ("cart-open");
        return;
    }
    overlay.classList.toggle("show-overlay");
};

const closeScroll = () => {  //no cierra
    if(!contentOfMenu.classList.contains("menu-open") &&
    !cartOpen.classList.contains ("cart-open")
    ){
        return;
    }
    contentOfMenu.classList.remove("menu-open");
    cartOpen.classList.remove("cart-open");
    overlay.classList.remove("show-overlay");
};

const closeOnClick = (e) => {
    if (!e.target.classList.contains("link-navbar")) {
		return;
    }
    contentOfMenu.classList.remove("menu-open");
    overlay.classList.remove("show-overlay");
};

const closeOverlayClick = () => {
	contentOfMenu.classList.remove("menu.open");
	cartOpen.classList.remove("cart-open");
	overlay.classList.remove("show-overlay");
};

//logica del carrito

const renderCart = () => {
    if (!cart.length) {
    cartProducts.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
    }
};  

const init = () =>{
    renderProducts(appState.products[appState.currentProductsIndex]);
    btnMore.addEventListener("click", moreProducts);
    containerCategories.addEventListener("click", btnForCategorie )
    cartIcon.addEventListener("click", btnCart);
    btnOfMenu.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeScroll);
    contentOfMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
};

init();

// function toggleMenu() {
//     var menu = document.getElementById('menu');
//     menu.classList.toggle('active');
//   }            ****para el menu hamburguesa hacerlo funcional