//Packages
const { Router } = require("express");
const path = require("path");
//Classes
const ProductManager = require("../productManager");
const { uploader } = require("../utils");

//Path
const productDbPath = path.join(__dirname, "../db/products.json");

class ProductRoute {
  path = "/products";
  router = Router();
  productManager = new ProductManager(productDbPath);

  constructor() {
    this.initProductRoutes();
  }

  //Get products with and withou limit
  initProductRoutes() {
    this.router.get(`${this.path}`, async (req, res) => {
      const limit = Number(req.query.limit);
      const products = await this.productManager.getProducts();

      if (limit || limit >= products.length) {
        return res.status(200).json({
          products: products.slice(0, limit ? limit : products.length),
          message: `Get all products, be careful with your ${limit}`,
        });
      }

      return res.status(200).json({
        products,
        message: "Get all products ",
      });
    });

    //Get product by Id
    this.router.get(`${this.path}/:pid`, async (req, res) => {
      const id = Number(req.params.pid);
      const product = await this.productManager.getProductById(id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found!",
        });
      }

      return res.status(200).json({
        product,
        message: "Get product by Id",
      });
    });

    //Post
    this.router.post(
      `${this.path}`,
      uploader.single("thumbnail"),
      async (req, res) => {
        const { title, description, code, price, stock, category } = req.body;
        const file = req.file;

        //Verifying file
        if (!file) {
          return res.status(400).send({
            message: "File cannot be processed",
          });
        }
        //Verifiying fields
        if (!title || !description || !code || !price || !stock || !category) {
          return res.status(400).json({
            message: "All field are mandatory",
          });
        }

        const newProduct = req.body;
        newProduct.thumbnail = `http://localhost:5000/public/uploads/${file.originalname}`;
        //Adding the product thrugh the class
        await this.productManager.addProduct(newProduct);

        return res.status(200).json({
          message: "Product added",
          product: newProduct,
        });
      }
    );

    //Put
    this.router.put(`${this.path}/:pid`, async (req, res) => {
      const pid = Number(req.params.pid);
      const productUpd = await this.productManager.updateProduct(pid, req.body);
      const product = await this.productManager.getProductById(pid);

      if (!productUpd) {
        return res.status(200).json({
          message: `Product ${pid} not found`,
        });
      }

      return res.status(200).json({
        message: `Product ${pid} updated`,
        product,
      });
    });

    this.router.delete(`${this.path}/:pid`, async (req, res) => {
      const pid = Number(req.params.pid);
      await this.productManager.deleteProduct(pid);

      return res.status(200).json({
        message: `Product ${pid} deleted`,
      });
    });
  }
}

module.exports = ProductRoute;
