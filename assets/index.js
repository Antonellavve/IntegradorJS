const productsContainer = document.querySelector(".contenedor-products");
const btnMore = document.querySelector (".btn-mas");
const containerCategories = document.querySelector (".categories");
const listOfCategories = document.querySelectorAll(".category")

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
}

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
const setBtnVisibility = () =>{
    if (!appState.activeFilter) {
        btnMore.classList.add("hidden");
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

const init = () =>{
    renderProducts(appState.products[appState.currentProductsIndex]);
    btnMore.addEventListener("click", moreProducts);
    containerCategories.addEventListener("click", btnForCategorie )
};

init();