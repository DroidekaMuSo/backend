const router = require("express").Router();
const ProductManager = require("../dao/mongo/productManager");

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const products = await productManager.getProducts();

    if (limit) {
      return res.status(200).json({
        message: "Products",
        products: products.slice(0, limit),
      });
    }

    res.status(200).render("products", { products });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:10 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).render("products", { product });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:31 ~ router.get ~ error:",
      error
    );
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(200).json({
        message: "Product not found",
      });
    }

    const createProduct = await productManager.addProduct(req.body);

    return res.status(200).json({
      message: "Product added",
      createProduct,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:51 ~ router.post ~ error:",
      error
    );
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const checkId = await productManager.getProductById(pid);
    if (!pid) {
      return res.status(404).json({
        message: "ID not found",
      });
    }

    const updateProduct = await productManager.updateProduct(pid, req.body);
    return res.status(200).json({
      message: "Product updated",
      updateProduct,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:75 ~ router.put ~ error:",
      error
    );
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const checkId = await productManager.getProductById(pid);

  if (!checkId) {
    return res.status(404).json({
      message: "Id not found",
    });
  }
  const deleteProduct = await productManager.deleteProduct(pid);

  return res.status(200).json({
    message: "Product deleted",
    deleteProduct,
  });
});

module.exports = router;
