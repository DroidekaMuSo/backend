const userServices = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await userServices.getUsers(req, res);

    return res.json({ message: "Get users", users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userServices.getUser(req, res);

    return res.json({
      message: "Get user by Id for USER role",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await userServices.deleteUser(req, res);

    return res.json({
      message: "Delete user",
      user: deleteUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getUsers,
  getUser,
  deleteUser,
};
