import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controllers";
import { getproductById } from "../controllers/product.controllers";
import { UpdateProductById } from "../controllers/product.controllers";
import { validate } from "../middleware/validate";
import { createProductValidation } from "../schemas/product.schema";

const router = Router();

// 3 - Apply Validation as Middleware Attach your validation schema to the route before the controller runs. Route → Validation Middleware → Controller → Service → Database 📍 Location: src/schemas/product.route.ts
router.post("/", validate(createProductValidation), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getproductById);
router.patch("/:id", UpdateProductById);

export default router;
