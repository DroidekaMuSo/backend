const bcrypt = require("bcrypt");

const createHashValue = async (val) => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hashSync(val, salt);
};

const isValidPassword = async (password, hashedPassword) => {
  const validPassword = await bcrypt.compareSync(password, hashedPassword);

  return validPassword;
};

module.exports = {
  createHashValue,
  isValidPassword,
};
