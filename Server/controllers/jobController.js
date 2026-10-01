import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getPublicJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ isActive: true }).sort({ createdAt: 1 });

  res.json({
    success: true,
    message: "Jobs retrieved",
    data: jobs,
  });
});
