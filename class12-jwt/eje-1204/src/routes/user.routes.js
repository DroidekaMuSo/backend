const handlePolicies = require("../middlewares/handle-policies.middleware");
const userModel = require("../models/user.model");

const router = require("express").Router();

router.get("/", handlePolicies(["PUBLIC"]), async (req, res) => {
  try {
    const users = await userModel.find({});

    return res.json({ message: "Get all users with Public role", users });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:6 ~ router.get ~ error:", error);
  }
});

router.get("/:userId", handlePolicies(["USER", "ADMIN"]), async (req, res) => {
  try {
    const { userId } = req.params;

    const userData = await userModel.findById({ _id: userId });

    return res.json({
      message: "Get user by Id for user role",
      user: userData,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:19 ~ router.get ~ error:", error);
  }
});

router.delete("/:userId", handlePolicies(["ADMIN"]), async (req, res) => {
  try {
    const { userId } = req.params;

    const deleteUser = await userModel.deleteOne({ _id: userId });

    return res.json({
      message: "Delete user by Id with role Admin",
      user: deleteUser,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:34 ~ router.delete ~ error:", error);
  }
});

module.exports = router;
