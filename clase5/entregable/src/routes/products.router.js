const {Router} = require("express");
const ProductManager = require("../productManager");

const productManager = new ProductManager("../db/products.json");

const router = Router();

router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);
  const products = await productManager.getProducts();

  if (limit) {
    return res.status(200).json(products.slice(0, limit));
  }

  return res.status(200).json(products);
});

router.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const product = await productManager.getProductById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found!",
    });
  }

  res.status(200).json(product);
});

router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }

  await productManager.createProduct(req.body);
  res.status(200).json({
    message: "Product added successfully",
  });
});

router.put("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const data = req.body;
  await productManager.updateProduct(id, data);
  res.status(200).json({
    message: "Product updated successfully",
  });
});

router.delete("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  await productManager.deleteProduct(id);
  res.status(200).json({
    message: "Product deleted succesfully",
  });
});

module.exports = router;
