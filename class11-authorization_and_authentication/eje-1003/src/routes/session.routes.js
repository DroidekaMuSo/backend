const authToken = require("../middleware/auth_token.middlware");
const userModel = require("../model/user.model");
const { isValidPassword, createHashValue } = require("../utils/encrypt");
const generateJWT = require("../utils/jwt");

const router = require("express").Router();

router.post("/login", authToken ,async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = req?.user || (await userModel.findOne({ email }));
    if (!findUser) {
      return res.status(401).json({ message: "User is not registered" });
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

    req.session.user = { ...findUser };
    const token = req.token;

    return res.json({ user: findUser, token });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:6 ~ router.post ~ error:", error);
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) {
        return res.redirect("/login");
      }

      return res.send({
        message: "Log out error",
        body: err,
      });
    });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:38 ~ router.get ~ error:", error);
  }
});

router.get("/register", async (req, res) => {
  try {
    const { name, lastName, email, age, password } = req.body;

    const passwordHashed = await createHashValue(password);

    const userAdd = {
      email,
      password,
      name,
      lastName,
      age,
      password: passwordHashed,
    };

    const newUser = await userModel.create(userAdd);

    const token = await generateJWT(newUser);
    console.log("🚀 ~ file: session.routes.js:70 ~ router.get ~ token:", token);

    req.session.user = { email, name, lastName, age, token };

    return res.render("login");
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:54 ~ router.get ~ error:", error);
  }
});

router.post("/update", async (req, res) => {
  try {
    const { email, password } = req.body;

    const newPasswordHashed = await createHashValue(password);
    const user = await userModel.findOne({ email });

    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: newPasswordHashed,
    });

    if (!updateUser) {
      return res.json({
        message: "Problems updating password",
      });
    }

    return res.render("login");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:83 ~ router.post ~ error:",
      error
    );
  }
});

module.exports = router;
