const userJohn = {
  name: "John",
  lastName: "Smith",
  age: 30,
  gender: "M",
};

const userCarlos = {
  name: "Carlos",
  lastName: "Ferrer",
  age: 22,
  gender: "M",
};

const users = [
  { ...userJohn },
  { ...userCarlos },
  {
    name: "Jimena",
    lastName: "Jimenez",
    age: 19,
    gender: "F",
  },
];

let animal = {
  specie: "Mammal",
  name: "Leon",
  age: "20",
  diet: "carnivore",
};

const {name,...restAnimal} = animal
console.log("🚀 ~ file: ej-208-spreadOperator.js:34 ~ restAnimal:", restAnimal)
console.log("🚀 ~ file: ej-208-spreadOperator.js:34 ~ name:", name)
