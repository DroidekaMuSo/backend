const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

class CartManager {
  getCarts = async () => {
    try {
      const carts = await cartModel.find({});
      return carts;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.js:8 ~ CartManager ~ getCarts= ~ error:",
        error
      );
    }
  };

  getCartById = async (cid) => {
    try {
      const cart = await cartModel.findById(cid);

      if (!cart) return null;
      
      return cart.products;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.js:21 ~ CartManager ~ getCartsById= ~ error:",
        error
      );
    }
  };

  addCart = async (cartData) => {
    try {
      const newCart = await cartModel.create(cartData);
      return newCart;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.js:33 ~ CartManager ~ addCart= ~ error:",
        error
      );
    }
  };

  addProductToCart = async (pid, cid) => {
    try {
      const product = await cartModel.findById(pid);
      const cart = await productModel.findById(cid);

      cart.products.push(product);
      cart.save();
      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.js:45 ~ CartManager ~ addProductToCart=async ~ error:",
        error
      );
    }
  };
}

module.exports = CartManager;
