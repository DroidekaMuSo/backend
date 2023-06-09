const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
});

const studentModel = model("Pet", studentSchema);

module.exports = studentModel;
