const fs = require("fs");
const path = require("path");
const util = require("util");

//TODO:     If there are problems with process.cwd, use the path module and __dirname of NodeJs

//Reading the file, using a promise & printing its content
//Creating a promsise, using promise due works better for versions higher than 8v
const readFile = util.promisify(fs.readFile);
readFile(__dirname + "/test.js", "utf-8")
  .then((text) => {
    console.log(text);
  })
  .catch((err) => {
    console.log(err);
  });

//TODO: Changing from callback to promise based
const readDir = util.promisify(fs.readdir);

const readFiles = async (path) => {
  try {
    const files = await readDir(path);
    console.log(files);
    console.log(process.cwd());
  } catch (error) {
    console.log(error);
  }
};

readFiles(process.cwd()).catch((err) => {
  console.log(err);
});
