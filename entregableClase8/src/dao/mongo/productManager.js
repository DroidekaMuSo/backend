const productModel = require("../models/product.model");

class Product {
  getProducts = async () => {
    try {
      const products = await productModel.find({}).lean();
      return products;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:8 ~ Product ~ getProducts= ~ error:",
        error
      );
    }
  };

  getProductById = async (pid) => {
    try {
      const product = await productModel.findById(pid).lean();
      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:20 ~ Product ~ getProductById= ~ error:",
        error
      );
    }
  };

  addProduct = async (productData) => {
    try {
      const newProduct = await productModel.create(productData);
      return newProduct;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:32 ~ Product ~ addProduct=async ~ error:",
        error
      );
    }
  };

  updateProduct = async (id, productData) => {
    try {
      const updateProduct = new productModel.findByIdAndUpdate(id, productData);
      return updateProduct;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:44 ~ Product ~ updateProduct= ~ error:",
        error
      );
    }
  };

  deleteProduct = async (pid) => {
    try {
      const deleteProduct = await productModel.findByIdAndDelete(pid);
      return deleteProduct;
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.js:56 ~ Product ~ deleteProduct ~ error:",
        error
      );
    }
  };
}

module.exports = Product;
