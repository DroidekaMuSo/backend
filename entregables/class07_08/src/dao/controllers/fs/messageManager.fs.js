const fs = require("fs/promises");

class MessageManager {
  constructor(path) {
    this.path = path;
  }

  getMessages = async () => {
    try {
      const messages = await fs.readFile(this.path, "utf-8");

      return JSON.parse(messages);
    } catch (error) {
      console.log(
        "🚀 ~ file: messageManager.fs.js:11 ~ MessageManager ~ getMessages=async ~ error:",
        error
      );
    }
  };

  addMessage = async (user, message) => {
    try {
      const messages = await this.getMessages();

      messages.push({ user, message });

      await fs.writeFile(this.path, JSON.stringify(messages));

      return messages;
    } catch (error) {
      console.log(
        "🚀 ~ file: messageManager.fs.js:24 ~ MessageManager ~ addMessage=async ~ error:",
        error
      );
    }
  };
}

module.exports = MessageManager;
