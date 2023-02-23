//Imports
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");

//Routes
const routesProducts = require("./routes/products.routes");
const routesCart = require("./routes/cart.routes");

//Classes
const ProductManager = require("./productManager");

//Raising the server
const app = express();
const PORT = 5000;

//express settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Handlebars settings
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

//Socket and http servers
const httpServer = app.listen(PORT, () =>
  console.log(`Running on port ${PORT}`)
);
const socketServer = new Server(httpServer);
const productManager = new ProductManager("./db/products.json");

app.use(express.static(__dirname + "/public"));

//Renders
app.use("/api/products", routesProducts);
app.use("/api/carts", routesCart);
app.get("/", (req, res) => {
  res.json({
    message: "Hi",
    products: "/api/products",
    carts: "/api/carts",
    realTimeProducts: "/realTimeProducst",
  });
});

//Gets
app.get("/realTimeProducst", async (req, res) => {
  res.status(200).render("realTime");
});

socketServer.on("connection", async (socket) => {
  console.log("New client connected");

  const products = await productManager.getProducts();
  socket.emit("products", products);

  socket.on("addProduct", async (prod) => productManager.addProduct(prod));

  socket.on("deleteProduct", async (id) => productManager.deleteProduct(id));
});
