//*Packages
const router = require("express").Router();

//*Imports
const studentModel = require("../model/studentModel");
const students = require("../data/students");

//*Routes
router.get("/insertion", async (req, res) => {
  try {
    let result = await studentModel.insertMany(students);

    return res.json({
      message: "Students added to Mongo",
      students: result,
    });
  } catch (error) {
    console.log("🚀 ~ file: students.router.js:6 ~ router.get ~ error:", error);
  }
});

module.exports = router;
