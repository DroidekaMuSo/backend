const router = require("express").Router();
const ProductManager = require("../../dao/controllers/fs/product.manager");

const productManager = new ProductManager("src/db/products.json");

router.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    return res.render("realTimeProducts", {
      title: "Real Time Products",
      style: "realTimeProducts.css",
      products,
    });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:7 ~ router.get ~ error:", error);
  }
});

module.exports = router;
