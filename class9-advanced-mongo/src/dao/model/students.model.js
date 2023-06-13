const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
});

const studentModel = model("Student", studentSchema);

module.exports = studentModel;
