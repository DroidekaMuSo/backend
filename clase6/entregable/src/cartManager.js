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
      const db = await fs.readFile(this.path, "utf-8");
      const parseDb = JSON.parse(db);
      console.log(parseDb);
      return parseDb;
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (id) => {
    try {
      const db = await this.getCarts();
      const filteredDb = db.find((cart) => cart.id === id).products;
      console.log(filteredDb);
      return filteredDb;
    } catch (error) {
      console.log(error);
    }
  };

  addCart = async () => {
    try {
      const db = await this.getCarts();
      const id = await this.newId(db);

      //Adding our cart to the array
      db.push({ id, products: [] });
      //Overwritting our file
      await fs.writeFile(this.path, JSON.stringify(db));
      console.log("Cart added");
      return db;
    } catch (error) {
      console.log(error);
    }
  };

  addProductToCart = async (cid, pid) => {
    const db = await this.getCarts();
    const id = await this.newId(db);

    //Adding the cart to the array
    db.push({ id, products: [] });
    //Parsing our new data
    const newDb = JSON.stringify(db);
    //Overwritting our original file
    fs.writeFile(this.path, newDb);
    console.log(db);
    return db;
  };

  //   Support functions

  newId = async (carts) => {
    try {
      if (carts === 1) return 1;
      return carts[carts.length - 1].id + 1;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CartManager;
