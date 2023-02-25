const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async getProducts() {
    try {
      const db = await fs.readFile(this.path);
      console.log(db);
      return JSON.parse(db);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const db = await this.getProducts();
      const filteredDb = db.find((product) => product.id === id);
      console.log(filteredDb);
      return filteredDb;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const db = await this.getProducts();
      const id = await this.newId(db);

      db.push({ id, ...product });
      await fs.writeFile(this.path, JSON.stringify(db));
      console.log(db);
      return db;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, data) {
    try {
      const db = this.getProducts();
      const filteredDb = this.getProductById(id);

      let index = db.findIndex((product) => product.id === id);
      db[index] = { ...filteredDb, data };

      await fs.writeFile(this.path, JSON.stringify(db));
      console.log("Product added");
      return filteredDb;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const db = await this.getProducts();
      const filteredDb = db.filter((product) => product.id !== id);
      console.log("Product deleted");
      return filteredDb;
    } catch (error) {
      console.log(error);
    }
  }

  //   Support Functions

  async newId(db) {
    try {
      if (db.length === 1) return 1;
      return db[db.length - 1].id + 1;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductManager;
