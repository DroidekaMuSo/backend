const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

noteSchema.plugin(mongoosePaginate);

const notesModel = model("notes", noteSchema);

module.exports = notesModel;
