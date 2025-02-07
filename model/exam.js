// models/Exam.js
import mongoose from "mongoose";


const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    duration: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  }, { timestamps: true });
  
  module.exports = mongoose.model('Exam', examSchema);
  