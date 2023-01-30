const fs = require("fs");
const path = require("path");

//Read synchronous file

try {
  const filePath = path.join(__dirname, "prueba2.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  console.log(fileContent);
} catch (error) {
  console.log(error);
}
