const express = require("express");
const displayRoutes = require("express-routemap");
const path = require("path");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");

const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");
const viewsRouter = require("./routes/views.routes");

const ProductManager = require("./ProductsManager");
const productManager = new ProductManager("src/db/products.json")
const PORT = 8_080;
const BASE_API_PREFIX = "api";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(`/${BASE_API_PREFIX}/products`, productsRouter);
app.use(`/${BASE_API_PREFIX}/carts`, cartsRouter);
app.use(`/${BASE_API_PREFIX}/views`, viewsRouter);

const httpServer = app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API running on port ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("New client has connected");

  const products = await productManager.getProducts()

  socket.emit("products", products)

  socket.on("addProduct", async product => await productManager.addProduct(product))

  socket.on("deleteProduct", async id => await productManager.deleteProduct(id))
  
});
