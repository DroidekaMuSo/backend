const jwt = require("jsonwebtoken");
const { SECRET_JWT } = require("./variables");

const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, SECRET_JWT, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.log(err);

        reject("Cannot generate JWT token");
      }

      resolve(token);
    });
  });
};

module.exports = generateJWT;
