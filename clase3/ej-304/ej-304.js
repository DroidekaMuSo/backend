const fs = require("fs");

//Asynchronusly reading file with callbacks
//TODO: Reminder. process.cwd may generate problems, since it is associate to the path or the terminal

fs.readFile(
  `${process.cwd()}/clase3/ej-304/prueba.txt`,
  "utf-8",
  (error, content) => {
    if (error) {
      console.log(error);
    }
    console.log(content);
  }
);

//TODO: Asynchronusly creating a directory using callbacks
fs.writeFile(
  `${process.cwd()}/clase3/ej-304/prueba.txt`,
  `Writing a file using callbaks in NodeJs on ${
    new Date().toLocaleString()
  } in MM//DD/YY format`,
  (error) => {
    if (error) {
      console.log(error);
    }
  }
);
