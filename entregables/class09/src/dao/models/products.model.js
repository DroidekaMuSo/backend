const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: Array,
    default: [],
  },
});

productSchema.plugin(mongoosePaginate);
const productModel = model("Products", productSchema);

module.exports = productModel;
