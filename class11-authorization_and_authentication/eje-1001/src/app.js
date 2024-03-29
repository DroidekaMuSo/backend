const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const mongoStroe = require("connect-mongo");
const parth = require("path");
const path = require("path");
require("dotenv").config();

const sessionRoute = require("./routes/session.routes");
const viewsRoute = require("./routes/views.routes");

const { PORT, DB_HOST, DB_PORT, DB_NAME, VERSION, API_PREFFIX } = process.env;
const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: mongoStroe.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 3600,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(`/${API_PREFFIX}/${VERSION}/`, viewsRoute);
app.use(`/${API_PREFFIX}/${VERSION}/session`, sessionRoute);
mongoose
  .connect(MONGO_URL)
  .then((con) => {
    app.listen(PORT, () => {
      displayRoutes(app);
      console.log(`API running on port ${PORT}`);
    });
    console.log("🚀 ~ file: app.js:38 ~ con:", con);
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:39 ~ con:", err);
  });
