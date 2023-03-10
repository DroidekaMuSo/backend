const messageModel = require("../models/message.model");

class Message {
  getMessages = async () => {
    try {
      const messages = await messageModel.find({}).lean();
      return messages;
    } catch (error) {
      console.log(
        "🚀 ~ file: chatManager.js:7 ~ Message ~ getMessages= ~ error:",
        error
      );
    }
  };

  addMessage = async (user, message) => {
    try {
      const newMessage = await messageModel.create({ user, message });
      return newMessage;
    } catch (error) {
      console.log(
        "🚀 ~ file: chatManager.js:13 ~ Message ~ addMessage= ~ error:",
        error
      );
    }
  };
}

module.exports = Message;
