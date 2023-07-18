const bcrypt = require("bcrypt");

const createHashValue = async (val) => {
  try {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hashSync(val, salt);
  } catch (error) {
    console.log("🚀 ~ file: encrypt.js:6 ~ createHashValue ~ error:", error);
  }
};

const isValidPassword = async (password, encryptedPassword) => {
  try {
    const validValue = await bcrypt.compareSync(password, encryptedPassword);

    return validValue;
  } catch (error) {
    console.log("🚀 ~ file: encrypt.js:16 ~ isValidPassword ~ error:", error);
  }
};

module.exports = { createHashValue, isValidPassword };
