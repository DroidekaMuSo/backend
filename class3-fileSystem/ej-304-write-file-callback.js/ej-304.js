const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "test.txt"), "utf-8", (err, content) => {
  if (err) {
    console.log("🚀 ~ file: ej-304.js:5 ~ fs.readFile ~ err:", err);
  }

  console.log(`Showing file content`, content);
});

fs.writeFile(
  path.join(__dirname, "test3.txt"),
  `Writting in a file using a callback in NODEJS on ${new Date().toLocaleDateString()} using the format month/day/year`,
  (err) => {
    if (err) {
      console.log("🚀 ~ file: ej-304.js:18 ~ err:", err);
    }
  }
);
