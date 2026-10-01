import Course from "../models/Course.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getPublicCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ isActive: true }).sort({ createdAt: 1 });

  res.json({
    success: true,
    message: "Courses retrieved",
    data: courses,
  });
});
