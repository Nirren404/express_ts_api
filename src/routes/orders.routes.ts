import { Router } from "express";
import {
  createOrder,
  addItemToOrder,
  getOrderById,
} from "../controller/order.controller";

const router = Router();

router.post("/", createOrder);
router.post("/:id/items", addItemToOrder);
router.get("/:id", getOrderById);

export default router;
