const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const path = require("path");

const viewsRoute = require("./routes/views.routes");

//Express settings
const PORT = 8080;
const app = express();

//Handlebars settings
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

app.use(express.static(`$${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRoute);

const server = app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
const io = new Server(server);

const logs = [];

io.on("connection", (socket) => {
  console.log("A new client is connected");

  socket.on("messageByCharacter", (data) => {
    console.log(data);
    io.emit("log", data);
  });

  socket.emit("message", "Comunicacion 1:1 por el canal message")

  socket.broadcast.emit(
    "messageForEveryone",
    "ESTE MENSAJE SE HACE EN BROADCAST PARA TODOS EXCEPTO AL SOCKET QUE RECIBE"
  );

  io.emit("messageAll",'Greetings from the BackEnd')
});
