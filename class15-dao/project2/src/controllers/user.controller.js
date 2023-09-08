const UserServices = require("../services/user.service");

class UserController {
  userServices;

  constructor() {
    this.userServices = new UserServices();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.userServices.getUsers(req, res);

      return res.json({
        message: "Users",
        users,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const user = await this.userServices.getUser(req, res);

      if (!user) {
        return res.status(500).json({ message: `User with not found` });
      }

      return res.status(500).json({ message: "User found", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const deleteUser = await this.userServices.deleteUser(req, res);

      if (!deleteUser) {
        return res.status(500).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted", deleteUser });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        place: "Controller",
      });
    }
  };

  createUser = async (req, res) => {
    try {
      const { name, lastName, email, age, password, role } = req.body;
      if (!name || !lastName || !email || !age || !password || !role) {
        return res.status(400).json({
          message: "Some fields are blank",
          user: {
            name: name,
            lastName: lastName,
            email: email,
            age: age,
            password: password,
            role: role,
          },
        });
      }

      const addUser = await this.userServices.createUser(req, res);

      return res.json({ message: "User created", user: addUser });
    } catch (error) {
      return res
        .status(500)
        .message({ error: error.message, place: "Controller" });
    }
  };
}

module.exports = UserController;
