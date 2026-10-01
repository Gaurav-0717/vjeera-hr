import Contact from "../models/Contact.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.validated);

  res.status(201).json({
    success: true,
    message: "Your message has been received",
    data: { id: contact._id },
  });
});
