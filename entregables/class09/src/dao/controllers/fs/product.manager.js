const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    try {
      const products = await fs.readFile(this.path, "utf-8");

      return JSON.parse(products);
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:11 ~ ProductManager ~ getCarts=async ~ error:",
        error
      );
    }
  };

  getProductById = async (pid) => {
    try {
      const products = await this.getProducts();
      const product = products.find((item) => item.id === pid);

      if (!product) return null;

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:18 ~ ProductManager ~ getCartById=async ~ error:",
        error
      );
    }
  };

  createProduct = async (data) => {
    try {
      const products = await this.getProducts();
      const id = await this.newId(products);

      products.push({ id, ...data });
      await fs.writeFile(this.path, JSON.stringify(products));

      return await this.getProducts();
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:31 ~ ProductManager ~ createProduct=async ~ error:",
        error
      );
    }
  };

  updateProduct = async (pid, data) => {
    try {
      const products = await this.getProducts();
      const product = await this.getProductById(pid);
      const index = await products.findIndex((item) => item.id === pid);

      if (!product || index) return null;

      products[index] = { ...data, ...product };
      await fs.writeFile(this.path, JSON.stringify(products));

      return await this.getProductById(pid);
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:41 ~ ProductManager ~ updateProduct=async ~ error:",
        error
      );
    }
  };

  deleteProduct = async (pid) => {
    try {
      const products = await this.getProducts();
      const newProducts = products.filter((item) => item.id !== item);

      await fs.writeFile(this.path,JSON.stringify(newProducts))

      return this.getProducts()
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:48 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  };

  //~Support functions
  newId(array) {
    try {
      if (array.length === 0) return 0;

      return array[array.length - 1].id + 1;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:57 ~ ProductManager ~ newId ~ error:",
        error
      );
    }
  }
}

module.exports = ProductManager;
