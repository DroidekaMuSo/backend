const handlePolicies = require("../middlewares/handlePolicies.middleware");
const userModel = require("../model/user.model");
const { isValidPassword, createHashValue } = require("../utils/bcrypt");
const generateJWT = require("../utils/jwt");

const router = require("express").Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(401).json({ message: "User is not registered" });
    }

    const validatePassword = await isValidPassword(password, findUser.password);
    if (!validatePassword) {
      return res.status(401).json({ message: "Unauthorized credentials" });
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
    return res.json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, lastName, email, age, password, role } = req.body;

    const validateUser = await userModel.findOne({ email });
    if (validateUser) {
      return res
        .status(401)
        .json({ message: `User ${email} is already registered` });
    }

    const hashPassword = await createHashValue(password);

    const userToAdd = {
      email,
      password,
      name,
      lastName,
      age,
      password: hashPassword,
      role,
    };

    const newUser = await userModel.create(userToAdd);

    return res.status(200).json({
      message: "User created",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/current", handlePolicies(["PUBLIC"]), async (req, res) => {
  try {
    return res.json({
      message: "JWT in headers",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/current/admin", handlePolicies(["ADMIN"]), async (req, res) => {
  try {
    return res.json({
      message: "JWT in headers being ADMIN",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/current/admin",
  handlePolicies(["USER", "ADMIN"]),
  async (req, res) => {
    try {
      return res.json({
        message: "JWT in headers",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
