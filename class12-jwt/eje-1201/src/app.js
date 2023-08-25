const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const mongoStore = require("connect-mongo");
const path = require("path");

const { MONGO_URL, PORT } = require("./utils/variables");

const sessionRouter = require("./routes/session.routes");

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
      ttl: 60 * 60 * 1000,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/session/", sessionRouter);

mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:33 ~ Connected!");

    app.listen(PORT, () => {
      displayRoutes(app);
      console.log(`API running on port ${PORT}`);
    });
  })

  .catch((err) => {
    console.log("🚀 ~ file: app.js:37 ~ err:", err);
  });
