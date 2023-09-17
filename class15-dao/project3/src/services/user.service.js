import userModel from "../model/user.model.js";

export default class UserServices {
  getUsers = async () => {
    try {
      const users = await userModel.find({}).lean();
      return users;
    } catch (error) {
      console.log(
        "🚀 ~ file: user.service.js:7 ~ UserServices ~ getUsers=async ~ error:",
        error
      );
      return null;
    }
  };

  getUserById = async (id) => {
    try {
      const user = await userModel.findById({ _id: id });

      return user;
    } catch (error) {
      console.log(
        "🚀 ~ file: user.service.js:18 ~ UserServices ~ getUserById=async ~ error:",
        error
      );
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const createUser = await userModel.create(user);

      return createUser;
    } catch (error) {
      console.log(
        "🚀 ~ file: user.service.js:34 ~ UserServices ~ createUser=async ~ error:",
        error
      );
      return null;
    }
  };

  updateUserById = async (userId, data) => {
    try {
      const updateUser = await userModel.updateUserById({ _id: id }, data);

      return updateUser;
    } catch (error) {
      console.log(
        "🚀 ~ file: user.service.js:48 ~ UserServices ~ updateUserById= ~ error:",
        error
      );
      return null;
    }
  };

  deleteUserById = async (userId) => {
    try {
      const deleteUser = await userModel.deleteOne({ _id: userId });

      return deleteUser;
    } catch (error) {
      console.log(
        "🚀 ~ file: user.service.js:62 ~ UserServices ~ deleteUser ~ error:",
        error
      );
      return null;
    }
  };
}
