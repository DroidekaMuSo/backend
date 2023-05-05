class ProductManager {
  constructor(product) {
    this.products = [];
  }

  addProduct = ({
    title,
    description,
    product,
    price,
    thumbnail,
    code,
    stock,
  }) => {
    if (
      !title ||
      !description ||
      !product ||
      !price ||
      !thumbnail ||
      !code ||
      !stock
    ) {
      return `All fields are required`;
    }

    if (
      title == " " ||
      description == " " ||
      price == " " ||
      thumbnail == " " ||
      code == " " ||
      stock == " "
    ) {
      return `A field is blank`;
    }

    const checkCode = this.products.some((product) => product.code === code);
    if (checkCode) return "Code already exists";

    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;

    const productToAdd = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);

    return `Product added`;
  };

  getProducts = () => {
    return this.products;
  };

  getProductById = (id) => {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      return "Product not found";
    }

    return product;
  };
}

const productManager = new ProductManager();

const get = productManager.getProducts();
console.log("🚀 ~ file: class02.js:74 ~ get:", get);

const add = productManager.addProduct({
  title: "Test product",
  description: "Test product",
  product: "Test product",
  price: 200,
  thumbnail: "No image",
  code: "abc123",
  stock: 25,
});

const add2 = productManager.addProduct({
  title: "Test product",
  description: "Test product",
  product: "Test product",
  price: 200,
  thumbnail: "No image",
  code: "abc123",
  stock: 25,
});
console.log("🚀 ~ file: class02.js:96 ~ add2:", add2);

const getProduct = productManager.getProductById(1);
console.log("🚀 ~ file: class02.js:85 ~ getProduct:", getProduct);
