const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Course Creation Information Schema
const CourseSchema = new Schema({
  course_name: {
    type: String,
    required: true
  },
  instructor_id: {
    type: String,
    required: true
  },
  instructor_name: {
    type: String,
    required: true
  },
  course_description: {
    type: String,
    required: true
  },
  lesson_names: {
    type: [String],
    required: true
  },
  lesson_urls: {
    type: [String],
    required: true
  },
  lesson_descriptions: {
    type: [String],
    required: true
  },
  lesson_weightage: {
    type: [Number],
    required: true
  },
  exam_weightage: {
    type: Number,
    required: true
  },
  participation_weightage:{
      type: Number,
      required: true
  }
});
module.exports = Course = mongoose.model("courses", CourseSchema);