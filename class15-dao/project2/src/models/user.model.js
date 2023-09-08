const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const roleType = {
  USER: "USER",
  ADMIN: "ADMIN",
  PUBLIC: "PUBLIC",
};

const userSchema = new Schema({
  name: String,
  lastName: String,
  emial: String,
  age: Number,
  password: String,
  role: {
    type: String,
    enum: Object.values(roleType),
  },
});

userSchema.plugin(mongoosePaginate);

const userModel = model("Users", userSchema);

module.exports = userModel;
