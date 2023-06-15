const courseModel = require("../models/coursesModel");

class CourseManager {
  getCourses = async () => {
    try {
      const courses = await courseModel.find({}).lean();

      return courses;
    } catch (error) {
      console.log(
        "🚀 ~ file: coursesController.js:10 ~ CourseManager ~ getCourses= ~ error:",
        error
      );
    }
  };

  getCourseById = async (cid) => {
    try {
      const course = await courseModel.findById({ _id: cid });

      if (!course) return null;

      return course;
    } catch (error) {
      console.log(
        "🚀 ~ file: coursesController.js:22 ~ CourseManager ~ getCourseById= ~ error:",
        error
      );
    }
  };

  postCourse = async (course) => {
    try {
      const confirm = await courseModel.findOne({
        title: `${course.title.toLowerCase()}`,
      });

      if (confirm) return null;

      const newCourse = await courseModel.create({
        ...course,
        title: course.title.toLowerCase(),
      });

      return newCourse;
    } catch (error) {
      console.log(
        "🚀 ~ file: coursesController.js:41 ~ CourseManager ~ postCourse= ~ error:",
        error
      );
    }
  };

  putCourse = async (cid, data) => {
    try {
      const updateCourse = await courseModel.findByIdAndUpdate(cid, data);

      if (!updateCourse) return null;

      return updateCourse;
    } catch (error) {
      console.log(
        "🚀 ~ file: coursesController.js:45 ~ CourseManager ~ putCourse= ~ error:",
        error
      );
    }
  };
}

module.exports = CourseManager;
