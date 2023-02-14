const { Router } = require("express");
const { uploader } = require("../utils");

const router = Router();
const pets = [];

//getAllPets
// api/pets
router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Pets list",
    pets,
  });
});

//Create a Pet
router.post("/", uploader.single(thumbnail), (req, res) => {
  const file = req.file;
  console.log(file);

  if (!file)
    return res.status(400).send({
      message: "Could not upload file",
    });

  const newPet = req.body;
  newPet.thumbnail = `http://localhost:5000/public/uploads/${file.filename}`;
  pets.push(newPet);
  res.json({
    ok: true,
    message: "upload succesfully",
    pet: newPet,
  });
});

module.exports = router;
