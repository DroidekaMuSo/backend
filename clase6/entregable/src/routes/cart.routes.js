const router = require("express").Router();
const CartManager = require("../cartManager");

const cartManager = new CartManager("src/db/carts.json");

router.post("/", async (req, res) => {
  await cartManager.addCart();
  res.status(200).json({ message: "Cart added" });
});

router.get("/", async (req, res) => {
  const products = await cartManager.getCarts();
  res.status(200).json({ products });
});

router.get("/:cid", async (req, res) => {
  const cid = Number(req.params.cid);
  const products = await cartManager.getCartById(cid);

  if (!products) {
    return res.status(404).json("Cart not found");
  }

  res.status(200).json({ products });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = Number(req.params.cid),
    pid = Number(req.params.pid);

  await cartManager.addProductToCart(cid, pid);
  res.status(200).json({ message: "Product added" });
});

module.exports = router;
