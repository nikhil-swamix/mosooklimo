import asyncHandler from "express-async-handler";
import Enquiry from "../models/enquiry.js";

const registerEnquiry = asyncHandler(async (req, res) => {
  const { category, msg } = req.body;

  const enquiry = await Enquiry.create({
    category: category,
    msg: msg,
    driverId: req.user._id,
  });

  if (enquiry) {
    res.status(201).json({
      _id: enquiry._id,
      category: enquiry.category,
      msg: enquiry.msg,
      driverId: enquiry.driverId,
      status: enquiry.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid enquiry data");
  }
});

// @desc    Get all airports
// @route   GET /api/airports
// @access  Public
const getEnquirys = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find({});
  res.json(enquiries);
});

// @desc    Get enquiry by ID
// @route   GET /api/airports/:id
// @access  Public
const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (enquiry) {
    res.json(enquiry);
  } else {
    res.status(404);
    throw new Error("Enquiry not found");
  }
});

// @desc    Delete airport
// @route   DELETE /api/airports/:id
// @access  Admin
const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (enquiry) {
    await enquiry.remove();
    res.json({ message: "Enquiry removed" });
  } else {
    res.status(404);
    throw new Error("Enquiry not found");
  }
});

// @desc    Update airport
// @route   PUT /api/airports/:id
// @access  Admin
const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (enquiry) {
    enquiry.status = req.body.status || enquiry.status;
    const updatedEnquiry = await enquiry.save();

    res.json({
      _id: updatedEnquiry._id,
      category: updatedEnquiry.category,
      msg: updatedEnquiry.msg,
      driverId: updatedEnquiry.driverId,
      status: updatedEnquiry.status,
    });
  } else {
    res.status(404);
    throw new Error("Enquiry not found");
  }
});

const getMyEnquiry = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find({ driverId: req.user._id });
  if (enquiries) {
    res.json(enquiries);
  } else {
    res.status(404);
    throw new Error("No Enquiries found");
  }
});
export {
  registerEnquiry,
  getEnquirys,
  getEnquiryById,
  deleteEnquiry,
  updateEnquiry,
  getMyEnquiry,
};
