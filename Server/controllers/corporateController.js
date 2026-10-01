import CorporateEnquiry from "../models/CorporateEnquiry.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCorporateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await CorporateEnquiry.create(req.validated);

  res.status(201).json({
    success: true,
    message: "Corporate enquiry submitted",
    data: { id: enquiry._id },
  });
});
