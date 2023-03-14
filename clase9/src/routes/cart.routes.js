const router = require("express").Router();
const CartManager = require("../dao/cartManager.mongo");

const cartManager = new CartManager();

//Get carts
router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    return res.status(200).json({ message: "carts", carts });
  } catch (error) {
    console.log("🚀 ~ file: cart.routes.js:10 ~ router.get ~ error:", error);
  }
});

//get Cart by id
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(id);

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).render("cart", { cart });
  } catch (error) {
    console.log("🚀 ~ file: cart.routes.js:18 ~ router.get ~ error:", error);
  }
});

//Create a cart
router.post("/", async (req, res) => {
  try {
    const addCart = await cartManager.addCart();

    return res.status(200).json({ message: "Cart added", addCart });
  } catch (error) {
    console.log("🚀 ~ file: cart.routes.js:31 ~ router.post ~ error:", error);
  }
});


//Add product to cart 
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const addProduct = await cartManager.addProductToCart(cid, pid);
    return res.status(200).json({ message: "Product added", addProduct });
  } catch (error) {
    console.log("🚀 ~ file: cart.routes.js:41 ~ router.post ~ error:", error);
  }
});
module.exports = router;
