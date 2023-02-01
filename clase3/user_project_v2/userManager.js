const fs = require("fs/promises");
const bcryptjs = require("bcryptjs");

class UserManager {
  constructor(path) {
    this.path = path;
  }

  async createUser(user) {
    try {
      const { name, lastName, userName, password } = user;
      //TODO: Add the user to the file
      const info = await this.getUsers();
      const lastId = info.users[info.users.length - 1].id + 1;
      console.log(lastId);

      const salt = bcryptjs.genSalt();
      let passwordEncrypted = bcryptjs.hash(password, salt, (err, hash) => {
        if (error) {
          console.log(error);
        }
        passwordEncrypted = hash;
      });
      const pushUser = {
        name: name,
        lastName: lastName,
        userName: userName,
        password: passwordEncrypted,
      };

      info.users.push({ id: lastId, ...pushUser });
      return await fs.writeFile(this.path, JSON.stringify(info));
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    try {
      const info = await fs.readFile(this.path);
      return JSON.parse(info);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserManager;
