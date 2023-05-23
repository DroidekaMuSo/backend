const router = require("express").Router();
const path = require("path");
const ProductManager = require("../ProductsManager");

const productManager = new ProductManager("src/db/products.json");

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const filterList = products.slice(0, limit);

      return res.render("home",filterList);
    }

    return res.render("home",{products})
  } catch (error) {
    console.log("🚀 ~ file: products.routes.js:6 ~ router.get ~ error:", error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const product = await productManager.getProductById(pid);
    return res.json(product);
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:13 ~ router.get ~ error:",
      error
    );
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.json({
        message: "All fields are required",
        fields: req.body,
      });
    }

    const product = await productManager.addProduct(req.body);

    return res.json({ product });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:21 ~ router.post ~ error:",
      error
    );
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);

    const product = await productManager.updateProduct(pid, req.body);

    if (!product) return "Product not found";
    return res.json({ message: "Product updated", product });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:28 ~ router.put ~ error:",
      error
    );
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const products = await productManager.getProducts();

    if (pid < 0 || pid > products.legth) return "Id out of range";

    const deletingProduct = await productManager.deleteProduct(pid);

    return res.json({
      message: "Product deleted",
      deletingProduct,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:35 ~ router.delete ~ error:",
      error
    );
  }
});

module.exports = router;
