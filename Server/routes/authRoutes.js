import { Router } from "express";
import { login } from "../controllers/authController.js";
import validateLogin from "../middleware/validateLogin.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/login", loginLimiter, validateLogin, login);

export default router;
