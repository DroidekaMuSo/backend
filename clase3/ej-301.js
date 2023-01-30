//Sync code
const greeting = (name) => {
  console.log(name);
};

const howAreYou = (name) => {
  console.log(`How are you ${name}`);
};

const name = "Frank";

//Async Code
const wait = (timer, callBack) => {
  setTimeout(() => {
    callBack();
  }, timer);
};
const op = () => console.log("Executes a CallBack");

greeting(name);
wait(4000, op);
