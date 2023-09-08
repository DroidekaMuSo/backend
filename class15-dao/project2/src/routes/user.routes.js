const router = require("express").Router();
const UserController = require("../controllers/user.controller");

const userController = new UserController();

router.get("/", userController.getUsers);
router.get("/:userId", userController.getUser);
router.delete("/:userId", userController.deleteUser);
router.post("/", userController.createUser)

module.exports = router;
