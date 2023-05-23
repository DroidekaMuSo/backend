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
        "🚀 ~ file: ProductsManager.js:11 ~ ProductManager ~ error:",
        error
      );
    }
  };

  getProductById = async (id) => {
    try {
      const products = await this.getProducts();

      if (isNaN(id)) return "Invalid format";
      if (id < 0 || id > products.length) return "Id out of range";

      const product = products.find((item) => item.id === id);

      if (!product) return "Id not found";

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductsManager.js:25 ~ ProductManager ~ getProductById= ~ error:",
        error
      );
    }
  };

  addProduct = async (product) => {
    try {
      const products = await this.getProducts();
      const id = await this.newId(products);

      const productToAdd = { ...product, id, thumbnails: [], status: true };
      products.push(productToAdd);

      await fs.writeFile(this.path, JSON.stringify(products));
      return products;
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductsManager.js:42 ~ ProductManager ~ addProduct=async ~ error:",
        error
      );
    }
  };

  updateProduct = async (pid, data) => {
    try {
      const products = await this.getProducts();
      const product = await this.getProductById(pid);
      const productIndex = products.findIndex((product) => product.id === pid);

      products[productIndex] = { ...product, ...data };

      await fs.writeFile(this.path, JSON.stringify(products));

      return await this.getProductById(pid);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductsManager.js:63 ~ ProductManager ~ error:",
        error
      );
    }
  };

  deleteProduct = async (pid) => {
    const products = await this.getProducts();

    const newList = products.filter((product) => product.id !== pid);

    await fs.writeFile(this.path, JSON.stringify(newList));

    return await this.getProducts();
  };

  /////////////////Support functions////////////////////////

  newId(products) {
    if (products.length === 0) return 0;

    return products[products.length - 1].id + 1;
  }
}

module.exports = ProductManager;
