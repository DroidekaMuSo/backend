import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const bussinessSchema = new Schema({
  name: String,
  products: [],
});

bussinessSchema.plugin(mongoosePaginate);

const bussinessModel = mongoose.model("Bussiness", bussinessSchema);

export default bussinessModel;
