import { z } from "zod";
import de from "zod/v4/locales/de.js";

export const createProductValidation = z.object({
  body: z.object({
    name: z.string().min(3, "Name cannot be less than 3 characters"),
    price: z.number().positive("Price must be a greater than zero"),
    description: z.string().optional(),
    stock: z.number().int().nonnegative("Stock cannot be negative"),
    category: z.string().min(3, "Category cannot be less than 3 characters"),
  }),
});

export type CreateProductTypeZ = z.infer<
  typeof createProductValidation
>["body"];
