const router = require("express").Router();
const { fork } = require("child_process");

let visits = 0;

router.get("/", (req, res) => {
  try {
    visits++;

    res.send(`Amount of visits: ${visits}`);
  } catch (error) {
    console.log("🚀 ~ file: calculos.routes.js:6 ~ router.get ~ error:", error);
  }
});

router.get("/calculo-bloq", (req, res) => {
  try {
    let sum = 0;

    for (let index = 0; index < 5e9; index++) {
      sum += index;
    }

    res.send(`Result: ${sum}`);
  } catch (error) {
    console.log(
      "🚀 ~ file: calculos.routes.js:18 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/calculo-nobloq", (req, res) => {
  try {
    console.log(visits);

    const child = fork("./calculo.js");

    child.on("message", (result) => {
      res.send(`Result: ${result}`);
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: calculos.routes.js:35 ~ router.get ~ error:",
      error
    );
  }
});

module.exports = router;
