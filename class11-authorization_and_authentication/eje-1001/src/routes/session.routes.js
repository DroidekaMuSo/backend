const userModel = require("../model/user.model");
const { isValidPassword, createHashValue } = require("../utils/encrypt");

const router = require("express").Router();

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) return res.redirect("/api/v1/login");

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
      return res.status(401).json({ message: "User not registerd" });
    }

    const isValidComparePsw = await isValidPassword(
      password,
      findUser.password
    );

    if (!isValidComparePsw) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    req.session.user = {
      ...findUser,
    };

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
    const { firstName, lastName, email, age, password } = req.body;

    const pswHashed = await createHashValue(password);

    const userAdd = {
      email,
      password: pswHashed,
      firstName,
      lastName,
      age,
    };

    const newUser = await userModel.create(userAdd);

    req.session.user = { email, firstName, lastName, age };

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
    const { password, email } = req.body;
    console.log("🚀 ~ file: session.routes.js:87 ~ router.post ~ email:", email)

    const newPswHashed = await createHashValue(password);
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: newPswHashed,
    });

    if (!updateUser) {
      res.json({ message: "Problems updating password" });
    }

    return res.render("login");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:86 ~ router.post ~ error:",
      error
    );
  }
});

module.exports = router;
