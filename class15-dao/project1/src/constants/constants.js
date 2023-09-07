require("dotenv").config();

const { MONGO_URL, PORT, SECRET_JWT, API_BASE_PATH, ROLES } = process.env;

module.exports = { MONGO_URL, PORT, SECRET_JWT, API_BASE_PATH, ROLES };
