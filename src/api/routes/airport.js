import express from "express";
const router = express.Router();

import {
  registerAirport,
  getAirports,
  getAirportById,
  deleteAirport,
  updateAirport,
} from "../controllers/airport.js";

import { protect, admin } from "../middlewares/auth.js";

router.route("/").post(protect, admin, registerAirport).get(getAirports);

router
  .route("/:id")
  .delete(protect, admin, deleteAirport)
  .get(getAirportById)
  .put(protect, admin, updateAirport);

export default router;
