import express from "express";
import * as controller from "../controllers/admin.js";
import { protect, admin } from "../middlewares/auth.js";

const router = express.Router();
// router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", controller.authUser);

router
  .route("/profile")
  .get(protect, admin, controller.getUserProfile)
  .put(protect, admin, controller.updateUserProfile);
// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);

export default router;
