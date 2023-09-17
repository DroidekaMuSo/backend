import { Router } from "express";
import {
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
  updateOrderById,
} from "../controllers/order.controller.js";

const router = Router();

router.get("/", getOrders);
router.get("/:orderId", getOrderById);
router.post("/", createOrder);
router.put("/:orderId", updateOrderById);
router.delete("/:orderId", deleteOrderById);

export default router;
