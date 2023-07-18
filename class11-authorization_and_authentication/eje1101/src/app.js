//Packages
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const mongoStore = require("connect-mongo");
const path = require("path");
require("dotenv").config();

//Routers
const viewRoutes = require("./routes/views.routes");
const sessionRoutes = require("./routes/session.routes");

//Variables
const { PORT, MONGO_URL } = process.env;

const app = express();
//Settings
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
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

//Routes
app.use("/", viewRoutes);
app.use("/api/session", sessionRoutes);

//Connections
mongoose
  .connect(MONGO_URL)
  .then((con) => {
    console.log("Mongo connected");
    app.listen(PORT, () => {
      displayRoutes(app);
      console.log(`API running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
