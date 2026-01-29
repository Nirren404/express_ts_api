import mongoose from "mongoose";
import { z } from "zod";

export type UserRole = "admin" | "user";

export interface UserDocument {
  id: string;
  name: string;
  email: string;
  age: number;
  password: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  role?: UserRole;
}

export const createUservalidation = z.object({
  body: z.object({
    name: z.string("Please enter a valid name").min(2),
    email: z.email("Please enter a valid email"),
    age: z.number("Please enter a valid age").min(0).max(122),
  }),
});

export const registerUservalidation = createUservalidation.extend({
  body: createUservalidation.shape.body.extend({
    password: z.string("Please enter a valid password").min(8),
  }),
});

export const loginUservalidation = z.object({
  body: z.object({
    email: z.email("Please enter a valid email"),
    password: z.string("Please enter a valid password").min(8),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUservalidation>["body"];
export type RegisterUserTypeZ = z.infer<typeof registerUservalidation>["body"];
export type LoginUserTypeZ = z.infer<typeof loginUservalidation>["body"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, max: 122, min: 0, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true },
);

export interface UserDocument extends Document {
  email: string;
  role: UserRole;
}

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
