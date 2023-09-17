import { Schema, SchemaTypes, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema({
  name: String,
  email: String,
  role: String,
  orders: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Bussiness",
    },
  ],
});

userSchema.plugin(mongoosePaginate);

const userModel = model("Users", userSchema);

export default userModel;
