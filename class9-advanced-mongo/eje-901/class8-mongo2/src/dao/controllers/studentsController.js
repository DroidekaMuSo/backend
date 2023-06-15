const studentModel = require("../models/studentsModel");

class StudentController {
  addData = async (data) => {
    try {
      const addData = studentModel.insertMany(data);

      return addData;
    } catch (error) {
      console.log(
        "🚀 ~ file: studentsController.js:8 ~ StudentController ~ addData=async ~ error:",
        error
      );
    }
  };

  getStudents = async () => {
    try {
      const students = await studentModel.find({}).lean({});

      return students;
    } catch (error) {
      console.log(
        "🚀 ~ file: studentsController.js:20 ~ StudentController ~ getStudents=async ~ error:",
        error
      );
    }
  };

  getStudent = async (sid) => {
    try {
      const student = await studentModel.findById({ _id: sid });

      if (!student) return null;

      return student;
    } catch (error) {
      console.log(
        "🚀 ~ file: studentsController.js:33 ~ StudentController ~ getStudent=async ~ error:",
        error
      );
    }
  };

  createStudent = async (studentData) => {
    try {
      const check = await studentModel.findOne({
        dni: studentData.dni,
      });

      if (check) return null;

      const createStudent = await studentModel.create(studentData);

      return createStudent;
    } catch (error) {
      console.log(
        "🚀 ~ file: studentsController.js:48 ~ StudentController ~ createStudent=async ~ error:",
        error
      );
    }
  };
}

module.exports = StudentController;
