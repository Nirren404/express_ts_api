import type { Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (
  req: Request<{}, {}, userService.Users>,
  res: Response,
) => {
  try {
    const { name, email, age } = req.body;
    const newUser = await userService.createUser(name, email, age);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: "User creation failed", error });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Failed to retrive users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const 
    } catch (error) {
        
    }
}