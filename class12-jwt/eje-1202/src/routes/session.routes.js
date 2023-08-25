const passport = require("passport");
const userModel = require("../model/user.model");
const { createHashValue, isValidPassword } = require("../utils/encrypt");
const generateJWT = require("../utils/jwt");
const checkAuthJWT = require("../middleware/aut_jwt.middleware");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, lastName, age } = req.body;

    const passwordHashed = await createHashValue(password);

    const userToAdd = {
      email,
      password,
      name,
      lastName,
      age,
      password: passwordHashed,
    };

    const newUser = await userModel.create(userToAdd);

    req.session.user = { email, name, lastName, age };

    return res.json({
      message: "User registered",
      user: newUser,
    });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:6 ~ router.post ~ error:", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.status(401).json({
        message: `User ${email} not found`,
      });
    }

    const comparePasswords = await isValidPassword(password, findUser.password);

    if (!comparePasswords) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = await generateJWT({ email });
    req.session.user = {
      ...findUser,
    };

    return res
      .cookie("cookieToken", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .send({ message: "Logged in" });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:38 ~ router.post ~ error:",
      error
    );
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) {
        return res.status(200).json({ message: "Logged out" });
      }

      return res.send({ message: "Log out error", body: err });
    });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:78 ~ router.get ~ error:", error);
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  checkAuthJWT("jwt"),
  async (req, res) => {
    try {
      console.log("Validating req", res.user);

      return res.json({ message: "JWT in cookies" });
    } catch (error) {
      console.log(
        "🚀 ~ file: session.routes.js:93 ~ router.get ~ error:",
        error
      );
    }
  }
);

module.exports = router;
