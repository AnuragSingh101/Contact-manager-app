const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "please add your username"],
  },
  email: {
    type: String,
    require: [true, "please enter your email"],
    unique: [true, "Email is already taken"],
  },
  password: {
    type: String,
    require: [true, "please add the user password"],
  },
});

module.exports = mongoose.model("User", userSchema);
