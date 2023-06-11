const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config();

const cartsRouter = require("./routes/carts.routes");

const { MONGO_URL, PORT = 5_000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use("/carts", cartsRouter);

mongoose
  .connect(MONGO_URL)
  .then((con) => {
    console.log(`Data base connected`);
    const httpServer = app.listen(PORT, () => {
      displayRoutes(app);
      console.log(
        `HTTP server has been raised and it's running on port ${PORT}`
      );
    });

    const io = new Server(httpServer);
    io.on("connection", (socket) => {
      console.log("New client connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
