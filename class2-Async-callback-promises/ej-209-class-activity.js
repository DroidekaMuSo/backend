const objects = [
  {
    apples: 3,
    pears: 2,
    meet: 1,
    juice: 5,
    candies: 2,
  },
  {
    apples: 1,
    watermelon: 1,
    eggs: 6,
    juices: 1,
    breads: 4,
  },
];

const arrKeys = Object.keys(objects);
console.log("🚀 ~ file: ej-209-class-activity.js:19 ~ arrKeys:", arrKeys);

let newArray = [];

objects.forEach((object) => {
  const keys = Object.keys(object);
  console.log(
    "🚀 ~ file: ej-209-class-activity.js:25 ~ objects.forEach ~ keys:",
    keys
  );

  keys.forEach((key) => {
    if (!newArray.includes(key)) newArray.push(key);
  });
});

console.log("🚀 ~ file: ej-209-class-activity.js:22 ~ newArray:", newArray);
