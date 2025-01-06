// models/Course.js
import mongoose from "mongoose";

const pdfCourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('PdfCourse', pdfCourseSchema);
