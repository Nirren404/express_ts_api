import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createUservalidation } from "../models/user.model";
import { protect, restrictTo } from "../middleware/auth.middleware";
import * as usercontroller from "../controllers/user.controller";

const router = Router();

router.get("/", protect, restrictTo("admin"), usercontroller.getAllUser);
router.get("/:id", protect, restrictTo("admin"), usercontroller.getUserById);
router.patch("/:id", protect, restrictTo("admin"), usercontroller.updateById);
router.delete("/:id", protect, restrictTo("admin"), usercontroller.deleteById);
router.post(
  "/",
  validate(createUservalidation),
  protect,
  restrictTo("admin"),
  usercontroller.createUser,
);

export default router;
