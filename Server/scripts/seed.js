import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import Course from "../models/Course.js";
import Job from "../models/Job.js";
import { seedCourses, seedJobs } from "./seedData.js";

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
      "Set ADMIN_EMAIL and ADMIN_PASSWORD in Server/.env before running the seed.",
    );
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const existingAdmin = await Admin.findOne({ email });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await Admin.create({ email, password: hashedPassword, role: "admin" });
    console.log(`Seeded admin: ${email}`);
  } else {
    console.log(`Admin already exists: ${email}`);
  }

  for (const course of seedCourses) {
    await Course.findOneAndUpdate({ title: course.title }, course, {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    });
  }

  for (const job of seedJobs) {
    await Job.findOneAndUpdate({ title: job.title }, job, {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    });
  }

  console.log(
    `Seed complete: ${seedCourses.length} courses, ${seedJobs.length} jobs (upserted by title).`,
  );
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
