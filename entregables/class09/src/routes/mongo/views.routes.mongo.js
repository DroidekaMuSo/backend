const router = require("express").Router();
const ProductManager = require("../../dao/controllers/mongo/products.manager.mongo");

const productManager = new ProductManager();

router.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    return res.render("realTimeProducts", {
      title: "Real Time Products",
      style: "realTimeProducts.css",
      products,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: views.routes.mongo.js:16 ~ router.get ~ error:",
      error
    );
  }
});

module.exports = router;
