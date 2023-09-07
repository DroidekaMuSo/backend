const router = require("express").Router();

const handlePolicies = require("../middlewares/handlePolicies.middleware");
const userController = require("../controllers/user.controller");

router.get("/", handlePolicies(["PUBLIC"]), userController.getUsers);

router.get(
  "/:userId",
  handlePolicies(["USER", "ADMIN"]),
  userController.getUser
);

router.delete("/:userId", handlePolicies(["ADMIN"]), userController.deleteUser);
module.exports = router;
