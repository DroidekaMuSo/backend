const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
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
  id: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

const studentModel = model("student", studentSchema);

module.exports = studentModel;
