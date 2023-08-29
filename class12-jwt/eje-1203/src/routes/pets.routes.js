const router = require("express").Router();

const pets = [];
const regExpPetName = "[a-zA-Z]+";

router.get(`/:petName(${regExpPetName})`, (req, res) => {
  try {
    const findPet = pets.find((pet) => {
      pet.name.toLocaleLowerCase() === req.petName.toLocaleLowerCase();
    });

    if (!findPet) {
      res.json({
        message: `This pet ${req.petName} does not exist`,
      });
    }

    return res.json({ pet: findPet, message: "Search pets by name" });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:10 ~ router.get ~ error:", error);
  }
});

router.get("/", (req, res) => {
  try {
    return res.json({ pets, message: "Get all pets" });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:29 ~ router.get ~ error:", error);
  }
});

router.post("/", (req, res) => {
  try {
    const { name, specie } = req.body;

    const newPet = {
      name: name.toLocaleLowerCase(),
      specie: specie.toLocaleLowerCase(),
    };
    pets.push(newPet);

    return res.json({ message: "Pet created", pet: newPet });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:35 ~ router.post ~ error:", error);
  }
});

router.put("/:petName([a-zA-A]+)", (req, res) => {
  try {
    const { petName } = req.params;

    const pet = pets.find((pet) => {
      return pet.name === petName.toLowerCase();
    });

    const petIndex = pets.findIndex((pet) => {
      return pet.name === petName.toLocaleLowerCase();
    });

    const updatePet = { ...pet, adopted: true };
    pets[petIndex] = { ...updatePet };

    return res.json({ pet: updatePet, message: "Pet updated" });
  } catch (error) {
    console.log("🚀 ~ file: pets.routes.js:51 ~ router.put ~ error:", error);
  }
});

router.param("petName", async (req, res, next, petName) => {
  console.log(petName);

  if (!petName) {
    req.petName = null;
  }

  req.petName = petName;
  next();
});
module.exports = router;
