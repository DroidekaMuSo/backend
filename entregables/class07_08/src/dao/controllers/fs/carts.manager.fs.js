const fs = require("fs/promises");
const ProductManager = require("./product.manager");

const productManager = new ProductManager("src/db/products.json");

class CartsManager {
  constructor(path) {
    this.path = path;
  }

  getCarts = async () => {
    try {
      const carts = await fs.readFile(this.path, "utf-8");

      return JSON.stringify(carts);
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:12 ~ CartsManager ~ getCarts=async ~ error:",
        error
      );
    }
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === id)

      if (!cart) return null;

      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:21 ~ CartsManager ~ getCartById=async ~ error:",
        error
      );
    }
  };

  createCart = async () => {
    try {
      const carts = await this.getCarts();
      const id = await this.newId(carts);

      carts.push({ id, products: [] });
      await fs.writeFile(this.path, JSON.stringify(carts));

      return this.getCarts();
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:29 ~ CartsManager ~ createCart=async ~ error:",
        error
      );
    }
  };

  addProductToCart = async (pid, cid) => {
    try {
      const cart = await this.getCartById(cid);
      const product = await productManager.getProductById(cid);

      if(!cart || !product) return null

      cart.products.push(product);
      await fs.writeFile(this.path, JSON.stringify(cart));

      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:36 ~ CartsManager ~ addProductToCart=async ~ error:",
        error
      );
    }
  };

  //~Support functions
  newId = async (array) => {
    try {
      if (array.length === 0) return 1;
      return array[array.length - 1].id + 1;
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:65 ~ CartsManager ~ newId=async ~ error:",
        error
      );
    }
  };
}

module.exports = CartsManager;
