const fs = require("fs");

// Promised with file reading
const promiseSyntaxArc = new Promise((resolve, reject) => {
  const content = "Hi, I'm using promises to create a file with Node";
  fs.writeFile(`${__dirname}/file_written_with_promises.txt`, content, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

promiseSyntaxArc
  .then(() => {
    console.log("Writting files using promises");
  })
  .catch((err) => {
    console.log(err);
  });

const escrituraAsync = async () => {
  try {
    await promiseSyntaxArc;
  } catch (error) {
    console.log(error);
  }
};

escrituraAsync()