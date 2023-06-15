const studentsModel = require("../models/students.model");

class ViewController {
  paginate = async (page) => {
    try {
      const students = await studentsModel.paginate(
        {},
        { limit: 10, page, lean: true }
      );

      
      return students;
    } catch (error) {
      console.log(
        "🚀 ~ file: views.controller.js:8 ~ ViewRouter ~ paginate= ~ error:",
        error
      );
    }
  };
}

module.exports = ViewController;
