const router = require("express").Router();
const ChatManager = require("../dao/chatManager.mongo");
const { route } = require("./products.routes");

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
    const addMessage = await chatManager.addMessage(user, message);

    return res.status(200).json({ message: "Message sent", addMessage });
  } catch (error) {
    console.log("🚀 ~ file: chat.routes.js:20 ~ router.post ~ error:", error);
  }
});
