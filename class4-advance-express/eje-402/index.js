const express = require("express");
const displayRoutes = require("express-routemap");
const users = require("./users.json");

const PORT = 5_000;
const genders = ["f", "m"];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    res.send(`API running on port ${PORT}`);
  } catch (error) {}
});

app.get("/greetings", (req, res) => {
  try {
    res.send("Hi, I'm using Express");
  } catch (error) {}
});

app.get("/alive", (req, res) => {
  res.json({
    message: "Hi, you created your first API and it's running",
  });
});

app.get("/welcome/:name/:lastName/:age", (req, res) => {
  try {
    const { name, lastName, age } = req.params;

    return res.json({
      message: `Hi, my name is ${name} ${lastName} and I'm ${age} years old, Welcome to the API`,
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js:37 ~ app.get ~ error:", error);
  }
});

/*
^Filter the data by sex
*/
app.get("/users", (req, res) => {
  const { sex } = req.query;

  if (!sex || !genders.includes((!sex ? "" : sex).toLocaleLowerCase())) {
    return res.json({
      message: "Gender does not match",
      sex,
    });
  }

  let filteredList = users.usuarios.filter(
    (user) => user.sexo === sex.toLocaleLowerCase()
  );

  return res.json({
    message: "Users",
    users: filteredList,
  });
});

app.get(`/users/:userId`, (req, res) => {
  try {
    const { userId } = req.params;

    if (isNaN(userId)) {
      return res.status(400).json({
        message: `User with ID ${userId} does not exist`,
      });
    }

    const user = users.usuarios.find((user) => user.id === Number(userId));

    if (!user) {
      return res.json({ messge: "User does not exist", userId });
    }

    return res.json({
      message: `User found with ID ${userId}`,
      user,
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js:70 ~ app.get ~ error:", error);
  }
});

app.post(`/user`, (req, res) => {
  try {
    const user = req.body;

    const lastId = users.usuarios[users.usuarios.length - 1].id;
    const newUser = { id: lastId + 1, ...user };

    res.json({
      message: "User created",
      newUser,
    });
    
  } catch (error) {
    console.log("🚀 ~ file: index.js:95 ~ app.post ~ error:", error);
  }
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API running on port ${PORT}`);
});
