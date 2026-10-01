import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
  if (!process.env.JWT_SECRET) {
    throw new AppError("Server authentication is not configured", 500);
  }

  const { email, password } = req.validated;
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new AppError("Invalid email or password", 401);
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "8h" },
  );

  res.json({
    success: true,
    message: "Login successful",
    data: {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    },
  });
});
