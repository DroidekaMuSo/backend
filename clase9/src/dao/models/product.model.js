const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  category: { type: String, require: true },
  status: { typer: Boolean, require: true },
  price: { type: Number, require: true },
  code: { type: Number, require: true },
  stock: { type: Number, require: true },
  thumbnails: [],
});

const productsModel = mongoose.model("Products", productSchema);

module.exports = productsModel;
