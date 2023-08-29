const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const displayRoutes = require("express-session");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const path = require("path");
const { MONGO_URL, PORT } = require("./constants/constants");
const initializePassport = require("./config/passport.config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));


mongoose
  .connect(MONGO_URL)
  .then((con) => {
    console.log("Connected!");

    app.listen(PORT, () => {
      displayRoutes(app);
      console.log(`API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
