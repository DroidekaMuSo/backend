const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const roleType = {
  USER: "USER",
  ADMIN: "ADMIN",
  PUBLIC: "PUBLIC",
};

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: { type: String, unique: true },
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
          ref: "notes",
        },
      },
    ],
    default: [],
  },
});

userSchema.plugin(mongoosePaginate);
userSchema.pre("find", function () {
  this.populate("notes.note");
});

const userModel = model("Users", userSchema);

module.exports = userModel;
