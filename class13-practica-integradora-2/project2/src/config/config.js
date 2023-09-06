const { config } = require("dotenv");

config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const { APP_NAME, NODE_ENV, PORT, API_VERSION } = process.env;

module.exports = {
  APP_NAME,
  NODE_ENV,
  PORT,
  API_VERSION,
};
