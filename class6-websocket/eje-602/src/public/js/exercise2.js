const socket = io();

const input = document.getElementById("textBox");
const log = document.getElementById("log");

input.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    socket.emit("messageBySocket", input.value);
    input.value = "";
  }
});

socket.on("log", (data) => {
  let logs = "";

  data.logs.forEach((log) => {
    logs += `${log.socketId} says ${log.message} <br/>`;
  });

  log.innerHTML = logs;
});

socket.on("messageForEverybody", (data) => {
  console.log("🚀 ~ file: exercise2.js:24 ~ socket.on ~ data:", data);
});
