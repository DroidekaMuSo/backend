const socket = io();

const btnForm = document.getElementById("btn__form");
const form = document.getElementById("add__product");

form.addEventListener(
    "click",
    (e) => e.target.matches(".btn-del") && deleteProduct(e)
  );
  
  btnForm.addEventListener("click", newProduct(e))

const newProduct = (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const product = {
    title: data.get("title"),
    description: data.get("description"),
    category: data.get("category"),
    price: data.get("price"),
    code: data.get("code"),
    stock: data.get("stock"),
  };
  console.log("Hi")
  socket.emit("addProduct", product);
  form.reset();
};

const deleteProduct = async (e) => socket.emit("deleteProduct", e.target.id);

socket.on("products", (products) => {
  const productsContainer = document.getElementById("products__container");

  productsContainer.innerHTML += "";

  for (const product of products) {
    productsContainer.innerHTML += `
        <div>
            <h2>${product.title}</h2>
            <p><b>Description:</b> ${prod.description}</p>
            <p><b>Category:</b> ${product.category}</p>
            <p><b>Price: $</b>${product.price}</p>
            <p><b>Code:</b> ${product.code}</p>
            <p><b>Stock:</b> ${product.stock}</p>
            <button id=${product.id} class='btn-del'>Delete</button>
        </div>
        `;
  }
});


