const { Router } = require("express");
const coursesModel = require("../models/courses.model");
const CoursesManager = require("../managers/coursesManager");

class CoursesRoutes {
  path = "/courses";
  router = Router();
  coursesManager = new CoursesManager();

  constructor() {
    this.initCoursesRoutes();
  }

  initCoursesRoutes() {
    this.router.get(`${this.path}`, async (req, res) => {
      try {
        const data = await this.coursesManager.getCourses();

        return res.status(200).json({
          message: "Coursers",
          data,
          amountOfCoursed: data.length,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: courses.routes.js:23 ~ CoursesRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    this.router.get(`${this.path}/:cid`, async (req, res) => {
      try {
        const cid = req.params.cid;
        const product = await this.coursesManager.getCourseById(cid);

        if (!product) {
          return res.status(400).json({
            message: "Product not found",
          });
        }

        return res.status(200).json({
          message: "Product found",
          product,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: courses.routes.js:39 ~ CoursesRoutes ~ this.router.get ~ error:",
          error
        );
      }
    });

    this.router.post(`${this.path}`, async (req, res) => {
      try {
        const formData = req.body;
        const checkCourse = await this.coursesManager.postCourse(formData);

        if (!checkCourse) {
          return res.json({
            message: `Course ${formData.title} already in the system`,
          });
        }

        res.status(200).json({
          message: "Course created",
          checkCourse,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: courses.routes.js:18 ~ CoursesRoutes ~ this.router.post ~ error:",
          error
        );
      }
    });

    this.router.put(`${this.path}/:cid`, async (req, res) => {
      try {
        const cid = req.params.cid;
        const formData = req.body;

        const updateCourse = await coursesModel.updateOne(
          { _id: cid },
          formData
        );

        return res.status(200).json({
          message: "Course updated",
          updateCourse,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: courses.routes.js:83 ~ CoursesRoutes ~ this.router.put ~ error:",
          error
        );
      }
    });
  }
}

module.exports = CoursesRoutes;
