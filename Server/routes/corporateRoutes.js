import { Router } from "express";
import { createCorporateEnquiry } from "../controllers/corporateController.js";
import validateCorporate from "../middleware/validateCorporate.js";
import { submitLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", submitLimiter, validateCorporate, createCorporateEnquiry);

export default router;
