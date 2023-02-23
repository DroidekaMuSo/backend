const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async getProducts() {
    try {
      //Setting the path of the data base
      const productsDb = await fs.readFile(this.path, "utf-8");
      //Parsing the data, to see something more readable
      return JSON.parse(productsDb);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsById(id) {
    try {
      //Bringing all the data
      const productsDb = await this.getProducts();
      const productFound = productsDb.find((product) => product.id === id);
      console.log(productFound);
      return productFound ? productFound : console.log("Product not found");
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(product) {
    try {
      //Bringing all the products from the original array
      const productsDb = await this.getProducts();
      //   Generating a new id in a different function based on the lenght of the current array
      const id = await this.generateNewId(productsDb);
      //Pushing the product with the new id
      productsDb.push({ id, ...product });
      //Creatin or overwriting a product with the new info added to the array
      await fs.writeFile(this.path, JSON.stringify(productsDb));
      return "Product added succesfully ";
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, data) {
    try {
      const productsDb = await this.getProducts();
      const productId = await this.getProductsById(id);
      //Array
      let index = productsDb.findIndex((product) => product.id === id);
      productsDb[index] = { ...productId, ...data };
      await fs.writeFile(this.path, JSON.stringify(productsDb));
      return console.log(productsDb);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productsArray = await this.getProducts();
      const productsFiltered = productsArray.filter(
        (product) => product.id !== id
      );
      console.log(productsFiltered);
      return "Product removed succesfully";
    } catch (error) {
      console.log(error);
    }
  }

  /* ****************************Support Functions ********************************* */
  async generateNewId(products) {
    try {
      console.log(products.length);
      if (products.length === 1) return 1;
      return products[products.length - 1].id + 1;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductManager;

