const express = require("express");
const displayRoutes = require("express-routemap");

const ProductManager = require("./ProductManager");
const productManager = new ProductManager("./db.json");

const PORT = 5_000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;

    const products = await productManager.getProducts();

    if (limit) {
      const newList = products.slice(0, Number(limit));

      return res.json({
        newList,
      });
    }

    return res.json({ products });
  } catch (error) {
    console.log("🚀 ~ file: app.js:17 ~ app.use ~ error:", error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const products = await productManager.getProducts();

    if (Number(pid) < 0 || Number(pid) > products.length) {
      return res.json({
        message: "Out of range",
      });
    }

    const product = await productManager.getProductById(Number(pid));

    return res.json({
      product,
    });
  } catch (error) {
    console.log("🚀 ~ file: app.js:38 ~ app.get ~ error:", error);
  }
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API running on port ${PORT}`);
});
