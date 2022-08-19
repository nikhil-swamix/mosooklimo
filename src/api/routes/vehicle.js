import express from "express";
const router = express.Router();

import {
  registerVehicle,
  getVehicles,
  getVehicleById,
  deleteVehicle,
  updateVehicle,
  getVehicleByCountry,
  getVehicleByState,
  getVehicleByCity,
} from "../controllers/vehicle.js";

import { protect, admin } from "../middlewares/auth.js";

router.route("/").post(protect, admin, registerVehicle).get(getVehicles);

router.route("/country/:country").get(getVehicleByCountry);
router.route("/state/:state").get(getVehicleByState);
router.route("/city/:city").get(getVehicleByCity);

router
  .route("/:id")
  .delete(protect, admin, deleteVehicle)
  .get(getVehicleById)
  .put(protect, admin, updateVehicle);

export default router;
