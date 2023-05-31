const socket = io();

//Chanel 1: Send character by character
const input = document.getElementById("textBox");
const log = document.getElementById("log");

input.addEventListener("keyup", (evt) => {
  let { key } = evt;

  evt.target.value = "";
  console.log("🚀 ~ file: home.js:9 ~ input.addEventListener ~ key:", key);

  socket.emit("messageByCharacter", key);
});
