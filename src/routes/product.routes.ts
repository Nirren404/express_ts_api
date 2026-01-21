import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controllers";
import { getproductById } from "../controllers/product.controllers";
import { editProduct } from "../controllers/product.controllers";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getproductById);

router.post("/", createProduct);

router.patch("/:id", editProduct);

export default router;
