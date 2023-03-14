const fs = require("fs");
const ProductManager = require("./productManager.fs");

const productManager = new ProductManager("src/db/products.json");

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  getCarts = async () => {
    try {
      const carts = await fs.readFile(this.path, "utf-8");
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.fs..js:13 ~ CartManager ~ getcarts= ~ error:",
        error
      );
    }
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getcarts();
      const cart = carts.find((cart) => cart.id === id).products;
      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.fs..js:24 ~ CartManager ~ getCartById=async ~ error:",
        error
      );
    }
  };

  addProductToCart = async (pid, cid) => {
    try {
      const product = await productManager.getProductById(pid);
      const cart = await this.getCartById(cid);

      if (cart.some((item) => (item.product = product.id))) {
        const index = cart.findIndex((item) => item.product === product.id);
        cart[index].quantity++;
      } else {
        cart.push({ product: product.id, quantity: 1 });
      }

      const overwrittingDb = fs.writeFile(this.path, JSON.stringify(this.cart));

      return overwrittingDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.fs..js:37 ~ CartManager ~ addProductToCart= ~ error:",
        error
      );
    }
  };

  addCart = async () => {
    try {
      const carts = await this.getCarts();
      const id = await newId(carts);

      carts.push({ id, products: [] });

      const overwrittingDb = await fs.writeFile(
        this.path,
        JSON.stringify(carts)
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.fs..js:63 ~ CartManager ~ addCart= ~ error:",
        error
      );
    }
  };

  // **********Support functions****************
  newId = async (carts) => {
    try {
      if (carts.length === 0) {
        return 1;
      }

      return carts[carts.length - 1], id + 1;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.fs..js:76 ~ CartManager ~ newId=async ~ error:",
        error
      );
    }
  };
}

module.exports = CartManager;
