import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/user.controller";

const router = Router();

// CREATE USER
router.post("/", createUser);

// READ ALL USERS
router.get("/", getAllUsers);

// READ USER BY ID
router.get("/:id", getUserById);

// UPDATE USER
router.patch("/:id", updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

export default router;
