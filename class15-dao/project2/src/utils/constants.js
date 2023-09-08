require("dotenv").config();

const { MONGO_URL, PORT } = process.env;

module.exports = { MONGO_URL, PORT };
