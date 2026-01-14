import { Router } from "express";
import { getProducts } from "../controllers/product.controllers";
import { getproductById } from "../controllers/product.controllers";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getproductById);

export default router;
