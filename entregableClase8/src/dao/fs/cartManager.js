const fs = require("fs");
const ProductManager = require("./productManager");
const { Module } = require("module");

const productManager = new ProductManager("../../db/products.json");

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  getCarts = async () => {
    try {
      const db = await fs.readFile(this.pathm, "utf-8");
      const parseDb = JSON.parse(db);

      console.log(parseDb);
      return parseDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.js:16 ~ CartManager ~ getCarts=async ~ error:",
        error
      );
    }
  };

  getCartById = async (cid) => {
    try {
      const db = this.getCarts();
      const filterDb = db.find((cart) => cart.id === id).products;

      console.log(filterDb);
      return filterDb;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.js:31 ~ CartManager ~ getCartById=async ~ error:",
        error
      );
    }
  };

  addCart = async () => {
    try {
      const db = await this.getCarts();
      const id = await this.newId(db);
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.js:46 ~ CartManager ~ addCart=async ~ error:",
        error
      );
    }
  };

  //   **********Support Functions************
  newId = async (carts) => {
    try {
      if (cart.length === 1) return 1;
      return carts[cart.length - 1].id + 1;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.js:59 ~ CartManager ~ newId= ~ error:",
        error
      );
    }
  };
}

module.exports = CartManager;
