const handlePolicies = require("../middlewares/handlePolicies.middleware");
const userModel = require("../model/user.model");
const { createHashValue, isValidPassword } = require("../utils/encrypt");
const generateJWT = require("../utils/jwt");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const { name, lastName, email, age, password, role } = req.body;

    const findUser = await userModel.find({ email });
    if (!findUser) {
      return res.json({
        message: `User ${email} is already registered`,
      });
    }

    const passwordHashed = await createHashValue(password);

    const userToAdd = {
      email,
      password,
      name,
      lastName,
      age,
      password: passwordHashed,
      role,
    };

    const newUser = await userModel.create(userToAdd);

    return res.json({
      message: "User created",
      user: newUser,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:6 ~ router.post ~ error:", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email }).lean();
    if (!findUser) {
      return res.status(401).json({
        message: "User doesn't exist",
      });
    }

    const validPassword = await isValidPassword(password, findUser.password);
    if (!validPassword) {
      return res.status(401).json({ mnessage: "Invalid credentials" });
    }

    const signUser = {
      email,
      role: findUser.role,
      id: findUser._id,
    };

    const token = await generateJWT({ ...signUser });

    return res.json({
      message: `Welcome ${email}`,
      token,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:43 ~ router.post ~ error:",
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

      return res.status(500).json({ message: "Internal error", err });
    });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:74 ~ router.get ~ error:", error);
  }
});

router.get("/current", handlePolicies(["PUBLIC"]), async (req, res) => {
  try {
    console.log("Validating request", req.user);

    return res.json({ message: `JWT in headers` });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:80 ~ router.post ~ error:",
      error
    );
  }
});

router.get("/current/admin", handlePolicies(["ADMIN"]), async (req, res) => {
  try {
    console.log("Validating request", req.user);

    return res.json({ message: "JWT in headers, being ADMIN" });
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:94 ~ router.get ~ error:", error);
  }
});

router.get(
  "/current/user",
  handlePolicies(["USER", "ADMIN"]),
  async (req, res) => {
    try {
      console.log("Validating request", req.user);

      return res.json({ message: "JWT in headers" });
    } catch (error) {
      console.log(
        "🚀 ~ file: session.routes.js:104 ~ router.get ~ error:",
        error
      );
    }
  }
);

module.exports = router;
