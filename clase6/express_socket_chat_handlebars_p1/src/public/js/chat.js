const socket = io();

let user;
const chatbox = document.getElementById("chatbox");

Swal.fire({
  title: "Welcome, please identify yourself",
  input: "text",
  allowOutsideClick: false,
}).then((result) => {
  user.result.value;
  socket.emit("authenticated", user);
});

chatbox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatbox.value });
      chatbox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  console.log(data);

  if (!user) return;

  let log = document.getElementById("messageLogs");
  let messages = "";

  data.forEach((msg) => {
    messages += `${msg.user} says: ${msg.message} <br/>`;
  });
  log.innerHTML = messages;
});

socket.on("newUserConnected", (data) => {
  if (!user) return;

  Swal.fire({
    title: `${data} has logged`,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    icon: "success",
  });
});
