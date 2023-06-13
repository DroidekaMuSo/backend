const router = require("express").Router();

const CartManager = require("../dao/controllers/mongo/carts.manager.mongo");
const ProductManager = require("../dao/controllers/mongo/products.manager.mongo");

const cartManager = new CartManager();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();

    return res.status(200).json({
      message: "Carts",
      carts,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: carts.routes.mongo.js:8 ~ router.get ~ error:",
      error
    );
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();

    return res.status(200).json({
      message: "Cart created",
      cart,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: carts.routes.mongo.js:27 ~ router.post ~ error:",
      error
    );
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartManager.getCartById(cid);
    console.log(
      "🚀 ~ file: carts.routes.mongo.js:44 ~ router.get ~ cart:",
      cart
    );

    if (!cart) {
      return res
        .status(400)
        .json({ message: `Cart with id: ${cid} not found` });
    }

    return res.status(200).render("cart", {
      products: cart.products,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: carts.routes.mongo.js:43 ~ router.get ~ error:",
      error
    );
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartManager.addProductToCart(pid, cid);

    if (!cart) {
      return res.status(400).json({
        message: "Neither product or cart was found",
        cartId: await cartManager.getCartById(cid).products,
        productId: await productManager.getProductById(pid).title,
      });
    }

    return res.status(200).json({
      message: "Product added to the cart",
      cart: cart.products,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: carts.routes.mongo.js:66 ~ router.post ~ error:",
      error
    );
  }
});
module.exports = router;
