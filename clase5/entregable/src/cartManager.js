const fs = require("fs");
const ProductManager = require("./productManager");

const productManager = new ProductManager("./db/products.json");

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  getCarts = async () => {
    try {
      const cartsDb = await fs.readFile(this.path, "utf-8");
      return JSON.parse(cartsDb);
    } catch (error) {}
  };

  addCart = async () => {
    try {
      const cartsDb = await this.getCarts();
      const id = await this.generateNewId();

      cartsDb.push({ id, products: [] });
      await fs.writeFile(this.path, JSON.stringify(cartsDb));
      return "Cart added succesfully";
    } catch (error) {
      console.error(error);
    }
  };

  getProductsByCartId = async (id) => {
    try {
      const cartsDb = await this.getCarts();
      const cartsFiltered = cartsDb.find((cart) => cart.id === id).products;
      return cartsFiltered;
    } catch (error) {
      console.error(error);
    }
  };

  addPoductToCart = async (cid, pid) => {
    const product = await productManager.getProductById(pid);
    const cart = await this.getProductsByCartId(cid);

    if (cart.some((item) => item.product === product.id)) {
      const index = cart.findIndex((item) => item.product === product.id);
      cart[index].quantity++;
    }
  };

  /* ****************Support functions***************** */
  async generateNewId(carts) {
    try {
      if (carts.length === 1) {
        return 1;
      }
      return carts[carts.length - 1].id + 1;
    } catch (error) {}
  }
}

module.exports = CartManager;
