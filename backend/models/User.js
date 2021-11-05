const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Creation Information Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "Student"
  },
  ongoing_courses: {
    type: [String]
  },
  completed_courses: {
    type: [String]
  }
});
module.exports = User = mongoose.model("users", UserSchema);