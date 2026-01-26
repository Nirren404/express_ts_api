import {
  LoginUserTypeZ,
  RegisterUserTypeZ,
  UserModel,
} from "../models/user.model";
import bcrypt from "bcrypt";
import { AppError } from "../utils/app.error";
import Jwt, { SignOptions } from "jsonwebtoken";

export const registerUserService = async (userData: RegisterUserTypeZ) => {
  const { age, name, email, password } = userData;

  // registration logic here -password.
  const hashedpassword = await bcrypt.hash(password, 11);

  const newUser = {
    name,
    email,
    age,
    password: hashedpassword,
  };
  const createdUser = await UserModel.create(newUser);
  return createdUser;
};

export const loginUserService = async (userCredentials: LoginUserTypeZ) => {
  const { email, password } = userCredentials;
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const ispasswordValid = await bcrypt.compare(password, user.password!);

  if (!ispasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new AppError("Your JWT secret not set", 500);
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN ??
    "1d") as SignOptions["expiresIn"];

  const token = Jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn,
  });

  user.password = undefined;

  return { user, token };
};
