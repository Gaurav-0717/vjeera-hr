import mongoose from "mongoose";
import AppError from "./AppError.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readString(body, field, options = {}) {
  const {
    required = false,
    min = 0,
    max = 500,
    email = false,
  } = options;

  const raw = body[field];

  if (raw === undefined || raw === null) {
    if (required) {
      throw new AppError(`${field} is required`, 400);
    }
    return undefined;
  }

  if (typeof raw !== "string") {
    throw new AppError(`${field} must be a string`, 400);
  }

  const value = raw.trim();

  if (!value) {
    if (required) {
      throw new AppError(`${field} is required`, 400);
    }
    return "";
  }

  if (value.length < min) {
    throw new AppError(`${field} is too short`, 400);
  }

  if (value.length > max) {
    throw new AppError(`${field} exceeds the maximum length of ${max}`, 400);
  }

  if (email && !EMAIL_RE.test(value)) {
    throw new AppError("Please provide a valid email address", 400);
  }

  return value;
}

export function requireObjectId(value, field = "id") {
  if (!value || !mongoose.Types.ObjectId.isValid(value)) {
    throw new AppError(`Invalid ${field}`, 400);
  }
  return value;
}

export function optionalEnum(value, allowed, field) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  if (typeof value !== "string" || !allowed.includes(value)) {
    throw new AppError(`Invalid ${field}`, 400);
  }
  return value;
}

export function optionalBoolean(value, field) {
  if (value === undefined) return undefined;
  if (typeof value !== "boolean") {
    throw new AppError(`${field} must be a boolean`, 400);
  }
  return value;
}

export function optionalStringArray(value, field, maxItems = 30, maxLen = 200) {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    throw new AppError(`${field} must be an array`, 400);
  }
  if (value.length > maxItems) {
    throw new AppError(`${field} has too many items`, 400);
  }
  return value.map((item) => {
    if (typeof item !== "string") {
      throw new AppError(`${field} items must be strings`, 400);
    }
    const trimmed = item.trim();
    if (!trimmed || trimmed.length > maxLen) {
      throw new AppError(`Invalid ${field} item`, 400);
    }
    return trimmed;
  });
}
