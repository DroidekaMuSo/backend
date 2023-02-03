const moment = require("moment");
const birthDay = moment("1998-06-16");
const toDay = moment();

const delta = toDay.diff(birthDay, "years");
console.log(delta);
