//TODO: Traditional functions
function greetings(name) {
  return `Hi ${name}, welcome. `;
}

const sayHi = greetings("Diego");
console.log("🚀 ~ file: ej-102.js:6 ~ sayHi:", sayHi);

const sayHi2 = greetings();
console.log("🚀 ~ file: ej-102.js:9 ~ sayHi2:", sayHi2);

//TODO: Create arrow functions
const greetingsV2 = (name) => {
  return `Hi ${name}, welcome.`;
};

const sayHi3 = greetingsV2("Cynthia");
console.log("🚀 ~ file: ej-102.js:18 ~ sayHi3:", sayHi3);

const greetingsV3 = (name) => `Hi ${name}, welcome.`;
const sayHi4 = greetingsV3("Sandra");
console.log("🚀 ~ file: ej-102.js:22 ~ sayHi4:", sayHi4);
