const { Router } = require("express");
const usersList = require("../users.json");

const genders = ["f", "m"];
const router = Router();

//Get all the users
router.get(`/`, (req, res) => {
  return res.json({
    ok: true,
    message: "Users list",
    users: usersList.users,
  });
});

//Get the user by its ID
router.get(`/:userId`, (req, res) => {
  console.log("Params", req.params);
  const userId = req.params.userId;

  if (isNaN(userId)) {
    return res.status(400).json({
      ok: true,
      message: `User with ID ${userId} does not exist`,
      queryParams: req.query,
    });
  }

  const user = usersList.users.find((u) => {
    return u.id === Number(userId);
  });

  if (!user) {
    return res.json({
      ok: true,
      message: `The user with the ID ${userId} does not exist`,
      user,
      queryParams: req.query,
    });
  }

  return res.json({
    ok: true,
    message: `Users id: ${userId}`,
    user,
  });
});


//Create a user 
router.post(`/`, (req, res) => {
  const userBody = req.body;
  console.log(userBody);
  const lastId = usersList.users[usersList.users.length - 1].id;

  const newUser = {
    id: lastId + 1,
    ...userBody,
  };

  res.json({
    ok: true,
    message: `User created`,
    user: newUser,
  });
});

module.exports = router;
