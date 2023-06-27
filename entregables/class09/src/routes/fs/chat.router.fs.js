const router = require("express").Router();

const MessageManager = require("../../dao/controllers/fs/messageManager.fs");

const messageManager = new MessageManager("src/db/chat.json");

router.get("/", async (req, res) => {
  try {
    const messages = await messageManager.getMessages();

    return res.status(200).json({ messages: "All messages", messages });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const { user, message } = req.body;

    if (!user || !message)
      return res.status(200).json({
        systemMessage: "All fields are required",
        fields: { ...req.body },
      });

    await messageManager.addMessage(user, message);

    return res
      .status(200)
      .json({ systemMessage: "Message added", message: { user, message } });
  } catch (error) {
    console.log(
      "🚀 ~ file: chat.router.fs.js:21 ~ router.post ~ error:",
      error
    );
  }
});
module.exports = router;
