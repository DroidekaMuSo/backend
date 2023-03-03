const express = require("express"),
  mongoose = require("mongoose"),
  displayRoutes = require("express-routemap");

const PORT = 5000,
  DB_HOST = "localhost",
  DB_PORT = "27017",
  DB_NAME = "baseCRUD";

console.log("🚀 ~ file: app.js:6 ~ PORT:", PORT);
console.log("🚀 ~ file: app.js:8 ~ DB_HOST:", DB_HOST);
console.log("🚀 ~ file: app.js:10 ~ DB_PORT:", DB_PORT);
console.log("🚀 ~ file: app.js:12 ~ DB_NAME:", DB_NAME);
console.log(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:18 ~ conn:", conn);
    return;
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:21 ~ err:", err);
  });

app.use("/", (req, res) => {
  res.json({ message: "OK" });
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Running on port ${PORT}`);
});
