const router = require("express").Router();

const userModel = require("../model/user.model");
const { isValidPassword, createHashValue } = require("../utils/encrypt");
const generateJWT = require("../utils/jwt");

router.post("/register", async (req, res) => {
  try {
    const { name, lastName, email, age, password } = req.body;

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
    console.log(
      "🚀 ~ file: session.routes.js:10 ~ router.post ~ error:",
      error
    );
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.status(401).json({
        message: "User no registered",
      });
    }

    const isValidComparePassword = await isValidPassword(
      password,
      findUser.password
    );

    if (!isValidComparePassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = await generateJWT({ email });
    console.log(
      "🚀 ~ file: session.routes.js:30 ~ router.post ~ token:",
      token
    );

    req.session.user = {
      ...findUser,
    };

    return res
      .cookie("cookieToken", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .send({ message: "Log in succesfully" });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:7 ~ router.post ~ error:", error);
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) {
        return res.status(500).json({
          message: "Log out succesfully",
        });
      }

      return res.send({
        message: "Log out error",
        body: err,
      });
    });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:83 ~ router.get ~ error:", error);
  }
});

module.exports = router;
