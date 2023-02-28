//dependecies
const mongoose = require("mongoose"),
  express = require("express"),
  displayRoutes = require("express-routemap");

//Routes
const studentsRoutes = require("./routes/students.routes"),
  petsRoutes = require("./routes/pets.routes");

//Server settings
const PORT = 5000,
  DB_HOST = "localhost",
  DB_PORT = 27017,
  DB_NAME = "baseCRUD";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mongoose
  .connect(`mongodb://${DB_HOST};${DB_PORT}/${DB_NAME}`)
  .then((conn) => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/pets", petsRoutes);
app.use("/api/students", studentsRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Running on port: ${PORT}`);
});
