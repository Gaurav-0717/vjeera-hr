import { readString } from "../utils/validate.js";

const validateCorporate = (req, res, next) => {
  try {
    req.validated = {
      companyName: readString(req.body, "companyName", { required: true, min: 2, max: 150 }),
      contactName: readString(req.body, "contactName", { required: true, min: 2, max: 100 }),
      email: readString(req.body, "email", { required: true, max: 254, email: true }),
      phone: readString(req.body, "phone", { max: 30 }) || "",
      service: readString(req.body, "service", { max: 150 }) || "",
      employeeCount: readString(req.body, "employeeCount", { max: 50 }) || "",
      message: readString(req.body, "message", { max: 2000 }) || "",
    };
    next();
  } catch (error) {
    next(error);
  }
};

export default validateCorporate;
