//Dependecies
const express = require("express"),
  mongoose = require("mongoose"),
  studentsRoute = require("./routes/students.routes");

//Server settings
const PORT = 5000,
  DB_HOST = "localhost",
  DB_PORT = "27017",
  DB_NAME = "mongoStudentDB";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then((conn) => {
    console.log("Connectado");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/students", studentsRoute);

app.listen(PORT, () => {
  `Running on port ${PORT}`;
});
