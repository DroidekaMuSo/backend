const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const messageModel = mongoose.model("Messages", messageSchema);

module.exports = messageModel;
