const productsContainer = document.querySelector(".contenedor-products");
const btnMore = document.querySelector (".btn-more");
const containerCategories = document.querySelector (".categories");
const listOfCategories = document.querySelectorAll(".category");
const cartIcon = document.querySelector (".cart-label");
const cartOpen = document.querySelector (".cart");
const btnOfMenu = document.querySelector (".menu-label");
const contentOfMenu = document.querySelector (".navbar-list");
const overlay = document.querySelector (".overlay");
const productsCart = document.querySelector (".cart-container");
const total = document.querySelector (".total");
const eventModal = document.querySelector (".add-modal");
const btnBuy = document.querySelector (".btn-buy-cart");
const btnDelete = document.querySelector (".btn-delete");
const bubble = document.querySelector (".cart-bubble");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
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
                <button class="btn-buy" data-id="${id}" data-name="${name}" data-price="$${price}" data-img="${cardImg}">Comprar</button>
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
};

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
};

// botones de filtrar productos
const btnForCategorie = ({ target }) => {
    if (!inactiveFilter(target)){ 
        return;
    }
    changeFilterState(target); 
    productsContainer.innerHTML= ""; 
    if (appState.activeFilter){
        renderProductsFilter();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};


//para que no se superponga carrito y menu

const toggleCart = () => {
    cartOpen.classList.toggle("cart-open");
    if (contentOfMenu.classList.contains ("menu-open")) {
        contentOfMenu.classList.remove ("menu-open");
        return;
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

const closeScroll = () => { 
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
	contentOfMenu.classList.remove("menu-open");
	cartOpen.classList.remove("cart-open");
	overlay.classList.remove("show-overlay");
};

//logica del carrito

const createCartProductTemplate = (productsCart) => {
	const { id, name, price, img, quantity } = productsCart;
	return `
	<div class="cart-select">
		<img
			src=${img}
			alt="imagen del producto"
		/>
		<div class="select-info">
			<h3 class="select-name">${name}</h3>
			<span class="select-price">${price}</span>
		</div>
		<div class="select-handler">
			<span class="quantity-handler less" data-id=${id}>-</span>
			<span class="select-quantity">${quantity}</span>
			<span class="quantity-handler more" data-id=${id}>+</span>
		</div>
	</div>
	`;
};

const renderCartProduct = () => {
    if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
    return;
    } 
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};  

const getTotal = () => {
    return cart.reduce((acc, val) => {
    const price = parseFloat(
        val.price.replace("$", "").replace(".", "").replace(",", ".")
    );
      return acc + price * val.quantity;
},0);
};

const cartTotal = () => {
    const totalValue = getTotal().toFixed(2);
    total.innerHTML = `$${totalValue}`;
};

const desestructuringProductData = (product) => {
    const {id, name, price, img} = product;
    return {id, name, price, img};
};

const ifProductExisting = (productId) => {
    return cart.find((item) => {
        return item.id === productId;
    });
};

const buyUnitMore = (product) => {
    cart = cart.map ((productsCart) => {
        return productsCart.id === product.id
        ? {...productsCart, quantity: productsCart.quantity + 1}
        : productsCart;
    });
};

const showEventModal = (msg) => {
    eventModal.classList.add ("active-modal");
    eventModal.textContent = msg;
    setTimeout(() => {
        eventModal.classList.remove("active-modal");
    }, 1500);
};

const createCartProduct = (product) => {
    cart = [
        ...cart,
        {
            ...product,
            quantity: 1,
        },
    ];
};

const btnDisabled = (btn) => {
    if(!cart.length) {
        btn.classList.add ("disabled");
    } else {
        btn.classList.remove ("disabled");
    };
};

const renderBubbleOfCart = () => {
    bubble.textContent = cart.reduce ((acc, val) => {
        return acc + val.quantity;
    }, 0);
};

const updateCartState = () => {
    saveCart();
    renderCartProduct();
    cartTotal();
    btnDisabled(btnBuy);
    btnDisabled(btnDelete);
    renderBubbleOfCart();
};

const productAdd = (e) => {
    if(!e.target.classList.contains ("btn-buy-cart")) {
        return;
    }
    const product = desestructuringProductData(e.target.dataset);
    if (ifProductExisting (product.id)){
        buyUnitMore(product);
        showEventModal("Se agrego un producto al carrito");
    } else{
        createCartProduct (product);
        showEventModal("El producto está en el carrito");
    }
    updateCartState();
};

const removeProductInTheCart = (ifProductExisting) => {
    cart = cart.filter((product) =>{
        return product.id !== ifProductExisting.id
    });
    updateCartState();
};

const substractProduct = (ifProductExisting) => {
    cart = cart.map ((product) => {
        return product.id === ifProductExisting.id
        ? {... product, quantity: Number (product.quantity) - 1}
        : product;
    });
};

const btnLessEvent = (id) => {
    const ifProductExisting = cart.find ((item) => item.id === id);
    if (ifProductExisting.quantity === 1){
        if(window.confirm("¿Estas seguro de eliminar el producto del carrito?")) {
            removeProductInTheCart (ifProductExisting);
        }
        return;
    }
    substractProduct(ifProductExisting);
};

const btnMoreEvent = (id) => {
    const ifProductExisting = cart.find ((item) => item.id === id);
    buyUnitMore (ifProductExisting);
};

const quantityHandler = (e) => {
    if (e.target.classList.contains ("less")){
        btnLessEvent (e.target.dataset.id);
    }else if (e.target.classList.contains ("more")){
        btnMoreEvent (e.target.dataset.id);
    }
    updateCartState();
};

const resetCart = () => {
    cart = [];
    updateCartState();
};

const completeCartAction = (msgConfirm, msgSuccess)  => {
    if (!cart.length) return;
    if (window.confirm (msgConfirm)){
        resetCart();
        alert(msgSuccess);
    };
};

const buyComplete = () => {
    completeCartAction("¿Querés finalizar tu compra?", "Muchas Gracias por tu compra!");
};

const deleteCart = () => {
    completeCartAction ("¿Estas seguro de vaciar el carrito?", "No quedan productos en el carrito");
};

const init = () =>{
    renderProducts(appState.products[appState.currentProductsIndex]);
    btnMore.addEventListener("click", moreProducts);
    containerCategories.addEventListener("click", btnForCategorie )
    cartIcon.addEventListener("click", toggleCart);
    btnOfMenu.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeScroll);
    contentOfMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCartProduct);
    document.addEventListener ("DOMContentLoaded", cartTotal);
    productsContainer.addEventListener ("click", productAdd);
    productsCart.addEventListener ("click", quantityHandler);
    btnBuy.addEventListener ("click", buyComplete);
    btnDelete.addEventListener ("click", deleteCart);
    btnDisabled(btnBuy);
    btnDisabled(btnDelete);
    renderBubbleOfCart();
};

init();
