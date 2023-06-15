const express = require("express");
const displayRoutes = require("express-routemap");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRouter = require("./routes/students.router");

const { MONGO_URL, PORT = 5_000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/students", studentRouter);

const dataBase = async () => {
  await mongoose.connect(MONGO_URL);
  console.log("Database connected");
};

app.listen(PORT, async () => {
  console.log(`Server raised and running on port ${PORT} `);
  await dataBase();
  displayRoutes(app);
});
