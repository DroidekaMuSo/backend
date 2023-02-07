const express = require("express");
const PORT = 5000;

//Importing our users list
const usersList = require("./users.json");
const genders = ["f", "m"];

//Creating the server
const app = express();
app.use(express.urlencoded({ extended: true }));
//Running the server on port 5000
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

//TODO:Simple get
//Sending gets to the server
app.get("/", (request, response) => {
  response.send(`API alive on port ${PORT}!!`);
});
//TODO: Creating a route called greetings
app.get("/greetings", (req, res) => {
  res.send(`Hi, I'm using express`);
});

//TODO: Creating a route called alived and returning a json
app.get("/alive", (req, res) => {
  res.json({
    message: "Hi, you made your first API and you are executing it.",
  });
});

//TODO: Creating a route called welcome with params and returning a json based on those params
app.get(`/welcome/:name/:lastName/:age`, (req, res) => {
  //Destructuring the params, use the same name
  const { name, lastName, age } = req.params;
  return res.json({
    ok: true,
    message: `Hi ${name} ${lastName} ${age}, welcome to the API`,
  });
});

//TODO:Create a route called users and filter it suing a query param
//Using filters
app.get(`/users`, (req, res) => {
  console.log("Query Params", req.query);
  const { sex } = req.query;

  if (!sex || !genders.includes((!sex ? "" : sex).toLocaleLowerCase())) {
    return res.json({
      ok: true,
      message: "The introduced gender does not exist or is invalid",
      queryParams: req.query,
    });
  }

  let filteredList = usersList.users.filter(
    (user) => user.gender === sex.toLocaleLowerCase()
  );
  return res.json({
    ok: true,
    message: `Users list`,
    users: filteredList,
  });
});

//
app.get("/users/:userId", (req, res) => {
  console.log("Query Params", req.params);

  const userId = req.params.userId;

  if (isNaN(userId)) {
    return res.status(400).json({
      ok: true,
      message: `Do not exist a user with id ${userId}`,
      queryParams: req.query,
    });
  }

  const user = usersList.usuarios.find((user) => {
    return user.id === Number(userId);
  });

  if (!user) {
    return res.json({
      ok: true,
      message: `${userId} not found`,
      queryParams: req.query,
    });
  }

  return res.json({
    ok: true,
    message: `user id:${userId}`,
    user,
  });
});


