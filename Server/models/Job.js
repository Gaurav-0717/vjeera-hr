import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 4000 },
    experience: { type: String, trim: true, maxlength: 80, default: "" },
    skills: { type: String, trim: true, maxlength: 500, default: "" },
    location: { type: String, trim: true, maxlength: 120, default: "" },
    employmentType: { type: String, trim: true, maxlength: 80, default: "" },
    displayColor: { type: String, trim: true, maxlength: 30, default: "info" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);
