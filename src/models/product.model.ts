import mongoose from "mongoose";

export interface ProductDocument {
  name: string;
  price: number;
  description?: string;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema,
);
