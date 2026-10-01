import Contact from "../models/Contact.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import CorporateEnquiry from "../models/CorporateEnquiry.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  readString,
  requireObjectId,
  optionalEnum,
  optionalBoolean,
  optionalStringArray,
} from "../utils/validate.js";

const CONTACT_STATUSES = ["new", "read", "replied", "closed"];
const ENROLLMENT_STATUSES = ["pending", "contacted", "enrolled", "cancelled"];
const APPLICATION_STATUSES = [
  "pending",
  "reviewing",
  "shortlisted",
  "rejected",
  "hired",
];
const CORPORATE_STATUSES = ["new", "contacted", "converted", "closed"];

export const getDashboard = asyncHandler(async (req, res) => {
  const [
    totalContacts,
    newContacts,
    totalEnrollments,
    pendingEnrollments,
    totalApplications,
    pendingApplications,
    reviewingApplications,
    totalJobs,
    activeJobs,
    totalCourses,
    activeCourses,
    totalCorporateEnquiries,
    newCorporateEnquiries,
    applicationStatusRows,
  ] = await Promise.all([
    Contact.countDocuments(),
    Contact.countDocuments({ status: "new" }),
    Enrollment.countDocuments(),
    Enrollment.countDocuments({ status: "pending" }),
    Application.countDocuments(),
    Application.countDocuments({ status: "pending" }),
    Application.countDocuments({ status: "reviewing" }),
    Job.countDocuments(),
    Job.countDocuments({ isActive: true }),
    Course.countDocuments(),
    Course.countDocuments({ isActive: true }),
    CorporateEnquiry.countDocuments(),
    CorporateEnquiry.countDocuments({ status: "new" }),
    Application.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
  ]);

  const applicationsByStatus = Object.fromEntries(
    APPLICATION_STATUSES.map((status) => [status, 0]),
  );
  applicationStatusRows.forEach((row) => {
    if (row._id && applicationsByStatus[row._id] !== undefined) {
      applicationsByStatus[row._id] = row.count;
    }
  });

  res.json({
    success: true,
    message: "Dashboard retrieved",
    data: {
      totalContacts,
      newContacts,
      totalEnrollments,
      pendingEnrollments,
      totalApplications,
      pendingApplications,
      reviewingApplications,
      totalJobs,
      activeJobs,
      totalCourses,
      activeCourses,
      corporateEnquiries: totalCorporateEnquiries,
      newCorporateEnquiries,
      jobs: totalJobs,
      courses: totalCourses,
      applicationsByStatus,
    },
  });
});

export const listContacts = asyncHandler(async (req, res) => {
  const items = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Contacts retrieved", data: items });
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const status = optionalEnum(req.body.status, CONTACT_STATUSES, "status");
  if (!status) {
    throw new AppError("status is required", 400);
  }
  const item = await Contact.findByIdAndUpdate(id, { status }, { new: true });
  if (!item) throw new AppError("Contact not found", 404);
  res.json({ success: true, message: "Contact updated", data: item });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const item = await Contact.findByIdAndDelete(id);
  if (!item) throw new AppError("Contact not found", 404);
  res.json({ success: true, message: "Contact deleted" });
});

export const listEnrollments = asyncHandler(async (req, res) => {
  const items = await Enrollment.find()
    .populate("course", "title")
    .sort({ createdAt: -1 });
  res.json({ success: true, message: "Enrollments retrieved", data: items });
});

export const updateEnrollmentStatus = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const status = optionalEnum(req.body.status, ENROLLMENT_STATUSES, "status");
  if (!status) {
    throw new AppError("status is required", 400);
  }
  const item = await Enrollment.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  ).populate("course", "title");
  if (!item) throw new AppError("Enrollment not found", 404);
  res.json({ success: true, message: "Enrollment updated", data: item });
});

export const deleteEnrollment = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const item = await Enrollment.findByIdAndDelete(id);
  if (!item) throw new AppError("Enrollment not found", 404);
  res.json({ success: true, message: "Enrollment deleted" });
});

export const listApplications = asyncHandler(async (req, res) => {
  const items = await Application.find()
    .populate("job", "title")
    .sort({ createdAt: -1 });
  res.json({ success: true, message: "Applications retrieved", data: items });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const status = optionalEnum(req.body.status, APPLICATION_STATUSES, "status");
  if (!status) {
    throw new AppError("status is required", 400);
  }
  const item = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  ).populate("job", "title");
  if (!item) throw new AppError("Application not found", 404);
  res.json({ success: true, message: "Application updated", data: item });
});

export const deleteApplication = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const item = await Application.findByIdAndDelete(id);
  if (!item) throw new AppError("Application not found", 404);
  res.json({ success: true, message: "Application deleted" });
});

export const listCorporate = asyncHandler(async (req, res) => {
  const items = await CorporateEnquiry.find().sort({ createdAt: -1 });
  res.json({
    success: true,
    message: "Corporate enquiries retrieved",
    data: items,
  });
});

export const updateCorporateStatus = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const status = optionalEnum(req.body.status, CORPORATE_STATUSES, "status");
  if (!status) {
    throw new AppError("status is required", 400);
  }
  const item = await CorporateEnquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  if (!item) throw new AppError("Corporate enquiry not found", 404);
  res.json({ success: true, message: "Corporate enquiry updated", data: item });
});

export const deleteCorporate = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const item = await CorporateEnquiry.findByIdAndDelete(id);
  if (!item) throw new AppError("Corporate enquiry not found", 404);
  res.json({ success: true, message: "Corporate enquiry deleted" });
});

const parseJobBody = (body, { partial = false } = {}) => {
  const payload = {};
  const title = readString(body, "title", {
    required: !partial,
    min: 2,
    max: 150,
  });
  const description = readString(body, "description", {
    required: !partial,
    min: 10,
    max: 4000,
  });
  if (title !== undefined) payload.title = title;
  if (description !== undefined) payload.description = description;
  if (body.experience !== undefined) {
    payload.experience = readString(body, "experience", { max: 80 }) || "";
  }
  if (body.skills !== undefined) {
    payload.skills = readString(body, "skills", { max: 500 }) || "";
  }
  if (body.location !== undefined) {
    payload.location = readString(body, "location", { max: 120 }) || "";
  }
  if (body.employmentType !== undefined) {
    payload.employmentType =
      readString(body, "employmentType", { max: 80 }) || "";
  }
  if (body.displayColor !== undefined) {
    payload.displayColor =
      readString(body, "displayColor", { max: 30 }) || "info";
  }
  const isActive = optionalBoolean(body.isActive, "isActive");
  if (isActive !== undefined) payload.isActive = isActive;
  return payload;
};

export const listJobs = asyncHandler(async (req, res) => {
  const items = await Job.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Jobs retrieved", data: items });
});

export const createJob = asyncHandler(async (req, res) => {
  const item = await Job.create(parseJobBody(req.body));
  res.status(201).json({ success: true, message: "Job created", data: item });
});

export const updateJob = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const item = await Job.findByIdAndUpdate(
    id,
    parseJobBody(req.body, { partial: true }),
    { new: true, runValidators: true },
  );
  if (!item) throw new AppError("Job not found", 404);
  res.json({ success: true, message: "Job updated", data: item });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const item = await Job.findByIdAndDelete(id);
  if (!item) throw new AppError("Job not found", 404);
  res.json({ success: true, message: "Job deleted" });
});

const parseCourseBody = (body, { partial = false } = {}) => {
  const payload = {};
  const title = readString(body, "title", {
    required: !partial,
    min: 2,
    max: 150,
  });
  if (title !== undefined) payload.title = title;
  if (body.description !== undefined) {
    payload.description = readString(body, "description", { max: 2000 }) || "";
  }
  if (body.batchStart !== undefined) {
    payload.batchStart = readString(body, "batchStart", { max: 120 }) || "";
  }
  if (body.batchTime !== undefined) {
    payload.batchTime = readString(body, "batchTime", { max: 200 }) || "";
  }
  const objectives = optionalStringArray(body.objectives, "objectives");
  if (objectives !== undefined) payload.objectives = objectives;
  const isActive = optionalBoolean(body.isActive, "isActive");
  if (isActive !== undefined) payload.isActive = isActive;
  return payload;
};

export const listCourses = asyncHandler(async (req, res) => {
  const items = await Course.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Courses retrieved", data: items });
});

export const createCourse = asyncHandler(async (req, res) => {
  const item = await Course.create(parseCourseBody(req.body));
  res
    .status(201)
    .json({ success: true, message: "Course created", data: item });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const item = await Course.findByIdAndUpdate(
    id,
    parseCourseBody(req.body, { partial: true }),
    { new: true, runValidators: true },
  );
  if (!item) throw new AppError("Course not found", 404);
  res.json({ success: true, message: "Course updated", data: item });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const id = requireObjectId(req.params.id);
  const item = await Course.findByIdAndDelete(id);
  if (!item) throw new AppError("Course not found", 404);
  res.json({ success: true, message: "Course deleted" });
});
