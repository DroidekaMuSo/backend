const cartModel = require("../../models/carts.model");
const productModel = require("../../models/products.model");

class CartModel {
  getCarts = async () => {
    try {
      const carts = await cartModel.find({}).lean();

      return carts;
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:12 ~ CartsManager ~ getCarts=async ~ error:",
        error
      );
    }
  };

  getCartById = async (cid) => {
    try {
      const cart = await cartModel.findById({ _id: cid });

      if (!cart) return null;

      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:21 ~ CartsManager ~ getCartById=async ~ error:",
        error
      );
    }
  };

  createCart = async () => {
    try {
      const cart = await cartModel.create([]);

      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:29 ~ CartsManager ~ createCart=async ~ error:",
        error
      );
    }
  };

  addProductToCart = async (pid, cid) => {
    try {
      const cart = await cartModel.findById({ _id: cid });
      const product = await productModel.findById({ _id: pid });

      if (!cart || !product) return null;

      const { _id, title, price } = product;

      cart.products.push({ _id, title, price });
      cart.save();

      return cart;
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.fs.js:36 ~ CartsManager ~ addProductToCart=async ~ error:",
        error
      );
    }
  };

  deleteProductFromCart = async (cid, pid) => {
    try {
      const cart = cartModel.findByIdAndUpdate(cid, {
        $pull: { products: { _id: pid } },
      });

      return cart
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.manager.mongo.js:70 ~ CartModel ~ deleteProductFromCart ~ error:",
        error
      );
    }
  };
}

module.exports = CartModel;
