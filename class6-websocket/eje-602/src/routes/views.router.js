const router = require("express").Router();

router.get("/exercise1", (req, res) => {
  res.render("exercise1", {
    title: "Exercise 1",
    style: "exercise1.css",
  });
});

router.get("/exercise2", (req, res) => {
  res.render("exercise2", {
    title: "Exercise 2",
    style: "exercise2.css",
  });
});

module.exports = router;
