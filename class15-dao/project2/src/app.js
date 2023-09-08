const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const displayRoutes = require("express-routemap");

const userRoutes = require("./routes/user.routes");

const { MONGO_URL, PORT } = require("./utils/constants");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users/", userRoutes);

mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log(`Data base connected!!`);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
      displayRoutes(app);
    });
  })
  .catch((err) => {
    console.log(err);
  });
