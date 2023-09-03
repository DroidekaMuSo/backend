require("dotenv").config();

const { PORT, MONGO_URL, SECRET_JWT } = process.env;

module.exports = { PORT, MONGO_URL, SECRET_JWT };
