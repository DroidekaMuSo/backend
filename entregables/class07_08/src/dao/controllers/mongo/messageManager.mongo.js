const messageModel = require("../../models/messageModel");

class MessageManager {
  getMessages = async () => {
    try {
      const messages = messageModel.find({}).lean();

      return messages;
    } catch (error) {
      console.log(
        "🚀 ~ file: messageManager.js:8 ~ MessageManager ~ getMessages=async ~ error:",
        error
      );
    }
  };
}

module.exports = MessageManager