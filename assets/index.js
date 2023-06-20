const productsContainer = document.querySelector(".contenedor-products");
const showMoreBtn = document.querySelector (".btn-mas");

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

const showMoreProducts = () =>{
    appState.currentProductsIndex +=1;
    let {products, currentProductsIndex} = appState;
    renderProducts (products[currentProductsIndex]);
};

const init = () =>{
    renderProducts(appState.products[appState.currentProductsIndex]);
    showMoreBtn.addEventListener("click", showMoreProducts);
};

init();