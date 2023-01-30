//Callbacks
const greet = (name, callBack) => {
  console.log(`Hi ${name}`);
  callBack();
};

const callMe = () => {
  console.log(`I'm a callback function`);
};

greet("Jose", callMe);
console.log(greet);

//Callback with Map method
//Check if the numbes is odd, if it is change it to text 'It's not even'
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenCallBack = (num) => {
  if (num % 2 === 0) {
    return num;
  } else {
    return `It's not even`;
  }
};

const pairNumbersV2 = numbers.map(evenCallBack);
console.log(pairNumbersV2);

//Example 1
//Multiply by 2 the numbers of an array
const doubleNumbers = numbers.map((num) => num * 2);
console.log(doubleNumbers);

//Example 2
//Check if it's empty, then fill them
const beverages = ["empty", "full", "empty", "half empty"];
const checkBeverages = (beveragesArray, callBack) => {
  const beveragesFull = [];

  for (let index = 0; index < beveragesArray.length; index++) {
    const newBeverage = callBack(beveragesArray[index]);
    beveragesFull.push(newBeverage);
  }
  return beveragesFull;
};

//function callback to change empty to full
const fillBeverages = (beverage) => {
  if (beverage === "empty") {
    beverage = "full";
  }
  return beverage;
};

const fillBeveragesFunction = checkBeverages(beverages, fillBeverages);
console.log(fillBeveragesFunction);

//Example 3
//Create a function wich contains as a parameter two numbers and a callback that executes a
const sumFun = (num1, num2) => num1 + num2;
const subtractFun = (num1, num2) => num1 - num2;
const multiplyFun = (num1, num2) => num1 * num2;
const divideFun = (num1, num2) => num1 / num2;

const doOperation = (num1, num2, callBack) => {
  let result = callBack(num1, num2);
  return result;
};

console.log(doOperation(1, 4, sumFun));
console.log(doOperation(1, 4, subtractFun));
console.log(doOperation(1, 4, multiplyFun));
console.log(doOperation(1, 4, divideFun));
