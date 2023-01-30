//TODO: Define an addition function, numbers can't be 0, if one of them is 0 it's rejected with unnescesary operation

const addition = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 === 0 || num2 === 0) {
      reject("Unnescesary operation");
    } else {
      resolve(num1 + num2);
    }
  });
};

//TODO: Define an substact function, both values must be different from, if one of them is 0, it will be rejected with unnescesary function. If the result returned is negative, return 'The calculator only can return positive values

const substract = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 === 0 || num2 === 0) {
      reject("Unnescesary operation");
    } else {
      let substactResult = num1 - num2;
      if (substactResult < 0) {
        reject("The calculator only can return positive values");
      }
      resolve(substactResult);
    }
  });
};

//TODO: Define a multiplication function which returns the value that none of the values are negative. If result is negative, reject with 'The calculator only can return positive values'

const multiplication = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) {
      reject("The calculator only can return positive values");
    } else {
      resolve(a * b);
    }
  });
};

//TODO: Define a divide function

const div = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("Cannot do divisions with zero");
    } else {
      const result = num1 / num2;
      resolve(result);
      console.log(object);
      //Calling another promise
      youAreACrack();
    }
  });
};

const youAreACrack = () => console.log("You are a crack");
const difficultCalculations = (input) =>
  console.log(input, "It is going to take some time ");

// Use an asyncronus function called calculations, using async/await and try & catch

const calculations = async () => {
  try {
    const division1 = await div(10, 2);
    console.log(division1);
    difficultCalculations(division1);

    const addition1 = await addition(10, 10);
    console.log(addition1);

    const substact1 = await substract(10, 9);
    console.log(substact1);

    const multiplication1 = await multiplication(5, 5);
    await multiplication(-1, 10);
    console.log(multi);
  } catch (error) {
    console.log(error);
  }
};

calculations()
