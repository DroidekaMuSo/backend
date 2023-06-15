const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const viewsRouter = require("./routes/views.routes");
const studentsRouter = require("./routes/students.routes");

const { MONGO_URL, PORT = 5_000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use("/views", viewsRouter);
app.use("/students", studentsRouter);

app.listen(PORT, async () => {
  try {
    console.log(`Server raised and running on port ${PORT}`);
    displayRoutes(app);

    await mongoose.connect(MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("🚀 ~ file: app.js:22 ~ app.listen ~ error:", error);
  }
});
