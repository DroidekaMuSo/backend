const mongoose = require("mongoose");

const coursesCollection = "Courses";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  students: {
    type: Array,
    default: [],
  },
});

const coursesModel = mongoose.model(coursesCollection, courseSchema);
module.exports = coursesModel;
