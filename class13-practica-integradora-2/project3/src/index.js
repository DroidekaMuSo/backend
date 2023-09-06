const express = require("express");
const { fork } = require("child_process");
const displayRoutes = require("express-routemap");
require("dotenv").config();

const calculosRoutes = require("./routes/calculos.routes");

const { PORT, API_BASE_PATH } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_BASE_PATH}/calculos`, calculosRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
});
