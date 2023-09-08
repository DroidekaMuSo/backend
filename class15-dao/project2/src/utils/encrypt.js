const bcrypt = require("bcrypt");

const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hashSync(password, salt);
};

const comparePasswords = async (password, hashedPassword) => {
  const validatePassword = await bcrypt.compareSync(password, hashedPassword);

  return validatePassword;
};


module.exports = {
    hashedPassword,
    comparePasswords
}