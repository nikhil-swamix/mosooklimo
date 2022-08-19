import express from "express";
const router = express.Router();

import {
  registerFirst,
  getStaticData,
  updateStaticData,
} from "../controllers/static.js";

import { protect, admin } from "../middlewares/auth.js";

router.route("/").post(protect, admin, registerFirst).get(getStaticData);

router.route("/:id").put(protect, admin, updateStaticData);

export default router;
