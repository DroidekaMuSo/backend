const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const initializePassport = require("./config/passport.config");
const path = require("path");
require("dotenv").config();

const viewsRoutes = require("./routes/views.routes");
const sessionRoutes = require("./routes/session.routes");

const { PORT, DB_HOST, DB_PORT, DB_NAME } = process.env;
const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use("/", viewsRoutes);
app.use("/api/session", sessionRoutes);

mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:43 ~ conn:", conn);

    app.listen(PORT, () => {
      displayRoutes(app), console.log(`API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:46 ~ err:", err);
  });
