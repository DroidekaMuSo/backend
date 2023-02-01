const ELEMENTOS = 100;

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + 1);
};

const randomArr = new Array(ELEMENTOS).fill(null).map(() => random(1, 20));
console.log(randomArr);

//Forma 1
const mappingRandom = randomArr.reduce(
  (acc, value) => (acc[value] ? (acc[value] += 1) : (acc[value] = 1), acc),
  {}
);
console.log(mappingRandom);

//Forma 2
const result = {};
randomArr.forEach((number) => {
  result[number] = result[number] + 1 || 1;
});
console.log(result);
