const express = require("express");

const routerProducts = require("./src/routes/products.router");
const routerCart = require("./src/routes/carts.router");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hi",
  });
});
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
