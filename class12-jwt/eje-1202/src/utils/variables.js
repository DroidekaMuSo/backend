require("dotenv").config();

const { DB_HOST, DB_PORT, DB_NAME, PORT, SECRET_JWT} = process.env;

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = { MONGO_URL, PORT, SECRET_JWT };
