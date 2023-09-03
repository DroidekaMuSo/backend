const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const displayRoutes = require("express-routemap");
const passport = require("passport");
const path = require("path");

const notesRoutes = require("./routes/notes.routes");
const sessionRoutes = require("./routes/session.routes");
const userRoutes = require("./routes/user.routes");

const initializePassport = require("./config/passport.config");
const { MONGO_URL, PORT } = require("./constants/constants");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.use("/api/session/", sessionRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/notes", notesRoutes);

mongoose
  .connect(MONGO_URL)
  .then((con) => {
    console.log("🚀 ~ file: app.js:18 ~ CONNECTED!");

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
      displayRoutes(app);
    });
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:26 ~ err:", err);
  });
