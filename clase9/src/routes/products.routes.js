const router = require("express").Router();
const ProductManager = require("../dao/productManager.mongo");

const productManager = new ProductManager();

//getProducts
router.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const products = await productManager.getProduct();

    if (limit) {
      return res
        .status(200)
        .render("products", { products: products.slice(0, limit) });
    }

    res.status(200).render("products", { products });
  } catch (error) {
    console.log("🚀 ~ file: products.routes.js:9 ~ router.get ~ error:", error);
  }
});

//getProductById
router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await productManager.getProductById(id);

    if (!product) {
      return res.status(404).render("home", { message: "Product not found" });
    }

    return res.status(200).render("product", { product });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:29 ~ router.get ~ error:",
      error
    );
  }
});

//addProduct
router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ message: "All are required" });
    }

    const addProduct = await productManager.addProduct(req.body);

    return res.status(200).json({ message: "Product added", addProduct });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:47 ~ router.post ~ error:",
      error
    );
  }
});

//updateProduct
router.put("/:id", async (req, res) => {
  try {
    const pid = req.params.id;

    const updateProduct = await productManager.updateProduct(pid, req.body);

    return res.status(200).json({ message: "Product updated", updateProduct });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:66 ~ router.put ~ error:",
      error
    );
  }
});

//deleteProduct
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const deleteProduct = await productManager.deleteProduct(pid);

    return res.status(200).json({ message: "Product deleted", deleteProduct });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:83 ~ router.delete ~ error:",
      error
    );
  }
});

module.exports = router;
