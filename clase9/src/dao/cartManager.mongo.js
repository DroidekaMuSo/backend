const cartModel = require("./models/cart.model");
const productsModel = require("./models/product.model");

class CartManager {
  getCarts = async () => {
    try {
      const carts = cartModel.find({});
      return carts;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.mongo.js:7 ~ CartManager ~ getCarts= ~ error:",
        error
      );
    }
  };

  getCartById = async (id) => {
    try {
      const cart = cartModel.findById(id);
      return cart.products;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.mongo.js:19 ~ CartManager ~ getCartById= ~ error:",
        error
      );
    }
  };

  addCart = async () => {
    try {
      const cart = await cartModel.create({});
      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.mongo.js:33 ~ CartManager ~ addCart= ~ error:",
        error
      );
    }
  };

  addProductToCart = async (cid, pid) => {
    try {
      const product = await productsModel.findById(pid);
      const cart = await cartModel.findById(cid);

      cart.products.push(product);
      cart.save();
      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.mongo.js:32 ~ CartManager ~ addProductToCart=async ~ error:",
        error
      );
    }
  };
}

module.exports = CartManager;
