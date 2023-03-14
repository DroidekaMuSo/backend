const productModel = require("./models/product.model");

class ProductManager {
  getProduct = async () => {
    try {
      const products = await productModel.find({}).lean();
      return products;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.mongo.js:7 ~ ProductManageR ~ getProduct= ~ error:",
        error
      );
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productModel.find({ _id: id }).lean();
      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.mongo.js:20 ~ ProductManager ~ getProductById= ~ error:",
        error
      );
    }
  };

  addProduct = async (product) => {
    try {
      const product = await productModel.create(product);

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.mongo.js:34 ~ ProductManager ~ addProduct= ~ error:",
        error
      );
    }
  };

  updateProduct = async (id, product) => {
    try {
      const findAndUpdate = await productModel.findByIdAndUpdate(id, {
        ...product,
      });
      return findAndUpdate;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.mongo.js:42 ~ ProductManager ~ updateProduct= ~ error:",
        error
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      const deleteProduct = await productModel.findByIdAndDelete(id);

      return deleteProduct;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.mongo.js:60 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  };
}

module.exports = ProductManager;
