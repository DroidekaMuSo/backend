const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  addObjetc = async (product) => {
    try {
      this.products = await this.getProducts();

      const id =
        this.products.length === 0
          ? 1
          : this.products[this.products.length - 1].id + 1;

      this.products.push({ id, ...product });

      await fs.writeFile(this.path, JSON.stringify(this.products));

      return "Product added";
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductManager.js:9 ~ ProductManager ~ error:",
        error
      );
    }
  };

  getProducts = async () => {
    try {
      const elements = JSON.parse(await fs.readFile(this.path, "utf-8"));

      return elements;
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductManager.js:16 ~ ProductManager ~ error:",
        error
      );
    }
  };

  getProductById = async (pid) => {
    try {
      const products = await this.getProducts();
      const product = products.find((item) => item.id === pid);

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductManager.js:23 ~ ProductManager ~ error:",
        error
      );
    }
  };

  updateProduct = async (pid, data) => {
    try {
      const products = await this.getProducts();

      let product = products.find((item) => item.id === pid);

      let prodIndex = products.findIndex((item) => item.id === pid);

      products[prodIndex] = { ...product, ...data };
      await fs.writeFile(this.path, JSON.stringify(products));

      return await this.getProductById(pid);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductManager.js:30 ~ ProductManager ~ error:",
        error
      );
    }
  };

  deleteProduct = async (pid) => {
    try {
      const products = await this.getProducts();

      const newList = products.filter((prod) => prod.id !== pid);

      await fs.writeFile(this.path, JSON.stringify(newList));

      return newList;
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductManager.js:37 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  };
}

module.exports = ProductManager;
