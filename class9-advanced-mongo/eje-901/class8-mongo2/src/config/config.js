const { config } = require("dotenv");

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

const { MONGO_URL, PORT, API_VERSION, NODE_ENV, ORIGIN } = process.env;

module.exports = {
  MONGO_URL,
  PORT,
  API_VERSION,
  NODE_ENV,
  ORIGIN
};
