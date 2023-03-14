const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  getProducts = async () => {
    try {
      const products = await fs.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.fs.js:13 ~ ProductManaer ~ getProducts= ~ error:",
        error
      );
    }
  };

  getProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === Number(id));

      if (!product) {
        return "Product not found";
      }

      return JSON.parse(product);
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.fs.js:25 ~ ProductManaer ~ getProductById= ~ error:",
        error
      );
    }
  };

  addProduct = async (product) => {
    try {
      const products = await this.products;
      const id = await newId(products);

      products.push({ id, ...product });
      const overwrittingDb = await fs.writeFile(
        this.path,
        JSON.stringify(products)
      );

      return overwrittingDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.fs.js:38 ~ ProductManaer ~ addProduct=async ~ error:",
        error
      );
    }
  };

  updateProduct = async (id, data) => {
    try {
      const products = await this.getProducts();
      const productById = await this.getProductById(id);

      const productIndex = products.findIndex((product) => product.id === id);
      products[productIndex] = { ...productById, ...data };

      const overwrittingDb = await fs.writeFile(
        this.path,
        JSON.stringify(products)
      );

      return overwrittingDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.fs.js:58 ~ ProductManaer ~ updateProduct=async ~ error:",
        error
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts;
      const productsFiltered = products.filter(
        (product) => product.id == !Number(id)
      );

      const overwrittingDb = await fs.writeFile(this.path, productsFiltered);
      return overwrittingDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.fs.js:58 ~ ProductManaer ~ deleteProduct ~ error:",
        error
      );
    }
  };

  //*******Support funcions****************/
  newId = async (products) => {
    if (products.length === 0) return 1;
    return products[products.length - 1].id + 1;
  };
}

module.exports = ProductManager;
