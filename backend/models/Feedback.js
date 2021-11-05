const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Feedback Creation Information Schema
const FeedbackSchema = new Schema({
  student_id: {
    type: String,
    required: true
  },
  course_id: {
    type: String,
    required: true
  },
  test_id: {
    type: String,
    required: true
  },
  feedback_scores: {
    type: [String],
    required: true
  },
  detailed_feedback: {
    type: String,
    required: true
  }
});
module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);