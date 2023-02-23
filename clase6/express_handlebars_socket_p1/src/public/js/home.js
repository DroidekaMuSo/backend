const socket = io();

const input = document.getElementById("textbox");
const log = document.getElementById("log");
input.addEventListener("keyup", (e) => {
  let { key } = e;
  e.target.value = "";
  console.log(key);
  socket.emit("messageByCharacter", key);
});

socket.on("log", (data) => {
  log.innerHTML = log.innerHTML + " " + data;
});
