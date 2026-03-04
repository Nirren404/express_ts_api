import mongoose from "mongoose";
import { z } from "zod";

export type UserRole = "admin" | "user";

export interface UserDocument {
  id: string;
  name: string;
  email: string;
}

export const createUserValidation = z.object({
  body: z.object({
    name: z.string("Please enter a valid name").min(2),
    email: z.email("Please enter a valid email"),
  }),
});

export const registerUserValidation = createUserValidation.extend({
  body: createUserValidation.shape.body.extend({
    password: z.string("Please enter a valid password").min(8),
  }),
});

export const loginUserValidation = z.object({
  body: z.object({
    email: z.email("Please enter a valid email..."),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];
export type RegisterUserTypeZ = z.infer<typeof registerUserValidation>["body"];
export type LoginUserTypeZ = z.infer<typeof loginUserValidation>["body"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
