import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError("Server authentication is not configured", 500);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    throw new AppError("Authentication required", 401);
  }

  if (admin.role !== "admin") {
    throw new AppError("Forbidden", 403);
  }

  req.admin = {
    id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
  };

  next();
});

export default protect;
