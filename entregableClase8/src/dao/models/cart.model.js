const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: { type: Array, default: [] },
});

const cartModel = mongoose.model("Carts", cartSchema);

module.exports = cartModel;
