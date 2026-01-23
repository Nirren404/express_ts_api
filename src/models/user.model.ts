import mongoose from "mongoose";
import { z } from "zod";

export interface UserDocument {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export const createUservalidation = z.object({
  body: z.object({
    name: z.string("Please enter a valid name").min(2),
    email: z.email("Please enter a valid email"),
    age: z.number("Please enter a valid age").min(0).max(122),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUservalidation>["body"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, max: 122, min: 0, required: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
