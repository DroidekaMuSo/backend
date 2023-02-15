const router = require("express").Router();
const CartManager = require("../cartManager");

const cartManager = new CartManager("src/db/carts.json");

router.post("/", async (req, res) => {
  await cartManager.addCart();
  res.status(200).json({
    message: "Cart added succesfully",
  });
});

router.get("/:cid", async (req, res) => {
  const products = await cartManager.getProductsById(Number(req.params.cid));

  if (!products) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  res.status(200).json({
    products,
  });
});

router.post(`/:cid/product/:pid`, async (req, res) => {
  await cartManager.addProductToCart(
    Number.req.params.cid,
    Number(req.params.pid)
  );
  res.status(200).json({
    message: "Product added succesfully",
  });
});


module.exports = router