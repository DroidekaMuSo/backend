const { uploader } = require("../utils/multer");

const router = require("express").Router();

const pets = [];

router.get("/", (req, res) => {
  try {
    return res.json({ pets });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:9 ~ router.get ~ error:", error);
  }
});

router.post("/", uploader.single("image"), (req, res) => {
  const newPet = req.body;
  const file = req.file;

  if (!file) {
    return res.json("File wasn't loaded");
  }

  newPet.image = `http://localhost:5000/public/uploads/${file.filename}`;
  pets.push(newPet);

  return res.json({ newPet });
});

module.exports = router;
