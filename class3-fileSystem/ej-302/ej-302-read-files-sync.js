const fs = require("fs");
const path = require("path");

try {
  const fileRoute = path.join(__dirname, "test2.txt");
  const fileContent = fs.readFileSync(fileRoute, "utf-8");
  console.log(
    "🚀 ~ file: ej-301-read-files-sync.js:10 ~ fileContent:",
    fileContent
  );
} catch (error) {
  console.log("🚀 ~ file: ej-301-read-files-sync.js:10 ~ error:", error);
}
