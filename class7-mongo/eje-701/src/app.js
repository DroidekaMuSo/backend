//*Imports
const express = require("express");
const displayRoutes = require("express-routemap");
const mongoose = require("mongoose");
require("dotenv").config();

//*Routers
const studentsRouter = require("./routes/students.router");

//*Constants
const PORT = 5_000;
const app = express();
const { MONGO_URL } = process.env;

//*Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(studentsRouter);

//*Connection to HTTP and mongoose
mongoose
  .connect(MONGO_URL)
  .then((con) => {
    console.log("🚀 ~ file: app.js:16 ~ con:", con);

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
      displayRoutes(app);
    });
  })
  .catch((err) => {
    console.log(err);
  });
