const authMiddleware = require("../middleware/auth.middleware");
const router = require("express").Router();

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:7 ~ router.get ~ error:", error);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:14 ~ router.get ~ error:", error);
  }
});

router.get("/recover", async (req, res) => {
  try {
    res.render("recover");
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:22 ~ router.get ~ error:", error);
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = req.session.user;
    console.log(user);

    res.render("profile", {
      user,
      cart: {
        cartId: "Cart1",
        products: [{ productId: "1", name: "T-shirt" }],
      },
    });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:30 ~ router.get ~ error:", error);
  }
});

module.exports = router;
