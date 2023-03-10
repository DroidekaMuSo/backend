const studentModel = require("../models/students.model");
const studentsModel = require("../models/students.model");

class StudentManager {
  getStudents = async () => {
    try {
      const students = await studentsModel.find({});
      return students;
    } catch (error) {
      console.log(
        "🚀 ~ file: studentManager.js:7 ~ StudentManager ~ getStudents= ~ error:",
        error
      );
    }
  };

  getStudentById = async (sid) => {
    try {
      const student = await studentsModel.findById({ _id: sid });
      return student;
    } catch (error) {
      console.log(
        "🚀 ~ file: studentManager.js:18 ~ StudentManager ~ getStudentById= ~ error:",
        error
      );
    }
  };

  createStudent = async (bodyStudent) => {
    try {
      const confirmDni = await studentModel.findById({ _id: bodyStudent.dni });

      if (confirmDni) {
        return null;
      }

      const newStudent = await studentModel.create(bodyStudent);
      return newStudent;
    } catch (error) {
      console.log(
        "🚀 ~ file: studentManager.js:40 ~ StudentManager ~ createStudent= ~ error:",
        error
      );
    }
  };
}

module.exports = StudentManager;
