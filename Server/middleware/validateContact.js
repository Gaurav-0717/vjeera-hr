import { readString } from "../utils/validate.js";

const validateContact = (req, res, next) => {
  try {
    req.validated = {
      name: readString(req.body, "name", { required: true, min: 2, max: 100 }),
      email: readString(req.body, "email", { required: true, max: 254, email: true }),
      phone: readString(req.body, "phone", { max: 30 }) || "",
      subject: readString(req.body, "subject", { max: 150 }) || "",
      message: readString(req.body, "message", { max: 2000 }) || "",
    };
    next();
  } catch (error) {
    next(error);
  }
};

export default validateContact;
