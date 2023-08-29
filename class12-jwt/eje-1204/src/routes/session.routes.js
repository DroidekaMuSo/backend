const handlePolicies = require("../middlewares/handle-policies.middleware");
const userModel = require("../models/user.model");
const { createHashValue, isValidPassword } = require("../utils/encrypt");
const { generateJWT } = require("../utils/jwt");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const { name, lastName, email, age, password, role } = req.body;

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

    req.session.user = { email, role, id: newUser.id };

    return res.json({
      message: "User created",
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
      return res.json({ message: "User is not registered" });
    }

    const isValidPassword = await isValidPassword(password, findUser.password);
    if (!findUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const signUser = {
      email,
      role: findUser.role,
      id: findUser._id,
    };

    const token = await generateJWT({ ...signUser });

    req.session.user = {
      ...signUser,
    };

    return res.json({ message: `Welcome ${email}`, token });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:39 ~ router.post ~ error:",
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
    async (req, res) => {
      console.log(`Validating request`, req.user);

      return res.json({ message: "JWT in headers" });
    };
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:89 ~ router.get ~ error:", error);
  }
});

router.get("/current/admin", handlePolicies(["ADMIN"]), async (req, res) => {
  try {
    console.log("Validating request", req.user);

    return res.json({ message: "JWT in headers being ADMIN" });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:101 ~ router.get ~ error:",
      error
    );
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
        "🚀 ~ file: session.routes.js:114 ~ router.get ~ error:",
        error
      );
    }
  }
);


module.exports = router;
