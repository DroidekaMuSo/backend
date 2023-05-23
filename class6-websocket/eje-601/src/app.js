const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const path = require("path");

const viewsRouter = require("./routers/views.router");

const PORT = 8080;
const logs = [];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

//!HTTP server
const httpServer = app.listen(PORT, () => {
  displayRoutes(app);
  console.log("HTTP server raised");
});
const io = new Server(httpServer);

//!Raise the server, handshake connected
io.on("connection", (socket) => {
  console.log("New client connected!");

  //*Canal 1 called "messageByCharacter"
  socket.on("messageByCharacter", (data) => {
    console.log("🚀 ~ file: app.js:32 ~ socket.on ~ data:", data);
    io.emit("log", data);
  });

  //*Channel 2 called messageBySocket
  socket.on("messageBySocket", (data) => {
    logs.push({ socketId: `${socket.id}`, message: data });
    io.emit("log", { logs });
  });

  socket.broadcast.emit(
    "messageForEveryone",
    "This message is displayer for all, except the socket"
  );

  io.emit("messageAll", "Hi from the backend");
});
