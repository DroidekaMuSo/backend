const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  getProducts = async () => {
    try {
      const db = await fs.promises.readFile(this.path, "utf-8");
      const parse = JSON.parse(db);
      return parse;
    } catch (error) {
      console.log(error);
    }
  };

  getProductsById = async (id) => {
    try {
      const db = await this.getProducts();
      const filteredDb = db.find((product) => product.id === Number(id));
      return filteredDb;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      const db = await this.getProducts();
      const id = await this.newId(db);

      //Adding the product to the array
      db.push({ id, ...product });
      //Updating our data base
      await fs.writeFile(this.path, JSON.stringify(db));
      return "Product added";
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (id, data) => {
    try {
      const db = this.getProducts();
      const filteredDb = this.getProductsById(id);

      //Finding product's id
      let index = db.findIndex((product) => product.id === id);
      //Bringing the product
      db[index] = { ...filteredDb, ...data };
      //Overwritting our file
      await fs.writeFile(this.path, JSON.stringify(db));
      console.log("Product updated");
      return filteredDb;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const db = this.getProducts();
      const filteredDb = db.filter((product) => product.id !== id);
      console.log("Product deleted");
      return filteredDb;
    } catch (error) {
      console.log(error);
    }
  };

  //   *************Support functions*****************
  newId = async (products) => {
    try {
      if (products.length === 1) return 1;
      return products[products.length - 1].id + 1;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ProductManager;
