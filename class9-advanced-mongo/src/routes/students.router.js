const router = require("express").Router();
const StudentsController = require("../dao/controllers/studentsController");

const studentModel = new StudentsController();

router.get("/", async (req, res) => {
  try {
    const students = await studentModel.getStudents();

    return res.status(200).json({ message: "All students", students });
  } catch (error) {
    console.log("🚀 ~ file: students.router.js:7 ~ router.get ~ error:", error);
  }
});

router.get("/groups", async (req, res) => {
  try {
  } catch (error) {
    console.log(
      "🚀 ~ file: students.router.js:19 ~ router.get ~ error:",
      error
    );
  }
});

module.exports = router;
