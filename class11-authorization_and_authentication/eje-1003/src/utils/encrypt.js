const bcrypt = require("bcrypt");

const createHashValue = async (val) => {
  const salt = await bcrypt.genSalt();
  console.log("🚀 ~ file: encrypt.js:5 ~ createHashValue ~ salt:", salt);

  return await bcrypt.hashSync(val, salt);
};

const isValidPassword = async (password, encryptedPassword) => {
  const validValue = await bcrypt.compareSync(password, encryptedPassword);

  return validValue;
};

module.exports = {
  createHashValue,
  isValidPassword,
};
