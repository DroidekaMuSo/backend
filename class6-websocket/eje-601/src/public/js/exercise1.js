const socket = io();

//* Part1

const input = document.getElementById("textBox");
const log = document.getElementById("log");

input.addEventListener("keyup", (evt) => {
  let { key } = evt;
  evt.target.value = "";

  socket.emit("messageByCharacter", key);
});


socket.on("log", (data) => {
  log.innerHTML = log.innerHTML + " " + data;
});
