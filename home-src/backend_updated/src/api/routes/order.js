import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  updateOrderAssign,
  getOrderByPhone,
  deleteOrder,
  updateOrderToCash,
} from "../controllers/order.js";
import { protect, admin, protectChauffeur } from "../middlewares/auth.js";

router.route("/").post(addOrderItems).get(protect, admin, getOrders);
router
  .route("/:id")
  .get(getOrderById)
  .put(protect, admin, updateOrderStatus)
  .delete(protect, admin, deleteOrder);
router.route("/assign/:id").put(protect, admin, updateOrderAssign);

router.route("/chauffeur/orders").get(protectChauffeur, getMyOrders);
router.route("/track/:phone").get(getOrderByPhone);

router.route("/pay/:id").put(updateOrderToPaid);
router.route("/cash/:id").put(updateOrderToCash);

export default router;
