class ProducManager {
  constructor() {
    this.products = [];
  }
  addProduct = ({ title, description, price, thumbnail, code, stock }) => {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return "[!] All fields are required";
    if (
      title == " " ||
      description == " " ||
      price == " " ||
      thumbnail == " " ||
      code == " " ||
      stock == " "
    )
      return "[!] All fields are required";
    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) return "[!] Code already exists";
    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;
    this.products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
  };
  getProducts = () => this.products;
  getProductById = (id) =>
    this.products.find((product) => product.id === id) || "[!] Not Found";
}

// Se creará una instancia de la clase “ProductManager
const productManager = new ProducManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts());

// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.error(productManager.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(productManager.getProductById(1));
console.error(productManager.getProductById(3));

productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc",
  stock: "",
});
