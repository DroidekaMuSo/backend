const { Router } = require("express");
const studentsModel = require("../models/students.model");
const studentsData = require("../db/students");
const StudentManager = require("../managers/studentManager");

class StudentsRoutes {
  path = "/students";
  router = Router();
  studentManager = new StudentManager();

  constructor() {
    this.initStudentsRoutes();
  }

  initStudentsRoutes() {
    this.router.get(`${this.path}/insertion`, async (req, res) => {
      try {
        const students = await studentsModel.insertMany(studentsData);
        // TODO: agregar validaciones

        if (!students)
          return res.status(400).json({
            message: "Error",
          });

        return res.status(200).json({
          message: "students insert successfully",
          studentsInserted: students,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:25 ~ StudentsRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    this.router.get(`${this.path}`, async (req, res) => {
      try {
        const students = await this.studentManager.getStudents();
        return res.status(200).json({
          message: "Students in data base",
          students,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:41 ~ StudentsRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    this.router.get(`${this.path}/:sid`, async (req, res) => {
      try {
        const { sid } = req.params;
        if (sid.length < 12 || sid.length > 12) {
          return res.status(400).json({
            message: "Id must have 12 characters",
          });
        }

        const student = await this.studentManager.getStudentById(sid);

        if (!student) {
          return res.status(400).json({
            message: "Student not found",
          });
        }

        return res.status(200).json({
          message: "Student found",
          student,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:62 ~ StudentsRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    //todo: Realizar las validaciones
    this.router.post(`${this.path}`, async (req, res) => {
      try {
        const formData = req.body;

        const newStudent = await this.studentManager.createStudent(formData);

        if (!studentDetail) {
          return res.json({
            message: "User already registed",
          });
        }

        return res.json({
          message: "Student created",
          newStudent,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:92 ~ StudentsRoutes ~ this.router.post ~ error:",
          error
        );
      }
    });
  }
}

module.exports = StudentsRoutes;
