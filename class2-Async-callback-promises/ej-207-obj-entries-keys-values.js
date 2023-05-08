let user = {
  name: "John",
  lastName: "Smith",
  age: 30,
  gender: "M",
};

const users = [
  { ...user },
  {
    name: "Carlos",
    lastName: "Ferrer",
    age: 22,
    gender: "M",
  },
  {
    name: "Jimena",
    lastName: "Jimenez",
    age: 19,
    gender: "F",
  },
];

const arrEntries = Object.entries(user);
console.log(
  "🚀 ~ file: ej-207-obj-entries-keys-values.js:25 ~ arrEntries:",
  arrEntries
);

const arrKeys = Object.keys(user);
console.log(
  "🚀 ~ file: ej-207-obj-entries-keys-values.js:29 ~ arrKeys:",
  arrKeys
);

const arrValues = Object.values(user);
console.log(
  "🚀 ~ file: ej-207-obj-entries-keys-values.js:37 ~ arrValues:",
  arrValues
);

let totalUserAges = users.reduce(
  (acum, currentValue) => acum + currentValue.age
);
console.log(
  "🚀 ~ file: ej-207-obj-entries-keys-values.js:45 ~ totalUserAges:",
  totalUserAges
);

let maxUserAge = users.reduce((acum, currentValue) => {
  return acum <= currentValue.age ? currentValue.age : acum;
});
console.log(
  "🚀 ~ file: ej-207-obj-entries-keys-values.js:53 ~ maxUserAge ~ maxUserAge:",
  maxUserAge
);
