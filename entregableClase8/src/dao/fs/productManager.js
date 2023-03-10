const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  getProducts = async () => {
    try {
      const db = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(db);

      return parseData;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:12 ~ ProductManager ~ getProducts= ~ error:",
        error
      );
    }
  };

  getProductsById = async (pid) => {
    try {
      const db = await this.getProducts();
      const filterDb = db.find((product) => product.id === Number(pid));

      return filterDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:27 ~ ProductManager ~ getProductsById= ~ error:",
        error
      );
    }
  };

  createProduct = async (productData) => {
    try {
      const db = await this.getProducts();
      const id = await this.newId(db);

      db.push({ id, ...productData });

      await fs.writeFile(this.path, JSON.stringify(db));
      return "Product added";
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:41 ~ ProductManager ~ createProduct=async ~ error:",
        error
      );
    }
  };

  updateProduct = async (pid, productData) => {
    try {
      const db = this.getProducts();
      const filterDb = this.getProductsById(pid);

      let index = db.findIndex((product) => product.id === pid);
      db[index] = { ...filterDb, ...productData };
      await fs.writeFile(this.path, JSON.stringify(db));

      console.log("Product added");
      return filterDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:58 ~ ProductManager ~ updateProduct= ~ error:",
        error
      );
    }
  };

  deleteProduct = async (pid) => {
    try {
      const db = await this.getProducts();
      const filterDb = db.filter((product) => product.id !== id);
      console.log("Product deleted");
      return filterDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:77 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  };

  //   ************Support Funtions*************

  newId = async (products) => {
    try {
      if (products.length === 1) return 1;

      return products[products.length - 1].id + 1;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:53 ~ ProductManager ~ newId=async ~ error:",
        error
      );
    }
  };
}

module.exports = ProductManager;
