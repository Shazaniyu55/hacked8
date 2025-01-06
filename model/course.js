// models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
