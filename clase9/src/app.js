//Dependecies
const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");

//routes
const productsRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/carts.routes");
const chatRoutes = require("./routes/chat.routes");
const productModel = require("./dao/models/product.model");

require("dotenv").config();
const { DB_USER, DB_PASS } = process.env;

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
const socketServer = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/messages", chatRoutes);
app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));


socketServer.on('connection', async socket => {
	console.log('Nuevo cliente conectado');
	const products = await productModel.find({});
	socket.emit('products', products);
	socket.on('addProd', async prod => await productManager.addProduct(prod));
	socket.on('delProd', async id => await productManager.deleteProduct(id));
});

mongoose.connect("mongodb://localhost:27017/entregableClase9");
