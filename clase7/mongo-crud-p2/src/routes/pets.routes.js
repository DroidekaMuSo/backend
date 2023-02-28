const { Router } = require("express");

const petsData = require("../data/pets"),
  petsModel = require("../model/pets.model");

const router = Router();

router.get("/insertion", async (req, res) => {
  let result = await petsModel.insertMany(petsData);
  return res.status(200).json({
    message: "Pets added",
    pets: result,
  });
});

router.get("/", async (req, res) => {
  const petsList = await petsModel.find();
  return res.status(200).json({
    message: "Pets",
    petsSize: petsList.length,
    pets: petsList,
  });
});
router.post("/", async (req, res) => {
  const { name, age, specie } = req.body;

  if (!name || !age || !specie) {
    return res.status(400).json({
      message: "All fieds are required",
    });
  }

  let pet = { ...req.body };
  let newPet = await petsModel.create(pet);

  return res.status(200).json({
    message: "Pet added",
    pet: newPet,
  });
});

module.exports = router;
