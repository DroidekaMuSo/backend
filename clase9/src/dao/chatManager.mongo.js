const messageModel = require("./models/message.model");

class ChatManager {
  getMessages = async () => {
    try {
      const messages = await messageModel.find({}).lean();
      return messages;
    } catch (error) {
      console.log(
        "🚀 ~ file: chatManager.mong.js:8 ~ ChatManager ~ getMessages= ~ error:",
        error
      );
    }
  };

  addMessage = async (user, message) => {
    try {
      const addMessage = await messageModel.create({ user, message });
      return addMessage;
    } catch (error) {
      console.log(
        "🚀 ~ file: chatManager.mong.js:20 ~ ChatManager ~ addMessage= ~ error:",
        error
      );
    }
  };
}

module.exports = ChatManager;
