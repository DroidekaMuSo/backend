import { Schema, SchemaTypes, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ordersSchema = new Schema({
  number: Number,
  bussiness: {
    type: SchemaTypes.ObjectId,
    ref: "Business",
  },
  users: {
    type: SchemaTypes.ObjectId,
    ref: "Users",
  },
  products: [],
  totalPrice: Number,
});

ordersSchema.plugin(mongoosePaginate);

const orderModel = model("Orders", ordersSchema);

export default orderModel;
