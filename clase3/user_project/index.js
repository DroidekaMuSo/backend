const path = require("path");
const UserManager = require("./userManager");
console.log("index userProject");

const userProject = async () => {
  const newUser = {
    name: "Diego",
    lastName: "Munoz",
    age: 24,
    course: "Backend",
  };

  try {
    const baseRoute = path.join(`${__dirname}/db.json`);
    const manager = new UserManager(baseRoute);
    const userList = await manager.getUsers();
    console.log(userList);

    const newUser = {
      name: "Diego",
      lastName: "Munoz",
      age: 24,
      course: "Backend",
    };
    const pushingUser = await manager.createUser(newUser);
    console.log(pushingUser);
  } catch (error) {
    console.log(error);
  }
};

userProject();
