const router = require("express").Router();
const ProductManager = require("../productManager");

const productManager = new ProductManager("/src/db/products.json");

router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);
  const products = await productManager.getProducts();

  if (limit) return res.status(200).json(products.slice(0, limit));
  res.status(200).json(products);
});

router.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const product = await productManager.getProductsById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json(product);
});

router.post("/", async (req, res) => {
  const { title, description, code, stock, category } = req.body;

  if (!title || !description || !code || !stock || !category) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }

  await productManager.createProduct(req.body);
  res.status(200).json({
    message: "Product added succesfully",
  });
});

router.put("/:pid", async (req, res) => {
  await productManager.updateProduct(Number(req.params.pid), req.body);
  res.status(200).json({
    message: "Product updated successfully",
  });
});

router.delete("/:pid", async (req, res) => {
  await productManager.deleteProduct(Number(req.params.pid));
  res.status(200).json({
    message: "Product deleted successfully",
  });
});

module.exports = router;
