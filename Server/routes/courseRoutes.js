import { Router } from "express";
import { getPublicCourses } from "../controllers/courseController.js";

const router = Router();

router.get("/", getPublicCourses);

export default router;
