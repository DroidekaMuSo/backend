const express = require("express");
const displayRoutes = require("express-routemap");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRouter = require("./routes/students.routes");
const petsRouter = require("./routes/pets.routes");

const { MONGO_URL } = process.env;
const PORT = 5_000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/students", studentRouter);
app.use("/api/pets", petsRouter);

mongoose
  .connect(MONGO_URL)
  .then((con) => {
    console.log("Mongo ATLAS connected");
    displayRoutes(app);
    app.listen(PORT, () => {
      console.log(`Server raised and running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
