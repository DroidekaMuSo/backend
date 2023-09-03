const jwt = require("jsonwebtoken");
const { SECRET_JWT } = require("../constants/constants");

const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, SECRET_JWT, { expiresIn: "30m" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("Cannot generate jwt token");
      }

      resolve(token);
    });
  });
};

module.exports = generateJWT;
