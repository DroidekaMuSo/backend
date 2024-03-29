const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
});

const userModel = model("User", userSchema);

module.exports = userModel;
