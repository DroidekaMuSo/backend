const { Router } = require("express");

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
router.post("/", (req, res) => {
  const newPet = req.body;
  console.log(newPet);
  pets.push(newPet);

  res.json({
    ok: true,
    message: "Pet added succesfully",
    pet: newPet,
  });
});

module.exports = router;
