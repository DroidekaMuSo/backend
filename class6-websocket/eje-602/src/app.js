const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const path = require("path");

const viewsRouter = require("./routes/views.router");

const PORT = 5_000;
const app = express();
const logs = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  displayRoutes(app);
  console.log("HTTP server raised");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected");

  //Channel 1
  socket.on("messageByCharacter", (data) => {
    console.log("🚀 ~ file: app.js:34 ~ socket.on ~ data:", data);
    io.emit("log", data);
  });

  //Channel 2
  socket.on("messageBySocket", (data) => {
    console.log("🚀 ~ file: app.js:40 ~ socket.on ~ data:", data);

    logs.push({ socketId: `${socket.id}-`, message: data });

    io.emit("log", { logs });
  });

  //Channel 3
  socket.broadcast.emit(
    "messageForEverybody",
    "Message for everybody, except the owner"
  );

  //Channel 4
  io.emit("messageAll", "Greetings from the backEnd")
});
