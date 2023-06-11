const router = require("express").Router();

const pets = [];

router.get("/", (req, res) => {
  try {
    return res.json({ pets });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:9 ~ router.get ~ error:", error);
  }
});

router.post("/", (req, res) => {
  const newPet = req.body;

  pets.push(newPet);

  return res.json({ newPet });
});

module.exports = router;
