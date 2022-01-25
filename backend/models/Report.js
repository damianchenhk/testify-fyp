const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Course Creation Information Schema
const ReportSchema = new Schema({
  student_id: {
    type: String,
    required: true
  },
  course_id: {
    type: String,
    required: true
  },
  tests_taken: [{
    test_id: String,
    answers: [String],
    result: [Number],
    lesson_tested: [String]
  }],
  beta_tester: {
    type: Boolean,
    default: false
  },
  participation_score: {
      type: Number
  }
});
module.exports = Report = mongoose.model("reports", ReportSchema);