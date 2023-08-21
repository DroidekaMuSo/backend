const authMdw = require("../middleware/auth.middleware");

const router = require("express").Router();

router.get("/login", async (req, res) => {
  try {
    res.render("login", { title: "Log in", style: "login.css" });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:6 ~ router.get ~ error:", error);
  }
});

router.get("/recover", async (req, res) => {
  try {
    res.render("recover", { title: "Recover password", style: "recover.css" });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:14 ~ router.get ~ error:", error);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("register", { title: "Register", style: "register.css" });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:22 ~ router.get ~ error:", error);
  }
});

router.get("/profile", authMdw, async (req, res) => {
  try {
    const user = req.session.user;

    res.render("profile", {
      lastName: user.lastName || user.name,
      age: user.age,
      email: user.email,
    });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:30 ~ router.get ~ error:", error);
  }
});

module.exports = router;
