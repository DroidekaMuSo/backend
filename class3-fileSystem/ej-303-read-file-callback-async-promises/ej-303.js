const fs = require("fs");

const structureArqPromises = new Promise((resolve, reject) => {
  const content = "Hi, I'm using promises to create a file with Node";

  fs.writeFile("file_written_with_promises.txt", content, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

structureArqPromises
  .then(() => {
    console.log(`Writting files using a promise`);
  })
  .catch((err) => {
    console.log("🚀 ~ file: ej-303.js:19 ~ err:", err);
  });

const asyncFunction = async () => {
  try {
    await structureArqPromises;
  } catch (error) {
    console.log("🚀 ~ file: ej-303.js:28 ~ asyncFunction ~ error:", error);
  }
};

asyncFunction();
