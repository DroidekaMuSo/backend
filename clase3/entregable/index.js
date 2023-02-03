const path = require("path");
const ProductManager = require("./productManager");
const { get } = require("https");

//Global variables
const dbPath = path.join(`${__dirname}/db.json`);
const productInstance = new ProductManager(dbPath);

//Instances

const getProducts = async () => {
  try {
    const productsBaseLsit = await productInstance.getProducts(dbPath);
    console.log(productsBaseLsit);
  } catch (error) {
    console.log(error);
  }
};
const getProductsById = async (id) => {
  const productsBaseLsit = await productInstance.getProductsById(id);
};

const addProducts = async (product) => {
  const productsBaseLsit = await productInstance.createProduct(product);
};
const updateProduct = async (id, data) => {
  const productsBaseLsit = await productInstance.updateProduct(id, data);
};
const deleteProduct = async (id) => {
  const productsBaseLsit = await productInstance.deleteProduct(id);
};

// Bringing existing data
getProducts();

// Creating a new element
addProducts({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});
getProducts();
getProductsById(1);
getProductsById(20);

updateProduct(1, {
  title: "Updated product title",
  description: "Updated description",
});

deleteProduct(1);
