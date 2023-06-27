const {Schema, model} = require("mongoose");

const messageSchema = new Schema({
    user:String,
    message: String
})

const messageModel = model("Message", messageSchema);

module.exports = messageModel