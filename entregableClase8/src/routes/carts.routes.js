const router = require("express").Router();
const CartManager = require("../dao/mongo/cartManager");

const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    return res.status(200).json({
      message: "Carts",
      carts,
    });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:10 ~ router.get ~ error:", error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    return res.status(200).render("cart", { cart });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:22 ~ router.get ~ error:", error);
  }
});

router.post("/", async (req, res) => {
  try {
    const createCart = await cartManager.addCart();

    return res.status(200).json({
      message: "Cart created",
      createCart,
    });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:40 ~ router.post ~ error:", error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const addProductToCart = await cartManager.addProductToCart(pid, cid);

    return res.status(200).json({
      message: `Product added to cart`,
      pid,
      cid,
    });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:53 ~ router.post ~ error:", error);
  }
});

module.exports = router;
