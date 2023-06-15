const { Router } = require("express");

const StudentController = require("../dao/controllers/studentsController");
const CourseController = require("../dao/controllers/coursesController");

class ViewsRoutes {
  path = "/views";
  router = Router();
  studentController = new StudentController();
  courseController = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    //*Get students
    this.router.get(`${this.path}/students`, async (req, res) => {
      try {
        const students = await this.studentController.getStudents();

        const mapStudents = students.map((student) => {
          return {
            name: student.name,
            lastName: student.lastName,
            dni: student.dni,
          };
        });

        res.render("students", {
          students: mapStudents,
          style: "students.css",
          title: "Students",
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: views.routes.js:21 ~ ViewsRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    this.router.get(`${this.path}/courses`, async (req, res) => {
      try {
        const courses = await this.courseController.getCourses();

        const mapCourses = courses.map((course) => {
          return {
            title: course.title,
          };
        });

        res.render("courses", {
          title: "Courses",
          style: "courses.css",
          courses: mapCourses,
        });
        
      } catch (error) {
        console.log(
          "🚀 ~ file: views.routes.js:46 ~ ViewsRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });
  }
}

module.exports = ViewsRoutes;
