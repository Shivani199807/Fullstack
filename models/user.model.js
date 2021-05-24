const moongose = require("mongoose");

const userSchema = new moongose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);
// this user is basically the table name
const User = moongose.model("User", userSchema);
module.exports = User;
