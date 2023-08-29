require("dotenv").config();

const { PORT, MONGO_URL, SECRET_JWT, ROLES } = process.env;

module.exports = { PORT, MONGO_URL, SECRET_JWT, ROLES};
