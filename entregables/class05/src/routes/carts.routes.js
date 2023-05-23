const router = require("express").Router();
const CartManager = require("../CartManager");

const cartManager = new CartManager("src/db/carts.json");

router.post("/", async (req, res) => {
  try {
    const carts = await cartManager.createCart();

    return res.json({
      message: "Cart created",
      carts,
    });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:6 ~ router.post ~ error:", error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const carts = await cartManager.getCarts();

    if (cid < 0 || cid > carts.length) return "ID out of range";

    const cart = await cartManager.getCart(cid);

    return res.json({ message: "Cart found", products: cart });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:14 ~ router.get ~ error:", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    return res.json(carts);
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:21 ~ router.get ~ error:", error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);

    await cartManager.addProductToCart(pid, cid);

    const cart = await cartManager.getCart(cid);

    return res.json({ message: "Cart updated", cart });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:20 ~ router.post ~ error:", error);
  }
});

module.exports = router;
