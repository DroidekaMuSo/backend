const mongoose = require("mongoose");
const collectionName = "Students";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    // unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

const studentsModel = mongoose.model(collectionName, studentSchema);
module.exports = studentsModel;
