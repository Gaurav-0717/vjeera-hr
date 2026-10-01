import { Router } from "express";
import { getPublicJobs } from "../controllers/jobController.js";

const router = Router();

router.get("/", getPublicJobs);

export default router;
