const mostrarLista = (lista) => {
  if (lista && lista.length == 0) {
    return "Lista vacia";
  }

  for (let index = 0; index < lista.length; index++) {
    const element = lista[index];
    console.log(element);
  }
  return `La lista contiene ${lista.length} elementos`;
};

const lenguajes = ["C", "Javascript", "C++", "PYTHON", "JAVA"];
const lenguajesVacios = [];

console.log(mostrarLista(lenguajes));
console.log(mostrarLista(lenguajesVacios));
console.log(mostrarLista());
