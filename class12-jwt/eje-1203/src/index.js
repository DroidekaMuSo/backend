const express = require("express");
const displayRoutes = require("express-routemap");
const path = require("path");

const pertRoutes = require("./routes/pets.routes");

const { PORT } = require("./utils/variables");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/pets", pertRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
});
