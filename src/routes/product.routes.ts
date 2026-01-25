import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controllers";
import { getproductById } from "../controllers/product.controllers";
import { UpdateProductById } from "../controllers/product.controllers";
import { validate } from "../middleware/validate.middleware";
import { ProductRulesValidation } from "../schemas/product.schema";
import { deleteProduct } from "../controllers/product.controllers";

const router = Router();

router.post("/", validate(ProductRulesValidation), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getproductById);
router.patch("/:id", validate(ProductRulesValidation), UpdateProductById);
router.delete("/:id", deleteProduct);

export default router;
