class Counter {
  static instancesCounter = 0;

  constructor(name) {
    this.name = name;
    this.value = 0;
    Counter.instancesCounter++;
  }

  getCounter = () => {
    return this.value;
  };

  setCounter(value) {
    this.value = value;
  }

  getResponsable() {
    return this.name;
  }

  getIndividualCount() {
    return this.value;
  }

  getGlobalCount() {
    return this.instancesCounter;
  }
}

console.log("🚀 ~ file: ej-105.js:2 ~ Counter:", Counter.instancesCounter);

//TODO: First counter
const firstCounter = new Counter("Diego");
console.log(
  "🚀 ~ file: ej-105.js:34 ~ firstCounter:",
  `The ${firstCounter.getResponsable()}'s counter is ${firstCounter.getCounter()}`
);

firstCounter.setCounter(200);
console.log("🚀 ~ file: ej-105.js:40 ~ firstCounter:", firstCounter);

//TODO: Second counter
const secondCounter = new Counter("Rabin");
console.log(
  "🚀 ~ file: ej-105.js:45 ~ secondCounter:",
  `The ${secondCounter.getResponsable()}'s counter is ${secondCounter.getCounter()}`
);

const thirdCounter = new Counter("Sandra");
const fourthCounter = new Counter("Gabriel");

console.log(Counter.instancesCounter);
