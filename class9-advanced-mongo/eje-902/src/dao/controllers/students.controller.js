const studentsModel = require("../models/students.model");

class StudentsController {
  paginate = async (page, limit) => {
    try {
      const studentsPaginate = await studentsModel.paginate(
        {},
        { page, limit }
      );

      const studentsAverage = await studentsModel.aggregate([
        { $group: { _id: "students", average: { $avg: "$grade" } } },
      ]);

      return { studentsAverage, studentsPaginate };
    } catch (error) {
      console.log(
        "🚀 ~ file: students.controller.js:7 ~ StudentsController ~ error:",
        error
      );
    }
  };
}

module.exports = StudentsController;
