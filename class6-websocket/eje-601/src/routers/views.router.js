const router = require("express").Router();

router.get("/exercise1", (req, res) => {
  return res.render("exercie1", {
    title:"Exercise 1",
    style:"exercise1.css"
  });
});

router.get("/exercise2", (req, res) => {
  return res.render("exercise2", {
    style: "exercise2.css",
    title: "exercise2",
  });
});

module.exports = router;
