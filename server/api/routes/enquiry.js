import express from "express";
const router = express.Router();

import {
  registerEnquiry,
  getEnquirys,
  getEnquiryById,
  deleteEnquiry,
  updateEnquiry,
  getMyEnquiry,
} from "../controllers/enquiry.js";

import { protect, admin, protectChauffeur } from "../middlewares/auth.js";

router
  .route("/")
  .post(protectChauffeur, registerEnquiry)
  .get(protect, admin, getEnquirys);

router
  .route("/:id")
  .delete(protect, admin, deleteEnquiry)
  .get(getEnquiryById)
  .put(protect, admin, updateEnquiry);

router.route("/chauffeur/enquiries").get(protectChauffeur, getMyEnquiry);

export default router;
