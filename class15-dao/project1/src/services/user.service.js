const userModel = require("../model/user.model");
const { createHashValue } = require("../utils/bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).lean();

    return users;
  } catch (error) {
    console.log("🚀 ~ file: user.service.js:5 ~ getUsers ~ error:", error);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel
      .findById({ _id: userId })
      .populate("notes.note");

    return user;
  } catch (error) {
    console.log("🚀 ~ file: user.service.js:18 ~ getUser ~ error:", error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, lastName, email, age, password, role } = req.body;

    if (!name || !lastName || !email || !age || !password || !role) {
      return null;
    }

    const findUser = await userModel.find({ email });
    if (!findUser) {
      return null;
    }

    const passwrdHashed = createHashValue(password);

    const userToAdd = {
      email,
      password,
      name,
      lastName,
      age,
      password: passwrdHashed,
      role,
    };

    const newUser = await userModel.create(userToAdd);

    return newUser;
  } catch (error) {
    console.log("🚀 ~ file: user.service.js:31 ~ createUser ~ error:", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleteUser = await userModel.deleteOne({ _id: userId });

    return deleteUser;
  } catch (error) {
    console.log("🚀 ~ file: user.service.js:38 ~ deleteUser ~ error:", error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
};
