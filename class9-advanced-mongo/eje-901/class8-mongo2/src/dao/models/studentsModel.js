const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  firstName: {
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
    unique: true,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  grade: {
    type: Number,
  },
  course: {
    type: Array,
    default: [],
  },
});

const studentModel = model("Student", studentSchema);

module.exports = studentModel;
