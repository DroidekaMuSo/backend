const squareArea = (b, h) => {
  return new Promise((resolve, reject) => {
    if (b < 0) {
      reject("Do not exist negative areas");
    } else if (h < 0) {
      reject("Do not exist negative areas");
    } else {
      resolve(b * h);
    }
  });
};
console.log(squareArea(70, 20));

const traingleArea = (b, h) => {
  return new Promise((resolve, reject) => {
    if (b < 0) {
      reject("Do not exist negative areas");
    } else if (h < 0) {
      reject("Do not exist negative areas");
    } else {
      resolve((b * h) / 2);
    }
  });
};
console.log(traingleArea(10, 20));

const circleArea = (r) => {
  const PI = Math.PI;
  return new Promise((resolve, reject) => {
    if (r < 0) {
      reject("Do not exist negative areas");
    }
    resolve(PI * r ** 2);
  });
};
console.log(circleArea(20));

const areTrapecio = (B, b, h) => {
  return new Promise((resolve, reject) => {
    if (B <= 0 || b <= 0 || h <= 0) {
      reject("Do not exist negative areas ");
    } else {
      resolve(((B + b) / 2) * h);
    }
  });
};
console.log(areTrapecio(10, 10, 4));

const calculosDeArea = async () => {
  try {
    const squareCalculation = await squareArea(2, 5);
    console.log(squareCalculation);

    const triangleCalculation = await traingleArea(2, 6);
    console.log(triangleCalculation);
  } catch (error) {
    console.log(error);
  }
};

calculosDeArea();
