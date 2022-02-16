const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  student_id: {
    type: String,
    required: true
  },
  student_name: {
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
    weightage: [Number],
    lesson_tested: [String]
  }],
  beta_tester: {
    type: Boolean,
    default: false
  },
  tests_created: {
    type: [String]
  },
  participation_score: {
      type: Number,
      default: 0
  }
});
module.exports = Report = mongoose.model("reports", ReportSchema);