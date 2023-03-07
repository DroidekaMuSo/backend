//Dependecies
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(`${__dirname}/public/uploads/`));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({
  storage,
  onError: function (err, next) {
    console.log("🚀 ~ file: utils.js:20 ~ err:", err);
    next();
  },
});

module.exports = { uploader };
