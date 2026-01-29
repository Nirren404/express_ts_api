import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user.controller";
import { getUserById, updateById } from "../controllers/user.controller";
import { deleteById } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUservalidation } from "../models/user.model";
import { protect, restrictTo } from "../middleware/auth.middleware";
import * as usercontroller from "../controllers/user.controller";

const router = Router();

router.get("/", protect, restrictTo("admin"), getAllUser);
router.get("/:id", getUserById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);
router.post("/", validate(createUservalidation), createUser);

export default router;
