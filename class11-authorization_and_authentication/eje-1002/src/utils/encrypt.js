const bcrypt = require("bcrypt");

const createHashValue = async (val) => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hashSync(val, salt);
};

const isValidPassword = async (password, encryptedPasswrod) => {
  const validValue = await bcrypt.compareSync(password, encryptedPasswrod);

  return validValue;
};

module.exports = { createHashValue, isValidPassword };
