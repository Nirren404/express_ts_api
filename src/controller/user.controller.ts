import type { Request, Response } from "express";
import * as userService from "../services/user.services";

// CREATE USER
export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newUser = await userService.createUser(data.name, data.email);
    res.status(201).json(newUser);
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Failed to create user!" });
  }
};

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Failed to fetch users" });
  }
};

// GET USER BY ID
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Failed to fetch user" });
  }
};

// UPDATE USER
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const updateData = req.body;
    const updatedUser = await userService.updateUser(id, updateData);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Failed to update user" });
  }
};

// DELETE USER
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await userService.deleteById(id);
    res.status(200).json({ msg: "User deleted successfully", deletedUser });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Failed to delete user" });
  }
};
