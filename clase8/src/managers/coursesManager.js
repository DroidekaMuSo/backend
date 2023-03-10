const coursesModel = require("../models/courses.model");

class CoursesManager {
  getCourses = async () => {
    try {
      const data = await coursesModel.find({});
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: coursesManager.js:11 ~ CoursesManager ~ getCourses= ~ error:",
        error
      );
    }
  };

  getCourseById = async (cid) => {
    try {
      const product = await coursesModel.findById({ _id: cid });

      if (!product) {
        return null;
      }

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: coursesManager.js:26 ~ CoursesManager ~ getCourseById= ~ error:",
        error
      );
    }
  };

  postCourse = async (formData) => {
    try {
      const checkCourse = await coursesModel.findOne({
        title: `${formData.title}`,
      });

      if (checkCourse) {
        return null;
      }

      const newCourse = await coursesModel.create({
        formData,
        title: `${formData.title.toLowerCase()}`,
      });

      return newCourse;
    } catch (error) {
      console.log(
        "🚀 ~ file: coursesManager.js:36 ~ CoursesManager ~ postCourse= ~ error:",
        error
      );
    }
  };
  putCourse = async (cid) => {};
}

module.exports = CoursesManager;
