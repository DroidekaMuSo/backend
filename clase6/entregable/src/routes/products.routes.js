const router = require("express").Router();
const ProductManager = require("../productManager");

const productManager = new ProductManager("./db/products.json");

router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);
  const products = await productManager.getProducts();
  //Filtering the products
  const filteredProducts = products.slice(0, limit);

  //if the limit exist, return just the inidicated values
  if (limit) return res.status(200).json(filteredProducts);
  //if not, return all the products
  res.status(200).render("home", { products });
});

router.post("/", async (res, req) => {
  const { title, description, price, stock, category } = req.body;

  if (!title || !description || !price || !stock || !category) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  await productManager.addProduct(req.body);
  return res.status(200).json({ message: "Product added!" });
});

router.put("/:pid", async (req, res) => {
  const data = req.body;
  const id = Number(req.params.pid);
  await productManager.updateProduct(id, data);
  res.status(200).json({ message: "Product Updated" });
});

router.delete("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  await productManager.deleteProduct(id);
  res.status(200).json({ message: "Product deleted" });
});

module.exports = router;
