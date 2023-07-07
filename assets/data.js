const productsData = [
    {
        id: 1,
        name: "Botines Low",
		price: 45.999,
		category: "futbol",
		cardImg: "./assets/img/products/botines-low.webp",
    },
    {
        id: 2,
        name: "Botines Naranja",
        price: 59.999,
        category: "futbol",
        cardImg: "./assets/img/products/botines-naranjas.webp",
    },
    {
        id: 3,
        name: "Botines X",
        price: 41.499 ,
        category: "futbol",
        cardImg: "./assets/img/products/botines-X.webp",
    },
    {
        id: 4,
        name: "Conjunto Infantil",
        price: 32.599,
        category: "training",
        cardImg: "./assets/img/products/conjunto-infantil.webp",
    },
    {
        id: 5,
        name: "Conjunto Unisex",
        price: 35.999,
        category: "training",
        cardImg: "./assets/img/products/conjunto-niñas.webp",
    },
    {
        id: 6,
        name: "Conjunto Boca Junior",
        price: 39.999,
        category: "futbol",
        cardImg: "./assets/img/products/conjunto-boca.webp",
    },
    {
        id: 7,
        name: "Botines Niño",
        price: 29.999,
        category: "futbol",
        cardImg: "./assets/img/products/botines-niño.webp",
    },
    {
        id: 8,
        name: "Buzo Manga Larga",
        price: 25.999,
        category: "running",
        cardImg: "./assets/img/products/buzo-mangalarga.webp",
    },
    {
        id: 9,
        name: "Bolso Training",
        price: 12.599,
        category: "training",
        cardImg: "./assets/img/products/bolso-training.webp",
    },
    {
        id: 10,
        name: "Zapatillas Training Ligra",
        price: 55.999 ,
        category: "training",
        cardImg: "./assets/img/products/zapatillas-trainingLigra.webp",
    },
    {
        id: 11,
        name: "Calza de Entrenamiento",
        price: 18.999 ,
        category: "training",
        cardImg: "./assets/img/products/calza-entrenamiento.webp",
    },
    {
        id: 12,
        name: "Zapatillas Trainer",
        price: 38.999 ,
        category: "training",
        cardImg: "/assets/img/products/zapatillas-trainer.webp",
    },
    {
        id: 13,
        name: "Calza Running",
        price: 14.999,
        category: "running",
        cardImg: "./assets/img/products/calzaRunnin.webp",
    },
    {
        id: 14,
        name: "Zapatillas Running",
        price: 53.999,
        category: "running",
        cardImg: "/assets/img/products/Zapatillas-running.webp",
    },
    {
        id: 15,
        name: "Conjunto River Plate",
        price: 39.999,
        category: "futbol",
        cardImg: "./assets/img/products/conjunto-river.webp",
    },
    {
        id: 16,
        name: "Musculosa Basquet",
        price: 22.599,
        category: "basquet",
        cardImg: "./assets/img/products/musculosa-basquet.webp",
    },
    {
        id: 17,
        name: "Zapatillas Basquet",
        price: 65.999,
        category: "basquet",
        cardImg: "./assets/img/products/zapatillas-basquet.webp",
    },
    {
        id: 18,
        name: "Zapatillas Trail Running",
        price: 44.599,
        category: "running",
        cardImg: "./assets/img/products/zaaptillas-trailrunning.webp",
    },
    {
        id: 19,
        name: "Remera Niño",
        price: 12.899,
        category: "training",
        cardImg: "./assets/img/products/remera-niño.webp",
    },
    {
        id: 20,
        name: "Top de Entrenamiento",
        price: 8.999,
        category: "training",
        cardImg: "./assets/img/products/top-entrenamiento.webp",
    },
    {
        id: 21,
        name: "Short Sport",
        price: 9.999,
        category: "training",
        cardImg: "./assets/img/products/short-sport.webp",
    },
    {
        id: 22,
        name: "Remera Niño",
        price: 12.999,
        category: "training",
        cardImg: "./assets/img/products/remera-niños.webp",
    },
    {
        id: 23,
        name: "Remera Overside",
        price: 18.999,
        category: "basquet",
        cardImg: "./assets/img/products/remeras-basquet.webp",
    },
    {
        id: 24,
        name: "Camiseta Titular Argentina 3 Estrellas",
        price: 23.999,
        category: "futbol",
        cardImg: "./assets/img/products/camiseta-titulas3.webp",
    },
    {
        id: 25,
        name: "Zapatillas Running 2.0",
        price: 68.999,
        category: "running",
        cardImg: "./assets/img/products/zapatillas-2.0running.webp",
    },
    {
        id: 26,
        name: "Zapatillas Luminus",
        price: 58.999,
        category: "basquet",
        cardImg: "./assets/img/products/zapatillas-luz.webp",
    },
];

const productsEnPartes = (size) => {
    let productsList = [];
    for (let i = 0; i < productsData.length; i += size){
        productsList.push (productsData.slice (i, i + size));
    }
    return productsList;
};

// console.log(divideProductsEnPartes (6));

const appState = {
    products: productsEnPartes (6),
    currentProductsIndex: 0,
    productsLimit: productsEnPartes (6).length,
    activeFilter: null,
};