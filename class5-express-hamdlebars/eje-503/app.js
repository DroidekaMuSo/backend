const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const path = require("path");

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

const users = [
  {
    name: "John",
    lastName: "Doe",
    age: 25,
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    name: "Alice",
    lastName: "Smith",
    age: 32,
    email: "alice.smith@example.com",
    phone: "9876543210",
  },
  {
    name: "Bob",
    lastName: "Johnson",
    age: 45,
    email: "bob.johnson@example.com",
    phone: "4567890123",
  },
  {
    name: "Emily",
    lastName: "Brown",
    age: 28,
    email: "emily.brown@example.com",
    phone: "7890123456",
  },
  {
    name: "David",
    lastName: "Wilson",
    age: 50,
    email: "david.wilson@example.com",
    phone: "5678901234",
  },
];

app.get("/", (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * users.length);
    const userToRender = users[randomNumber];

    res.render("users", userToRender);
  } catch (error) {
    console.log("🚀 ~ file: app.js:60 ~ app.get ~ error:", error);
  }
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API running on port ${PORT}`);
});
