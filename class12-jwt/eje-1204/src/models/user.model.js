const { Schema, model } = require("mongoose");

const roleType = {
  USER: "USER",
  ADMIN: "ADMIN",
  PUBLIC: "PUBLIC",
};

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
  role: {
    type: String,
    enum: Object.values(roleType),
  },
  notes: {
    type: [
      {
        note: {
          type: Schema.Types.ObjectId,
          ref: "Notes",
        },
      },
    ],
  },
});

const userModel = model("Users", userSchema);

module.exports = userModel;
