const router = require("express").Router();
const ProductManager = require("../dao/controllers/mongo/products.manager.mongo");

const productManager = new ProductManager();
router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    return res.status(200).render("products", {products})
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.mongo.js:6 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (!product)
      return res.render("product", {
        title: "Error",
        message: `Product with ${pid} not found`,
      });
    console.log(product);
    // return res.json({product})
    return res.render("product", { product });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.mongo.js:24 ~ router.get ~ error:",
      error
    );
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, category } = req.body;

    if (!title || !description || !code || !price || !category) {
      return res.status(400).json({
        message: "All fields are required",
        data: { ...req.body },
      });
    }

    const product = await productManager.createProduct({ ...req.body });

    return res.status(200).json({
      message: "Product has been created",
      product,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.mongo.js:40 ~ router.post ~ error:",
      error
    );
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productManager.updateProduct(pid, { ...req.body });

    if (!product) {
      return res.status(400).json({ message: `Product with ${pid} not found` });
    }

    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.mongo.js:65 ~ router.put ~ error:",
      error
    );
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.deleteProduct(pid);

    if (!product) {
      return res
        .status(400)
        .json({ message: `Product with id ${pid} not found` });
    }

    return res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.mongo.js:84 ~ router.delete ~ error:",
      error
    );
  }
});
module.exports = router;
