//Inicializando la clase con nombre
class ProducManager {
  constructor() {
    //Inicializando un array vacio, donde se van a guardar todos los productos
    this.products = [];
  }

  //Iniciando el metodo para agregar el el objeto al array
  addProduct = ({ title, description, price, thumbnail, code, stock }) => {
    //Si ninguno de los parametros es falso, regresar y pedirle los campos necesarios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "All fields are required!!!";
    }
    //De lo contrario que sean verdaeros pero contengan un string vacio, volverlo a checar
    if (
      title === " " ||
      description === " " ||
      price === " " ||
      thumbnail === " " ||
      code === " " ||
      stock === " "
    ) {
      return "All fields are required!!!";
    }

    //Revisar a traves del code si el producto ya existe
    //Inicializando una variable como flag
    const codeExist = this.products.some((product) => {
      product.code === code;
    });

    // Revisando si el producto ya existe
    if (codeExist) {
      return "Code is already in the system";
    }

    //Inicializando una funcion para aumentar el id
    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;
    // Realizar el push al array
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

  //Traer las productos ya agregados al array a traves de un metodo
  getProducts = () => {
    return this.products;
  };

  //Conseguir el producto a traves de el parametro id usando un metodo
  getProductId = (id) => {
    this.products.find((product) => product.id === id) || "Id not found";
  };
}

//Se hace instancia de la clase
const productManager = new ProducManager();

//Realizar una llamada a la clase para realizar una llamada para ver el array vacio
console.log(productManager.getProducts());

//Agregado de un producto
productManager.addProduct({
  title: "Product",
  description: "Test",
  price: 200,
  thumbnail: "No Image",
  code: "abc123",
  stock: 25,
});

console.log(productManager.getProducts());

productManager.addProduct({
  title: "Product",
  description: "Test",
  price: 200,
  thumbnail: "No Image",
  code: "abc123",
  stock: 25,
});

console.log(productManager.getProducts());
