const router = require("express").Router();
const passport = require("passport");
const userModel = require("../model/user.model");
const { isValidPassword, createHashValue } = require("../utils/encrypt");

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");

    return res.send({ message: "Log out error", body: err });
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.json({ message: "User no registered" });
    }

    const isValidComparePsw = await isValidPassword(
      password,
      findUser.password
    );
    if (!isValidComparePsw) {
      return res.json({ message: "Incorrect password" });
    }

    req.session.user = {
      ...findUser,
    };

    return res.render("profile", {
      lastName: req.session?.user?.lastName || findUser.lastName,
      email: req.session?.user?.email || findUser.email,
      age: req.session?.user?.age || findUser.age,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:20 ~ router.post ~ error:",
      error
    );
  }
});

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, age, password } = req.body;

    const passwordHashed = await createHashValue(password);

    const userAdd = {
      email,
      firstName,
      lastName,
      password: passwordHashed,
    };

    const newUser = await userModel.create(userAdd);

    req.session.user = { email, firstName, lastName, age };

    return res.render("login");
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:44 ~ router.post ~ error:", error);
  }
});

router.post("/update", async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    const newPasswordHashed = await createHashValue(newPassword);

    const user = await userModel.findOne({ email });

    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: newPasswordHashed,
    });

    if (!updateUser) {
      res.json({
        message: "Problems updating credentials",
      });
    }

    return res.render("login");
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:70 ~ router.post ~ error:", error);
  }
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      req.session.user = req.user;

      res.redirect("/profile");
    } catch (error) {
      console.log("🚀 ~ file: views.routes.js:103 ~ async ~ error:", error);
    }
  }
);

module.exports = router;
