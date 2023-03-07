const { Router } = require("express");
const studentsModel = require("../models/students.model");
const studentsData = require("../db/students");

class StudentsRoutes {
  path = "/students";
  router = Router();

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
        const students = await studentsModel.find({});

        if (!students) {
          return res.status(400).json({
            message: "Students not found",
          });
        }

        return res.status(200).json({
          message: "Students in data base",
          students,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:25 ~ StudentsRoutes ~ this.router.get ~ error:",
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

        const student = await studentsModel.findById({ _id: sid });

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
        const { firtName, age, lastName, dni, gender, grade } = req.body;

        const confirmDni = await studentsModel.findOne({ dni });

        if (!firtName || !age || !lastName || !dni || !gender || !grade) {
          return res.status(400).json({
            message: "All fields are mandatory",
          });
        }

        if (gender.toUpperCase() !== "f" || gender.toUpperCase() !== "m") {
          return res.status(400).json({
            message: "Gender must be f or m, not other word can be used",
          });
        }

        if (confirmDni) {
          return res.json({
            message: "Student already in the system",
          });
        }

        const newStudent = await studentsModel.create(req.body);

        if (!newStudent) {
          res.status(400).json({
            message: "Error creating the document",
          });
        }

        return rs.status(200).json({
          message: "Student Created",
          student: newStudent,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: students.routes.js:91 ~ StudentsRoutes ~ this.router.post ~ error:",
          error
        );
      }
    });
  }
}

module.exports = StudentsRoutes;
