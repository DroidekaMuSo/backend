const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config();

const ProductManager = require("./dao/controllers/mongo/products.manager.mongo");
const productManager = new ProductManager();

const cartsRouterFs = require("./routes/carts.routes.fs");
const productsRouterFs = require("./routes/products.routes.fs");
const chatRouterFs = require("./routes/chat.router.fs");
const viewsRouterFs = require("./routes/views.routes.fs");

const cartRouterMongo = require("./routes/carts.routes.mongo");
const productsRouterMongo = require("./routes/products.routes.mongo");
const chatRouterMongo = require("./routes/chat.router.mongo");
const viewsRouterMongo = require("./routes/views.routes.mongo");

const { MONGO_URL, PORT = 5_000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

/*
//*Routers using file system
app.use("/fs/carts", cartsRouterFs);
app.use("/fs/products", productsRouterFs);
app.use("/fs/chat", chatRouterFs);
app.use("/fs/views", viewsRouterFs);

*/

//*Routers using mongo
app.use("/mongo/carts", cartRouterMongo);
app.use("/mongo/products", productsRouterMongo);
app.use("/mongo/chat", chatRouterMongo);
app.use("/mongo/views", viewsRouterMongo);

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

    const socketServer = new Server(httpServer);
    socketServer.on("connection", async (socket) => {
      try {
        console.log("New client connected");

        const products = await productManager.getProducts();
        socket.emit("products", products);

        socket.on(
          "addProd",
          async (prod) => await productManager.createProduct(prod)
        );

        socket.on("delProd", async (id) => {
          await productManager.deleteProduct(id);
        });
      } catch (error) {
        console.log("🚀 ~ file: app.js:64 ~ error:", error);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
