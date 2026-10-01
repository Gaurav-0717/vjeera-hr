import { readString } from "../utils/validate.js";

const validateLogin = (req, res, next) => {
  try {
    req.validated = {
      email: readString(req.body, "email", { required: true, max: 254, email: true }),
      password: readString(req.body, "password", { required: true, min: 8, max: 128 }),
    };
    next();
  } catch (error) {
    next(error);
  }
};

export default validateLogin;
