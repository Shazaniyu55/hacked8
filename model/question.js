// models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Question', questionSchema);
  