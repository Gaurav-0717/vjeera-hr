import { Router } from "express";
import { createApplication } from "../controllers/applicationController.js";
import validateApplication from "../middleware/validateApplication.js";
import { submitLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", submitLimiter, validateApplication, createApplication);

export default router;
