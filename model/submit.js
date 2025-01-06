// models/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    answers: [{ type: Number, required: true }],
    score: { type: Number },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Submission', submissionSchema);
  