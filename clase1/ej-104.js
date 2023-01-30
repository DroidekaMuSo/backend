//Creacion de una clase sencilla
class Persona {
  static especie = "humano";

  constructor(nombre) {
    this.nombre = nombre;
  }
}

//Viendo como se comporta la clase y la variable estatica
console.log(`Probando atributo estatico, ${Persona.especie}`);

//Primera instancia de la clase
const instanciaPersona = new Persona("Dibu");
console.log(
  "PROBANDO ATRIBUTO INTERNO DE LA CLASE, ",
  instanciaPersona,
  typeof instanciaPersona,
  instanciaPersona.nombre
);

//Segunda instancia de la clase
const instanciaPersona2 = new Persona("Matias");
console.log(instanciaPersona2, instanciaPersona2.nombre);
