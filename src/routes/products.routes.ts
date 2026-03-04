import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controller/product.controller";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProducts);

export default router;
