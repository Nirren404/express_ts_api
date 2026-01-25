import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controllers";
import { getproductById } from "../controllers/product.controllers";
import { UpdateProductById } from "../controllers/product.controllers";
import { validate } from "../middleware/validate.middleware";
import { createProductValidation } from "../schemas/product.schema";
import { deleteProduct } from "../controllers/product.controllers";

const router = Router();

router.post("/", validate(createProductValidation), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getproductById);
router.patch("/:id", validate(createProductValidation), UpdateProductById);
router.delete("/:id", deleteProduct);

export default router;
