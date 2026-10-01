import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, trim: true, maxlength: 2000, default: "" },
    batchStart: { type: String, trim: true, maxlength: 120, default: "" },
    batchTime: { type: String, trim: true, maxlength: 200, default: "" },
    objectives: [{ type: String, trim: true, maxlength: 200 }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Course", courseSchema);
