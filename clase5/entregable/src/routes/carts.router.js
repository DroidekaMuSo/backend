const router = require("express").Router();
const CartManager = require("../cartManager");

const cartManager = new CartManager("./src//db/carts.json");

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  return await res.status(200).json({ carts });
});

router.post("/", async (req, res) => {
  await cartManager.addCart();
  res.status(200).json({
    message: "Cart added successfully",
  });
});

router.get("/:cid", async (req, res) => {
  const id = Number(req.params.cid);
  const products = await cartManager.getProductsByCartId(id);

  if (!products) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  res.status(200).json({ products });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = Number(req.params.cid);
  const productId = Number(req.params.pid);

  await cartManager.addPoductToCart(cartId, productId);

  res.status(200).json({
    message: "Product added successfully",
  });
});

module.exports = router;
