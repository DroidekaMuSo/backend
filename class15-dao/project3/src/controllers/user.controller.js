import UserService from "../services/user.service.js";

const userService = new UserService();

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    return res.json({
      message: "Get users",
      users: users,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.controller.js:9 ~ getUsers ~ error:", error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userService.getUserById(userId);

    if (!user) {
      return res
        .status(500)
        .json({ message: "User id not found", userId: userId });
    }

    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(
      "🚀 ~ file: user.controller.js:22 ~ getUserById ~ error:",
      error
    );
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;

    const data = await userService.createUser(user);

    return res.json({
      message: "User created",
      user: user,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: user.controller.js:43 ~ createUser ~ error:",
      error
    );
  }
};

export const updateUserById = async (req, res) => {
  try {
    const user = req.body;
    const { userId } = req.params;

    const data = await userService.updateUserById(userId, user);

    return res.status(200).json({
      nessage: "User updated",
      user: data,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: user.controller.js:61 ~ updateUserById ~ error:",
      error
    );
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleteUser = await userService.deleteUserById(userId);

    return res.status(200).json({
      message: "User deleted",
      user: deleteUser,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: user.controller.js:80 ~ deleteUserById ~ error:",
      error
    );
  }
};
