const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
});

const userModel = model("Users", userSchema);

module.exports = userModel;
