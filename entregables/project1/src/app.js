const express = require("express");
const displayRoutes = require("express-routemap");

const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");

const PORT = 8_080;
const BASE_API_PREFIX = "api";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/${BASE_API_PREFIX}/products`, productsRouter);
app.use(`/${BASE_API_PREFIX}/carts`, cartsRouter);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API running on port ${PORT}`);
});
