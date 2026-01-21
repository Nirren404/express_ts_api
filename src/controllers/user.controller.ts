import type { Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    const newUser = await userService.createUser(name, email, age);
    res.status(201).json(newUser);
  } catch (error) {}
};
