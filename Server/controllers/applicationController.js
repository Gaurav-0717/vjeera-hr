import Job from "../models/Job.js";
import Application from "../models/Application.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createApplication = asyncHandler(async (req, res) => {
  const job = await Job.findOne({
    _id: req.validated.job,
    isActive: true,
  });

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  const application = await Application.create(req.validated);

  res.status(201).json({
    success: true,
    message: "Application submitted",
    data: { id: application._id },
  });
});
