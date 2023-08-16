const router = require("express").Router();

const authMdw = require("../middleware/auth.middleware");

router.get("/login", async (req, res) => {
  try {
    res.render("login", {
      title: "Log in",
    });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:6 ~ router.get ~ error:", error);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("register", { title: "Register" });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:16 ~ router.get ~ error:", error);
  }
});

router.get("/recover", async (req, res) => {
  try {
    res.render("recover", { title: "Recover password" });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:24 ~ router.get ~ error:", error);
  }
});

router.get("/profile", authMdw, async (req, res) => {
  try {
    const user = req.session.user;

    res.render("profile", {
      user,
      cart: {
        cartId: "cart1",
        products: [{ productId: "1", name: "T-shirt" }],
      },
    });
  } catch (error) {
    console.log("🚀 ~ file: views.routes.js:32 ~ router.get ~ error:", error);
  }
});

module.exports = router;
