import { Router } from "express";
import { createContact } from "../controllers/contactController.js";
import validateContact from "../middleware/validateContact.js";
import { submitLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", submitLimiter, validateContact, createContact);

export default router;
