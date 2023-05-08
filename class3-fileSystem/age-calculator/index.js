const moment = require("moment");


const birthDay = moment("1998-06-16");
const today = moment(); 

const age = today.diff(birthDay,"years");
console.log("🚀 ~ file: index.js:8 ~ age:", age)

const days = today.diff(birthDay, "days");
console.log("🚀 ~ file: index.js:10 ~ days:", days)


