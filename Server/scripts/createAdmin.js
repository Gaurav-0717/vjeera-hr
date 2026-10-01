import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const run = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  if (!email || !password) {
    console.error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD in Server/.env, then run: npm run create-admin",
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("ADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("An admin with that email already exists. No changes made.");
    await mongoose.disconnect();
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 12);
  await Admin.create({ email, password: hashed, role: "admin" });
  console.log("Admin created. You can now sign in at /admin/login");
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("Admin creation failed:", error.message);
  process.exit(1);
});
