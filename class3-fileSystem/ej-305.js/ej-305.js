const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
readFile("./test.js", "utf-8")
  .then((text) => {
    console.log("🚀 ~ file: ej-305.js:6 ~ readFile ~ text:", text);
  })
  .catch((err) => {
    console.log("🚀 ~ file: ej-305.js:9 ~ err:", err);
  });

//Example 2
const readDir = util.promisify(fs.readdir);

const readFiles = async (path) => {
  try {
    const files = await readDir(path);
    console.log("🚀 ~ file: ej-305.js:19 ~ readFiles ~ files:", files);
    console.log(`Directory path ==>`, process.cwd());
  } catch (error) {
    console.log("🚀 ~ file: ej-305.js:20 ~ readFiles ~ error:", error);
  }
};

readFiles(process.cwd()).catch((err) => {
  console.log(err);
});
