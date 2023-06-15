const { Router } = require("express");

const StudentController = require("../dao/controllers/studentsController");
const studentsData = require("../db/students");

class StudentRoutes {
  path = "/students";
  router = Router();
  studentController = new StudentController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    //*Add students to data base from a file
    this.router.get(`${this.path}/insertion`, async (req, res) => {
      try {
        const addData = await this.studentController.addData(studentsData);

        return res.status(200).json({
          message: "Students have been added to the data base",
          addData,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:21 ~ StudentRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    //*Get students from the data base
    this.router.get(`${this.path}`, async (req, res) => {
      try {
        const students = await this.studentController.getStudents();

        return res.status(200).json({
          message: "Students",
          students,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:38 ~ StudentRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    //*Get student basend on their Id
    this.router.get(`${this.path}/:sid`, async (req, res) => {
      try {
        const { sid } = req.params;

        const student = await this.studentController.getStudent(sid);

        if (!student) {
          return res.status(400).json({
            message: `ID: ${sid} not found`,
          });
        }

        return res.status(200).json({
          message: `User with ID: ${sid} found`,
          student,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:56 ~ StudentRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    //*Create student
    this.router.post(`${this.path}`, async (req, res) => {
      try {
        const studentData = req.body;

        const createStudent = await this.studentController.createStudent(
          studentData
        );

        if (!createStudent) {
          return res.status(400).json({
            message: `User with dni: ${studentData.dni} is already in the system`,
          });
        }

        return res.status(200).json({
          message: `Student with dni: ${studentData.dni} has been created`,
          student: createStudent,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:79 ~ StudentRoutes ~ this.router.post ~ error:",
          error
        );
      }
    });
  }
}

module.exports = StudentRoutes;
