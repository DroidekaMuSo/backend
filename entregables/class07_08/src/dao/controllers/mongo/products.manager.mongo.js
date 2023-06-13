const productModel = require("../../models/products.model");

class ProductManager {
  getProducts = async () => {
    try {
      const products = await productModel.find({});

      return products;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:11 ~ ProductManager ~ getCarts=async ~ error:",
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
        "🚀 ~ file: product.manager.js:18 ~ ProductManager ~ getCartById=async ~ error:",
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
        "🚀 ~ file: product.manager.js:31 ~ ProductManager ~ createProduct=async ~ error:",
        error
      );
    }
  };

  updateProduct = async (pid, data) => {
    console.log("🚀 ~ file: products.manager.mongo.js:47 ~ ProductManager ~ updateProduct= ~ data:", data)
    try {
      const product = await productModel.findByIdAndUpdate({ _id: pid }, data);

      if (!product) return null;

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:41 ~ ProductManager ~ updateProduct=async ~ error:",
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
        "🚀 ~ file: product.manager.js:48 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  };
}

module.exports = ProductManager;
