const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
});

const userModel = model("User", userSchema);

module.exports = userModel;
