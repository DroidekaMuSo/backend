const squareArea = (b, h) => {
  return new Promise((resolve, reject) => {
    if (b < 0) {
      reject("Cannot exist negatives areas");
    } else if (h < 0) {
      reject("Cannot exist negative areas");
    } else {
      resolve(b * h);
    }
  });
};

const traingleArea = (b, h) => {
  return new Promise((resolve, reject) => {
    if (b < 0) {
      reject("Cannot exist negative areas");
    } else if (h < 0) {
      reject("Cannot exist negative areas");
    } else {
      const result = (b * h) / 2;
      resolve(result);
    }
  });
};

const circleArea = (r) => {
  return new Promise((resolve, reject) => {
    const PI = Math.PI;

    if (r < 0) {
      reject("Cannot exist negative areas");
    }
    resolve(2 * PI * r ** 2);
  });
};

const trapezoidArea = (B, b, h) => {
  return new Promise((resolve, reject) => {
    if (B < 0 || b < 0 || h < 0) {
      reject("Cannot exist negative areas");
    }

    const result = ((B * b) / 2) * h;
    resolve(result);
  });
};

const areaOperations = async () => {
  try {
    const square = await squareArea(2, 5);
    console.log("🚀 ~ file: ej-205.js:51 ~ areaOperations ~ square:", square);

    const triangle = await traingleArea(2, 6);
    console.log(
      "🚀 ~ file: ej-205.js:54 ~ areaOperations ~ triangle:",
      triangle
    );

    const circle = await circleArea(4);
    console.log("🚀 ~ file: ej-205.js:57 ~ areaOperations ~ circle:", circle);

    const trapezoid = await trapezoidArea(10, 5, 30);
    console.log(
      "🚀 ~ file: ej-205.js:60 ~ areaOperations ~ trapezoid:",
      trapezoid
    );
  } catch (error) {
    console.log("🚀 ~ file: ej-205.js:52 ~ areaOperations ~ error:", error);
  }
};

areaOperations();
