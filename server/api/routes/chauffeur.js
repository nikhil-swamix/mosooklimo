import express from "express";
const router = express.Router();

import {
  authChauffeur,
  registerChauffeur,
  getChauffeurProfile,
  updateChauffeurProfile,
  getChauffeurs,
  deleteChauffeur,
  getChauffeurById,
  updateChauffeur,
  getCarBrand,
  getCarByBrand,
  getCarByFilter,
  getActiveCitiesOfChauffeurs,
  getCarByFilterCity,
} from "../controllers/chauffeur.js";
import { protectChauffeur, admin, protect } from "../middlewares/auth.js";
import { lowerCase } from "../middlewares/transformer.js";




router.route("/").post(registerChauffeur).get(protect, admin, getChauffeurs);
router.route("/brands").get(getCarBrand);
router.route("/brands/:brand").get(getCarByBrand);
router.route("/cars/filter").get(lowerCase, getCarByFilter);
router.route("/cars/city/filter").get(lowerCase,getCarByFilterCity);
router.route("/active").get(lowerCase,getActiveCitiesOfChauffeurs);
router.post("/login", authChauffeur);



router
  .route("/profile")
  .get(protectChauffeur, getChauffeurProfile)
  .put(protectChauffeur, updateChauffeurProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteChauffeur)
  .get(protect, admin, getChauffeurById)
  .put(protect, admin, updateChauffeur);

export default router;
