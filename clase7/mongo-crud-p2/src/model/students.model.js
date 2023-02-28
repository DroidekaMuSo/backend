const mongoose = require("mongoose");

const collectionName = "Students";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  dni: {
    type: Number,
    require: true,
  },
  course: {
    type: String,
    require: true,
  },
  grade: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
});

const studentsModel = mongoose.model(collectionName, studentSchema);
module.exports = studentsModel;
