const bcrypt = require("bcrypt");

const createHashValue = async (value) => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hashSync(value, salt);
};

const isValidPassword = async (password, encryptedPassword) => {
  const validValue = await bcrypt.compareSync(password, encryptedPassword);

  return validValue;
};

module.exports = {
  createHashValue,
  isValidPassword,
};
