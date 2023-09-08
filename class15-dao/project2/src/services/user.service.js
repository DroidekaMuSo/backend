const userModel = require("../models/user.model");
const { use } = require("../routes/user.routes");
const { hashedPassword } = require("../utils/encrypt");

class UserServices {
  getUsers = async (req, res) => {
    try {
      const users = await userModel.find({}).lean();

      return users;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await userModel.findById({ _id: userId });

      return user || null;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await userModel.findById({ _id: userId });
      if (!user) {
        return null;
      }

      const deleteUser = await userModel.deleteOne({ _id: userId });

      return deleteUser;
    } catch (error) {
      return res.status(500).json({ message: error.message, place: "Service" });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, lastName, email, age, password, role } = req.body;

      const encryptPassword = await hashedPassword(password);
      const userToAdd = {
        name,
        lastName,
        email,
        age,
        password,
        role,
        password: encryptPassword,
      };

      const addUser = await userModel.create(userToAdd);

      return addUser;
    } catch (error) {
      return res.status(500).json({ message: error.message, place: "Service" });
    }
  };
}

module.exports = UserServices;
