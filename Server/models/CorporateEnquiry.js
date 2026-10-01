import mongoose from "mongoose";

const corporateEnquirySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true, maxlength: 150 },
    contactName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 30, default: "" },
    service: { type: String, trim: true, maxlength: 150, default: "" },
    employeeCount: { type: String, trim: true, maxlength: 50, default: "" },
    message: { type: String, trim: true, maxlength: 2000, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

export default mongoose.model("CorporateEnquiry", corporateEnquirySchema);
