const { Router } = require("express");
const CartManager = require("../cartManager");
const path = require("path");

const cartDbPath = path.join(__dirname, "../db/cart.json");

class CartRoute {
  path = "/cart";
  router = Router();
  cartManager = new CartManager(cartDbPath);

  constructor() {
    this.initCartRoute();
  }

  initCartRoute() {
    //Create a cart
    this.router.post(`${this.path}/`, async (req, res) => {
      await this.cartManager.addCart();
      return res.json({
        message: "Cart created",
      });
    });

    //Get cart by id
    this.router.get(`${this.path}/:cid`, async (req, res) => {
      const cid = Number(req.params.cid);
      const product = await this.cartManager.getCartById(cid);

      if (!product) {
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      return res.status(200).json({ message: "Cart", product });
    });

    //Get cart by Id and a product based on its id
    this.router.post(`${this.path}/:cid/product/:pid`, async (req, res) => {
      const cid = Number(req.params.cid),
        pid = Number(req.params.pid);

      await this.cartManager.addProductToCart(cid, pid);

      return res.status(200).json({
        message: `Product ${pid} added to cart ${cid}`,
      });
    });
  }
}

module.exports = CartRoute;
