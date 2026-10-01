import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getDashboard,
  listContacts,
  updateContactStatus,
  deleteContact,
  listEnrollments,
  updateEnrollmentStatus,
  deleteEnrollment,
  listApplications,
  updateApplicationStatus,
  deleteApplication,
  listCorporate,
  updateCorporateStatus,
  deleteCorporate,
  listJobs,
  createJob,
  updateJob,
  deleteJob,
  listCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/adminController.js";

const router = Router();

router.use(protect);

router.get("/dashboard", getDashboard);

router.get("/contacts", listContacts);
router.patch("/contacts/:id", updateContactStatus);
router.delete("/contacts/:id", deleteContact);

router.get("/enrollments", listEnrollments);
router.patch("/enrollments/:id", updateEnrollmentStatus);
router.delete("/enrollments/:id", deleteEnrollment);

router.get("/applications", listApplications);
router.patch("/applications/:id", updateApplicationStatus);
router.delete("/applications/:id", deleteApplication);

router.get("/corporate-enquiries", listCorporate);
router.patch("/corporate-enquiries/:id", updateCorporateStatus);
router.delete("/corporate-enquiries/:id", deleteCorporate);

router.get("/jobs", listJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

router.get("/courses", listCourses);
router.post("/courses", createCourse);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

export default router;
