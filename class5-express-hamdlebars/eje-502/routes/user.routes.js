const router = require("express").Router();
const usersList = require("../users.json");

router.get("/", (req, res) => {
  try {
    return res.json({ usersList });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:9 ~ router.get ~ error:", error);
  }
});

router.get("/:uId", (req, res) => {
  const { uId } = req.params;

  if (isNaN(uId)) {
    res.json({
      message: "ID is not in the correct format",
    });
  }

  if (Number(uId < 0 || uId > usersList.length)) {
    return res.json({
      message: "ID out of range",
    });
  }

  const user = usersList.find((user) => user.id === Number(uId));
  return res.json({ user });
});

router.post("/", (req, res) => {
  const { name, lastName, age } = req.body;

  if (!name || !lastName || !age) {
    return res.json({ Message: "All fields are required", fields: req.body });
  }

  const lastId = usersList[usersList.length - 1].id + 1;

  const user = { id: lastId, ...req.body };
  usersList.push(user);

  return res.json(usersList);
});
module.exports = router;
