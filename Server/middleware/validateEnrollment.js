import { readString, requireObjectId } from "../utils/validate.js";

const validateEnrollment = (req, res, next) => {
  try {
    req.validated = {
      course: requireObjectId(req.body.course, "course"),
      name: readString(req.body, "name", { required: true, min: 2, max: 100 }),
      email: readString(req.body, "email", { required: true, max: 254, email: true }),
      phone: readString(req.body, "phone", { max: 30 }) || "",
      message: readString(req.body, "message", { max: 2000 }) || "",
    };
    next();
  } catch (error) {
    next(error);
  }
};

export default validateEnrollment;
