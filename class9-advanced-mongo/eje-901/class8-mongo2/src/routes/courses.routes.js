const { Router } = require("express");

const CourseController = require("../dao/controllers/coursesController");

class CoursesRoutes {
  path = "/courses";
  router = Router();
  courseController = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    //*Get courses
    this.router.get(`${this.path}`, async (req, res) => {
      try {
        const courses = await this.courseController.getCourses();

        return res.status(200).json({
          message: "Courses",
          NumOfCourses: courses.length,
          courses,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: courses.routes.js:12 ~ CoursesRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    //*Get course by Id
    this.router.get(`${this.path}/:cid`, async (req, res) => {
      try {
        const { cid } = req.params;

        const course = await this.courseController.getCourseById(cid);

        if (!course) return res.status(400).json({ message: "Id not found" });

        return res.status(200).json({
          message: `ID ${cid} found`,
          course,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: courses.routes.js:39 ~ CoursesRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    //*Create a course
    this.router.post(`${this.path}`, async (req, res) => {
      try {
        const course = req.body;

        const createCourse = await this.courseController.postCourse(course);

        if (!createCourse)
          return res.status(400).json({
            message: `Course: ${course.title} is already in the system `,
          });

        return res.status(200).json({
          message: `Course: ${course.title} has been added`,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: courses.routes.js:60 ~ CoursesRoutes ~ this.router.post ~ error:",
          error
        );
      }
    });

    //*Update a course
    this.router.put(`${this.path}/:cid`, async (req, res) => {
      try {
        const { cid } = req.params;
        const data = req.body;

        const updateCourse = await this.courseController.putCourse(cid, data);

        if (!updateCourse)
          return res.status(400).json({
            message: "Id not found",
          });

        return res.status(200).json({
          message: `Course: ${updateCourse.title} has been update`,
          course: await this.courseController.getCourseById(cid),
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: courses.routes.js:82 ~ CoursesRoutes ~ this.router.put ~ error:",
          error
        );
      }
    });
  }
}
module.exports = CoursesRoutes;
