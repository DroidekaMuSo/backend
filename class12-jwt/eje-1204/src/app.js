const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const path = require("path");

const { MONGO_URL, PORT } = require("./constants/constants");
const initializePassport = require("./config/passport.config");

const sessionRoutes = require("./routes/session.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 3600,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());

app.use("/api/session/", sessionRoutes);
app.use("/api/users/", userRoutes);

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
