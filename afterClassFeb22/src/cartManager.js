const fs = require("fs");
const ProductManager = require("./productManager");

const productManager = new ProductManager("./db/products.json");

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    try {
      const db = await fs.readFile(this.path, "utf-8");
      const parseDb = JSON.parse(db);
      console.log(db);
      return parseDb;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const db = await this.getCarts();
      const filteredDb = db.find((cart) => cart.id === id).products;
      console.log(filteredDb);
      return filteredDb;
    } catch (error) {
      console.log(error);
    }
  }

  async addCart() {
    try {
      const db = await this.getCarts();
      const id = await this.newId(db);

      db.push({ id, products: [] });
      await fs.writeFile(this.path, JSON.stringify(db));
      console.log("Cart added");
      return db;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
    const db = await this.getCarts();
    const id = await this.newId(db);

    db.push({ id, products: [] });
    const newDb = JSON.stringify(db);
    await fs.writeFile(this.path, newDb);
    console.log(db);
    return db;
  }

  //   Support functions
  async newId(db) {
    try {
      if (db.length === 1) return 1;
      return db[db.length - 1].id + 1;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartManager
