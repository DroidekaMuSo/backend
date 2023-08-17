const userModel = require("../model/user.model");
const passport = require("passport");
const router = require("express").Router();

router.get("/login", async (req, res) => {
  try {
    res.render("login", { title: "Log in" });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:7 ~ router.get ~ error:", error);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:14 ~ router.get ~ error:", error);
  }
});

router.get("/recover", async (req, res) => {
  try {
    res.render("recover");
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:23 ~ router.get ~ error:", error);
  }
});

router.get("/profile", async (req, res) => {
  try {
    const user = req.session.user;

    res.render("profile", {
      lastName: user.lastName || user.firstName,
      age: user.age,
      email: user.email,
    });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:30 ~ router.get ~ error:", error);
  }
});


module.exports = router;
