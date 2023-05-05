class Person {
  static specie = "Human";

  constructor(name) {
    this.name = name;
  }
}

console.log("🚀 ~ file: ej-104.js:1 ~ Person:", Person.specie);

const instancePerson = new Person("Diego");
console.log(
  "🚀 ~ file: ej-104.js:12 ~ instancePerson:",
  instancePerson,
  typeof instancePerson,
  instancePerson.name
);

const instancePerson2 = new Person("Sandra");
console.log("🚀 ~ file: ej-104.js:20 ~ instancePerson2:", instancePerson2);
console.log("🚀 ~ file: ej-104.js:20 ~ instancePerson2:", instancePerson2.name);
