const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const displayRoutes = require("express-routemap");
const passport = require("passport");

const { MONGO_URL, PORT, API_BASE_PATH } = require("./constants/constants");
const initializePassport = require("./config/passport.config");

const notesRoutes = require("./routes/notes.routes");
const sessionRoutes = require("./routes/session.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.use(`${API_BASE_PATH}/session/`, sessionRoutes);
app.use(`${API_BASE_PATH}/users/`, userRoutes);
app.use(`${API_BASE_PATH}/notes/`, notesRoutes);

mongoose
  .connect(MONGO_URL)
  .then((con) => {
    console.log("Connected!!");
  })
  .then((con) => {
    app.listen(PORT, () => {
      displayRoutes(app);
    });
  })
  .catch((err) => {
    console.log(err);
  });
