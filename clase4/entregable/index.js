const express = require("express");
const ProductManager = require("./productManager");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager("./db.json");

app.get("/", (req,res) =>{
  res.json({message:"Hi"})
})

app.get("/products", async (req, res) => {
  const limit = Number(req.query.limit);
  const products = await productManager.getProducts();

  if (limit) {
    return res.status(200).json(products.slice(0, limit));
  }

  res.status(200).json(products);
});

app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const product = await productManager.getProductsById(id);

  if (!product)
    return res.status(404).json({
      message: "[!] Product not found",
    });

  res.status(200).json(product);
});

app.listen(PORT, () => {
  console.log(`Server runnn on port ${PORT}`);
});
