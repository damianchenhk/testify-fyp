const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Test Creation Information Schema
const TestSchema = new Schema({
  creator_id: {
    type: String,
    required: true
  },
  creator_name: {
    type: String,
    required: true
  },
  course_id: {
    type: String,
    required: true
  },
  test_name: {
    type: String,
    requred: true
  },
  test_description: {
    type: String,
    required: true
  },
  questions: {
    type: [String],
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  answers: {
    type: [String],
    required: true
  },
  concept_tested: {
    type: [String],
    required: true
  },
  concept_weightage: {
    type: [Number],
    required: true
  },
  tester_id: {
    type: [String]
  },
  students_completed_id:{
      type: [String]
  },
  student_scores:{
      type: [Number]
  }
});
module.exports = Test = mongoose.model("tests", TestSchema);