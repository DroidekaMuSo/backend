const mongoose = require("mongoose");

const collectionName = "Pets";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  specie: {
    type: String,
    require: true,
  },
});

const petsModel = mongoose.model(collectionName, petSchema);
module.exports = petsModel;
