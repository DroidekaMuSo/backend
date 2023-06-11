const router = require("express").Router();

const users = [
  {
    name: "John",
    lastName: "Doe",
    age: 25,
    phone: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    name: "Jane",
    lastName: "Smith",
    age: 30,
    phone: "987-654-3210",
    email: "jane.smith@example.com",
  },
  {
    name: "Alice",
    lastName: "Johnson",
    age: 35,
    phone: "555-123-4567",
    email: "alice.johnson@example.com",
  },
  {
    name: "Bob",
    lastName: "Anderson",
    age: 28,
    phone: "444-555-6666",
    email: "bob.anderson@example.com",
  },
  {
    name: "Emily",
    lastName: "Davis",
    age: 32,
    phone: "777-888-9999",
    email: "emily.davis@example.com",
  },
];

router.get("/", (req, res) => {
  try {
    return res.json({
      message: "Users",
      users,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.router.js:46 ~ router.get ~ error:", error);
  }
});

router.post("/", (req, res) => {
  try {
    const { name, lastName, age, phone, email } = req.body;

    if (!name || !lastName || !age || !phone || !email) {
      return res.json({
        message: "All fields must filled out",
        user: { ...req.body },
      });
    }

    const userToAdd = req.body;
    const newUser = { ...userToAdd };

    users.push(newUser);

    return res.json({
      message: "User added",
      users,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.router.js:55 ~ router.post ~ error:", error);
  }
});

module.exports = router;
