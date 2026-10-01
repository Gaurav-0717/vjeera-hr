import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createEnrollment = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.validated.course,
    isActive: true,
  });

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  const enrollment = await Enrollment.create(req.validated);

  res.status(201).json({
    success: true,
    message: "Enrollment request submitted",
    data: { id: enrollment._id },
  });
});
