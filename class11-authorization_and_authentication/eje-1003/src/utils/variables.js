require("dotenv").config();

const { PORT, DB_HOST, DB_PORT, DB_NAME, SECRET_JWT } = process.env;

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = { MONGO_URL, PORT, SECRET_JWT };
