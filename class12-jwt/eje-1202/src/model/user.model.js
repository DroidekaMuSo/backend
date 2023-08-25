const { Schema, model } = require("mongoose");

const userShema = new Schema({
  name: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
});

const userModel = model("User", userShema);

module.exports = userModel;
