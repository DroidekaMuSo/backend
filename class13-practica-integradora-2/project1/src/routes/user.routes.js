const handlePolicies = require("../middlewares/handlePolicies.middleware");
const userModel = require("../model/user.model");

const router = require("express").Router();

router.get("/", handlePolicies(["PUBLIC"]), async (req, res) => {
  try {
    const users = await userModel.find({}).populate("notes.note");

    return res.json({ message: "Users with PUBLIC role", users });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:8 ~ router.get ~ error:", error);
  }
});

router.get("/:userId", handlePolicies(["USER", "ADMIN"]), async (req, res) => {
  try {
    console.log("Data from middleware", req.user);
    const { userId } = req.params;

    const findUser = await userModel.findById({ _id: userId });
    if (!findUser) {
      return res.status(401).json({ message: `User ${userId} doesn't exist` });
    }

    const userData = await userModel
      .findById({ _id: userId })
      .populate("notes.note");

    return res.json({
      message: "Get user by Id for USER & ADMIN roles",
      user: userData,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:19 ~ router.get ~ error:", error);
  }
});

router.post("/:userID/notes/:noteId", async (req, res) => {
  try {
    const { userID, noteId } = req.params;

    const userData = await userModel.findById({ _id: userID });
    if (!userData) {
      return res.status(401).json({ message: `User ${userID} not found` });
    }

    userData.notes.push({ note: noteId });
    const updateUser = await userModel.updateOne({ _id: userID }, userData);

    return res.json({
      message: "Get user by ID for USER role",
      user: updateUser,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:42 ~ router.post ~ error:", error);
  }
});

router.delete("/:userId", handlePolicies(["ADMIN"]), async (req, res) => {
  try {
    const { userId } = req.params;

    const deleteUser = await userModel.deleteOne({ _id: userId });

    return res.json({ message: "Delete user by Id", user: deleteUser });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:63 ~ router.delete ~ error:", error);
  }
});

module.exports = router;
