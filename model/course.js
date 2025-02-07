// models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: {type: String, required: true },
  ispaid: { type: Boolean, required: true },
  topics: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true }
  }],
  pdf:{ type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
