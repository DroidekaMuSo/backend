const express = require("express");
const userRoutes = require("./routes/user.routes");
const petsRoutes = require("./routes/pets.routes");

const PORT = 5000;

const app = express();
const BASE_PREFIX = "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(`${__dirname}/public`));

app.use(`/${BASE_PREFIX}/alive`, (req, res) => {
  res.json({ message: "Hi, you created your first API and it's running" });
});

app.use(`/${BASE_PREFIX}/users`, userRoutes);
app.use(`/${BASE_PREFIX}/pets`, petsRoutes);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
