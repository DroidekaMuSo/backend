const router = require("express").Router();

router.get("/", (req, res) => {
  try {
    res.render("register", { style: "register.css" });
  } catch (error) {
    console.log("🚀 ~ file: views.router.js:6 ~ router.get ~ error:", error);
  }
});
module.exports = router;
