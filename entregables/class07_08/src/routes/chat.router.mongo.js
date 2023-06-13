const router = require("express").Router();

const MessageManager = require("../dao/controllers/mongo/messageManager.mongo");

const messageManager = new MessageManager();

router.get("/", async (req, res) => {
  try {
    const messages = messageManager.getMessages();

    return res.status(200).render("chat", { messages });
  } catch (error) {
    console.log(
      "🚀 ~ file: chat.router.mongo.js:7 ~ router.get ~ error:",
      error
    );
  }
});

module.exports = router;
