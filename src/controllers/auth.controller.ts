import { Request, Response, NextFunction } from "express";
import { registerUserService } from "../services/auth.service";
import { loginUserService } from "../services/auth.service";
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, age, email, password } = req.body;

  try {
    const newUser = await registerUserService({ name, email, age, password });
    res
      .status(201)
      .json({ message: "Account created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const user = await loginUserService({ email, password });
    res.status(201).json({ message: "Logged in successfully", user });
  } catch (error) {
    next(error);
  }
};
