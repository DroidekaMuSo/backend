const router = require("express").Router();

const petsModel = require("../model/pet.model.js");
const petsData = require("../data/pet.js");

router.get("/insertion", async (req, res) => {
  try {
    let add = await petsModel.insertMany(petsData);

    return res.json({
      message: "Pets added",
      pets: add,
    });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:10 ~ router.get ~ error:", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const pets = await petsModel.find({}).lean();

    return res.json({ message: "Pets", pets, length: pets.length });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:23 ~ router.get ~ error:", error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, age, species } = req.body;

    if ((!name, !age, !species))
      return res.json({ message: "All fields are required" });

    const pet = { ...req.body };

    let add = await petsModel.create(pet);

    return res.json({
      message: "Pet has been added",
      pet: add,
    });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:32 ~ router.post ~ error:", error);
  }
});

module.exports = router;
