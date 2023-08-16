const bcrypt = require("bcrypt");

const createHashValue = async (val) => {
  const salt = await bcrypt.genSalt();
  
  return await bcrypt.hashSync(val, salt);
};

const isValidPassword = async (psw, encryptedPsw) => {
  const validValue = await bcrypt.compareSync(psw, encryptedPsw);

  return validValue;
};

module.exports = {
  createHashValue,
  isValidPassword,
};
