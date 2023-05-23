const socket = io();

const input = document.getElementById("textBox");
const log = document.getElementById("log");

input.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    socket.emit("messageBySocket", input.value);
    input.value = "";
  }
});

socket.on("log", (data) => {
  let logs = "";

  console.log(data.logs)

  data.logs.forEach((log) => {
    logs += `${log.socketId} says: ${log.message} <br/>`;
  });

  log.innerHTML = logs;
});

socket.on("messageForEveryone", (data) => {
  console.log("🚀 ~ file: exercise2.js:24 ~ socket.on ~ data:", data);
});
