const productModel = require("../../models/products.model");

class ProductManager {
  getProducts = async (limit, page, sort) => {
    try {
      const products = await productModel.paginate(
        {},
        { lean: true, limit, page }
      );

      return products

    } catch (error) {
      console.log(
        "🚀 ~ file: products.manager.mongo.js:13 ~ ProductManager ~ getProducts= ~ error:",
        error
      );
    }
  };

  getProductById = async (pid) => {
    try {
      const product = await productModel.findById({ _id: pid });

      if (!product) return null;

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: products.manager.mongo.js:25 ~ ProductManager ~ getProductById= ~ error:",
        error
      );
    }
  };

  createProduct = async (data) => {
    try {
      const product = await productModel.create(data);

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: products.manager.mongo.js:35 ~ ProductManager ~ createProduct= ~ error:",
        error
      );
    }
  };

  updateProduct = async (pid, data) => {
    try {
      const product = await productModel.findByIdAndUpdate({ _id: pid }, data);

      if (!product) return null;

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: products.manager.mongo.js:47 ~ ProductManager ~ updateProduct= ~ error:",
        error
      );
    }
  };

  deleteProduct = async (pid) => {
    try {
      const product = productModel.findByIdAndDelete(pid);

      if (!product) return null;

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: products.manager.mongo.js:59 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  };
}

module.exports = ProductManager;
