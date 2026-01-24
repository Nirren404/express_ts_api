import { z } from "zod";
import de from "zod/v4/locales/de.js";

export const createProductValidation = z.object({
  body: z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    description: z.string().optional(),
  }),
});

// 2 - Infer a Type From the Schema Use z.infer to create a TypeScript type from your schema. Use that type in your controller so: req.body is typed No manual interfaces are written TypeScript stays in sync with validation 📍 Location: src/schemas/product.schema.ts
export type CreateProductTypeZ = z.infer<
  typeof createProductValidation
>["body"];
