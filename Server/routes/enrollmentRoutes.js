import { Router } from "express";
import { createEnrollment } from "../controllers/enrollmentController.js";
import validateEnrollment from "../middleware/validateEnrollment.js";
import { submitLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", submitLimiter, validateEnrollment, createEnrollment);

export default router;
