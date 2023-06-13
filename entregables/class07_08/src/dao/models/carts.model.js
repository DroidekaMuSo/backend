const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  products: {
    type: Array,
    default: [],
  },
});

const cartModel = model("Cart", cartSchema);

module.exports = cartModel
