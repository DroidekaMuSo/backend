const numbers = [100, 21, 43, 23, 89];
let newNumbers = numbers.map((num, index) => num ** index);

let monedas = ["USD", "COP", "EUR", "MXN", "CLP"];
if (monedas.includes("VEF")) {
  console.log("Currency registered");
} else {
  console.log("Currency not registered");
}

