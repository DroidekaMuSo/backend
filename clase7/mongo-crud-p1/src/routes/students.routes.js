//Dependecies
const { Router } = require("express");

//Schema and database
const studentsData = require("../data/students"),
  studentsModel = require("../model/students.model");

const router = Router();

router.get("/insertion", async (req, res) => {
  try {
    let result = await studentsModel.insertMany(studentsData);
    return res.status(200).json({
      message: "Students added",
      students: result,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
