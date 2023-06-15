const studentModel = require("../model/students.model");

class StudentsController {
  getStudents = async () => {
    try {
        const students = studentModel.find({}).lean();

        return students
    } catch (error) {
      console.log(
        "🚀 ~ file: studentsController.js:7 ~ StudentsController ~ getStudents=async ~ error:",
        error
      );
    }
  };
}

module.exports = StudentsController;
