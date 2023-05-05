//TODO: Callbacks base, greetings
function greet(name, callBack) {
  console.log(`Hi ${name}`);
  callBack();
}

function callMe() {
  console.log(`I'm a callBack function`);
}

const callMe2 = () => {
  console.log("I'm a callback function version2");
};

greet("Diego", callMe);
greet("Cynthia", callMe2);
greet("Gabriela", () => console.log(`I'm a callback function version 3`));

//TODO Callback with even numbers
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const evenCallBack = (num) => (num % 2 === 0 ? num : "It's not even");

const evenCallBackV2 = (num) => {
  if (num % 2 === 0) {
    return num;
  } else {
    return `It's not even`;
  }
};

const evenNumbers = numbers.map(evenCallBack);
const evenNumbersV2 = numbers.map(evenCallBackV2);

console.log("🚀 ~ file: ej-201.js:33 ~ evenNumbers:", evenNumbers);
console.log("🚀 ~ file: ej-201.js:35 ~ evenNumbersV2:", evenNumbersV2);

//TODO: Add a MAP function
//Example 1
const doubleNumbers = numbers.map((num) => {
  return num * 2;
});
console.log(
  "🚀 ~ file: ej-201.js:43 ~ doubleNumbers ~ doubleNumbers:",
  doubleNumbers
);

//Example 2
let beverages = ["full", "empty", "full", "empty", "half empty"];

const checkBeverages = (arrayBeverages, callBack) => {
  let beveragesFull = [];

  for (let index = 0; index < arrayBeverages.length; index++) {
    const newBeverage = callBack(arrayBeverages[index]);
    beveragesFull.push(newBeverage);
  }

  return beveragesFull;
};

const fillBeverages = (beverage) => {
  if (beverage === "empty") {
    beverage = "full";
  }

  return beverage;
};

const refillBeverages = checkBeverages(beverages, fillBeverages);
console.log("🚀 ~ file: ej-201.js:71 ~ refillBeverages:", refillBeverages);

//TODO: Create a function, which has as parameters 2 numbers and a callback

const sumFun = (num1, num2) => num1 + num2;
const restarFun = (num1, num2) => num1 - num2;
const multiFun = (num1, num2) => num1 * num2;
const divFun = (num1, num2) => num1 / num2;

const doOperation = (num1, num2, callBack) => {
  if (num2 <= 0 && callBack == divFun) {
    return `It can't be divided by 0`;
  }

  let result = callBack(num1, num2);

  return result;
};

const sum = doOperation(1, 3, sumFun);
const rest = doOperation(10, 2, restarFun);
const multi = doOperation(5, 5, multiFun);
const div = doOperation(10, -1, divFun);

console.log(sum);
console.log(rest);
console.log(multi);
console.log(div);
