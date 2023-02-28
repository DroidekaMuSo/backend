const { Schema } = require("mongoose");
const colletionName = "Students";

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
  dni: {
    type: String,
    required: true,
    unique: true,
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
