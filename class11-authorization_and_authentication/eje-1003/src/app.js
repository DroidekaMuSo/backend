const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const mongoStore = require("connect-mongo");
const path = require("path");

const viewsRoutes = require("./routes/views.routes");
const sessionRoutes = require("./routes/session.routes");

const { MONGO_URL, PORT } = require("./utils/variables");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/pulic")));
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

app.use("/", viewsRoutes);
app.use("/api/session/", sessionRoutes);

mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log(`Connected to Mongo`);

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
      displayRoutes(app);
    });
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:43 ~ err:", err);
  });
