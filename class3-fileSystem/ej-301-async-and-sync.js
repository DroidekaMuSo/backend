//TODO: Syync code
const NAME = "Frank";

const sayHi = (name) => {
  console.log(`Hi ${name}`);
};

const howAreYou = (name) => {
  console.log(`How are you ${name}`);
};

console.log(sayHi(NAME));
console.log(howAreYou(NAME));

//TODO: Async Code
const wait = (timer, callback) => {
  setTimeout(() => {
    callback();
  }, timer);
};

const op = () => console.log("Executes Callback");

sayHi(NAME);
wait(4000, op);
