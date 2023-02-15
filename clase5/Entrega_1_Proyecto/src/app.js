const express = require("express");

const routerProducts = require("");
const routerCarts = require("");

const app = express();
const PORT = 8080;
const PORTJOKE = Math.floor(Math.random() * 65_535);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.listen(PORT, () => {
  `Running on port ${PORT}`;
});
