const userModel = require("../models/user.model");
const { isValidPassword, createHashValue } = require("../utils/encrypt");

const router = require("express").Router();

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) return res.redirect("/login");

      return res.send({ message: "Log out error", body: err });
    });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:6 ~ router.get ~ error:", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.status(401).json({
        message: "User not registered",
      });
    }

    const isValidComparePsw = await isValidPassword(
      password,
      findUser.password
    );

    if (!isValidComparePsw) {
      return res.status(401).json({
        message: "Credentials do not match",
      });
    }

    req.session.user = { ...findUser };

    return res.render("profile", {
      lastName: req.session?.user?.lastName || findUser.lastName,
      email: req.session?.user?.email || email,
      age: req.session?.user?.age || findUser.age,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:18 ~ router.post ~ error:",
      error
    );
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, lastName, email, age, password } = req.body;

    const pswHashed = await createHashValue(password);

    const userToAdd = {
      email,
      password,
      name,
      lastName,
      age,
      password: pswHashed,
    };

    const newUser = await userModel.create(userToAdd);
    req.session.user = { email, name, lastName, age };

    return res.render("login");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:59 ~ router.post ~ error:",
      error
    );
  }
});

router.post("/recover-psw", async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credentials do not match" });
    }

    const newPasswordHashed = await createHashValue(newPassword);
    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: newPasswordHashed,
    });

    return res.render("login");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:87 ~ router.post ~ error:",
      error
    );
  }
});

module.exports = router;
