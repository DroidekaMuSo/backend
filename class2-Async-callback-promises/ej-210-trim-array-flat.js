const matrix = [
  [2, 3, 66, 2, -1, 9],
  [97, -25, -6, 78, 55],
  [0, 1, -1, 2, [0, 100]],
];

const flatMatrix = matrix.flat(2);
console.log("🚀 ~ file: ej-210-trim-array-flat.js:8 ~ flatMatrix:", flatMatrix);

const testString = "           Greetings";
console.log(
  "🚀 ~ file: ej-210-trim-array-flat.js:12 ~ testString:",
  testString.trim()
);

if (testString.trim().length > 0) {
  console.log("String is not empty");
} else {
  console.log("String is empty");
}
