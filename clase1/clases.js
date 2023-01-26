class Contador {
  //Variables de iniciacion del objeto Contador
  static contadorInstances = 0;

  //Constructor de la clase
  constructor(nombre) {
    this.nombre = nombre;
    this.valor = 0;
    Contador.contadorInstances++;
  }

  //Metodos del objeto
  getContador = () => {
    return this.valor;
  };
  setContador(valor) {
    this.valor = valor;
  }
  getResponsable() {
    return this.nombre;
  }
  getCuentaIndividual() {
    return this.valor;
  }
  getCuentaGlobal = () => {
    return this.contadorInstances;
  };
}

//Console logs
console.log("Incio contador", Contador.contadorInstances);

//Declarando a la primera persona
const primerContador = new Contador("Rabin");
console.log(
  `El contador de ${primerContador.getResponsable()} tiene un valor de ${primerContador.getContador()}`
);
//Setteando el valor de la variable valor
primerContador.valor = 10;
console.log("PrimerContador", primerContador);
//Seteando el contador del primer variable
primerContador.setContador(200);
console.log("Asignando un valor al contador", primerContador);

console.log("********************************");

//Declarando un segundo objeto
const contador2 = new Contador("DIBU");
console.log(
  `Contador2 es ${contador2.getResponsable()} tiene un valor de ${contador2.getCuentaIndividual()}`
);
//Declarando mas objetos usando el constructor
const contador3 = new Contador("JOSE");
const contador4 = new Contador("ESTUDIANTES");

// Contador.contadorInstances = 3;
console.log("NUMEROS DE INSTANCIAS DE CONTADOR***", Contador.contadorInstances);

  