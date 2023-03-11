//Dependecies
const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const PORT = 9090;

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
const socketServer = new Server(httpServer);

//Settings of dependecies

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

//Uses
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/api/messages", routerMessages);

console.log(first)

//Initialize socket
socketServer.on("connection", async (socket) => {
  console.log("New client connected");
});

mongoose.connect("mongodb://localhost:27017/entregableClase8");
