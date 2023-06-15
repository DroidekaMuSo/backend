const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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

studentSchema.plugin(mongoosePaginate);
const studentModel = model("Student", studentSchema);

module.exports = studentModel;
