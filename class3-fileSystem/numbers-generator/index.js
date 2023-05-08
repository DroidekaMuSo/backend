const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ELEMENTS = 100;

const randomArr = new Array(ELEMENTS).fill(null).map(() => random(1, 20));
console.log("🚀 ~ file: index.js:8 ~ randomArr:", randomArr);

const mappingRandom = randomArr.reduce(
  (acc, value) => (acc[value] ? (acc[value] += 1) : (acc[value] = 1), acc)
);
console.log("🚀 ~ file: index.js:13 ~ mappingRandom:", mappingRandom);

const result = {};
randomArr.forEach((item) => {
  console.log(`For each element ${result[item]}, ${result[item] + 1}`);

  result[item] = result[item] + 1 || 1;
});
console.log("🚀 ~ file: index.js:16 ~ result:", result);
