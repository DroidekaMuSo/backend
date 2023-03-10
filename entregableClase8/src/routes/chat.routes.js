const router = require("express").Router();
const ChatManager = require("../dao/mongo/chatManager");

const chatManager = new ChatManager();

router.get("/", async (req, res) => {
  try {
    const messages = await chatManager.getMessages();
    return res.status(200).render("chat", { messages });
  } catch (error) {
    console.log("🚀 ~ file: chat.routes.js:10 ~ router.get ~ error:", error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, message } = req.body;

    const postMessage = await chatManager.addMessage(user, message);

    return res.status(200).json({
      message: "Message sent",
      postMessage,
    });
  } catch (error) {
    console.log("🚀 ~ file: chat.routes.js:19 ~ router.post ~ error:", error);
  }
});

module.exports = router;
