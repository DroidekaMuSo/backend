const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const notesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

notesSchema.plugin(mongoosePaginate);

const notesModel = model("notes", notesSchema);

module.exports = notesModel;
