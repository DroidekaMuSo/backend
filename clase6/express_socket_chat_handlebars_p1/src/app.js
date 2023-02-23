const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const path = require("path");
const viewsRoute = require("./routes/views.routes");

const PORT = 5000;
const app = express();

//Handlebars settings

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("views engine", "handlebars");

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRoute);

const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
const io = new Server(server);

const messages = [];

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("message", (data) => {
    console.log(data);
    messages.push(data);

    console.log(messages);
    io.emit("messagesLogs", messages);
  });

  socket.on("authenticated", (data) => {
    console.log(data);
    socket.broadcast.emit("newUserConnected", data);
  });
});
