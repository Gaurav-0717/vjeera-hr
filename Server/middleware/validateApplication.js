import { readString, requireObjectId } from "../utils/validate.js";

const validateApplication = (req, res, next) => {
  try {
    req.validated = {
      job: requireObjectId(req.body.job, "job"),
      name: readString(req.body, "name", { required: true, min: 2, max: 100 }),
      email: readString(req.body, "email", { required: true, max: 254, email: true }),
      phone: readString(req.body, "phone", { max: 30 }) || "",
      coverLetter: readString(req.body, "coverLetter", { max: 4000 }) || "",
    };
    next();
  } catch (error) {
    next(error);
  }
};

export default validateApplication;
