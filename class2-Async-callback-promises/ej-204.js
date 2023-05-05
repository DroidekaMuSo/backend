//TODO Define an addition function
const sum = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 === 0 || num2 === 0) {
      reject("Unnecessary operation");
    } else {
      resolve(num1 + num2);
    }
  });
};

//TODO Define an substraccion function
const resta = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 === 0 || num2 === 0) {
      reject("Unnecessary operation");
    } else {
      let result = num1 - num2;

      if (result < 0) {
        reject("Calculator can only return positive numbers");
      }

      resolve(result);
    }
  });
};

//TODO: Define a multiplication function
const multi = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 < 0 || num2 < 0) {
      reject("Can't multiply by zero");
    } else {
      resolve(num1 * num2);
    }
  });
};

//TODO Define a divition function
const div = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("Can't be divided by 0");
    } else {
      const result = num1 / num2;
      resolve(result);
    }
  });
};

const operations = async () => {
  try {
    const div1 = await div(10, 2);
    console.log("🚀 ~ file: ej-204.js:55 ~ operations ~ div1:", div1);

    const sum1 = await sum(10, 10);
    console.log("🚀 ~ file: ej-204.js:58 ~ operations ~ sum1:", sum1);

    const rest = await resta(10, 9);
    console.log("🚀 ~ file: ej-204.js:61 ~ operations ~ rest:", rest);

    const mult = await multi(5, 5);
    console.log("🚀 ~ file: ej-204.js:64 ~ operations ~ mult:", mult);
  } catch (error) {
    console.log("🚀 ~ file: ej-204.js:56 ~ operations ~ error:", error);
  }
};

operations();
