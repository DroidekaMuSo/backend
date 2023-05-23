const fs = require("fs/promises");
const ProductManager = require("./ProductsManager");

const productManager = new ProductManager("src/db/products.json");

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getCarts = async () => {
    try {
      const carts = await fs.readFile(this.path, "utf-8");

      return JSON.parse(carts);
    } catch (error) {
      console.log(
        "🚀 ~ file: CartManager.js:13 ~ CartManager ~ getCarts= ~ error:",
        error
      );
    }
  };

  getCart = async (cid) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cid).products;

      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: CartManager.js:19 ~ CartManager ~ getCart=async ~ error:",
        error
      );
    }
  };

  createCart = async () => {
    try {
      const carts = await this.getCarts();

      const id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;

      carts.push({ id, products: [] });

      await fs.writeFile(this.path, JSON.stringify(carts));

      return await this.getCarts();
    } catch (error) {
      console.log(
        "🚀 ~ file: CartManager.js:36 ~ CartManager ~ createCart= ~ error:",
        error
      );
    }
  };

  addProductToCart = async (pid, cid) => {
    try {
      // const cart = await this.getCart(cid);
      const product = await productManager.getProductById(pid);
      const carts = await this.getCarts();
      const cart = carts.find((item) => item.id === cid).products;
      
      if (cart.some((item) => item.product === pid)) {
        const index = cart.findIndex((item) => item.product === product.id);
        cart[index].quantity++;
      } else {
        cart.push({ product: pid, quantity: 1 });
      }

      await fs.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      console.log(
        "🚀 ~ file: CartManager.js:59 ~ CartManager ~ addProductToCart=async ~ error:",
        error
      );
    }
  };
}

module.exports = CartManager;
