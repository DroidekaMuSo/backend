class Counter {
  static instancesCounter = 0;

  constructor(name) {
    this.name = name;
    this.value = 0;
    Counter.instancesCounter += 1;
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
//Checking how starts the counter
console.log(Counter.instancesCounter);


//First instance
const firstCounter = new Counter("Diego");
console.log(
  `${firstCounter.getResponsable()}'s counter has a value of ${firstCounter.getCounter()}`
);

//Changing value of counter
firstCounter.value = 10;
console.log(firstCounter.value);

//Using method setCounter to change value
firstCounter.setCounter(200);
console.log(firstCounter.value);

//Second instance
const counter2 = new Counter("Dibu");
console.log(
  `Counter 2 is ${counter2.getResponsable()} has a value of ${counter2.getIndividualCount()}`
);

//third instance
const counter3 = new Counter("Jose");
const counter4 = new Counter("Students");

console.log("Amount of instances of counter", Counter.instancesCounter);
