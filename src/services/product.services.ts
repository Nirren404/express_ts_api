import { ProductDocument, ProductModel } from "../models/product.model";
import { AppError } from "../utils/app.error";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export const createProduct = async (
  name: string,
  price: number,
  description?: string,
) => {
  const newProduct: ProductDocument = {
    name,
    price,
    description,
  };
  const existingProduct = await ProductModel.findOne({ name });
  if (existingProduct) {
    throw new AppError("Product with this name already exists", 409);
  }
  const createdProduct = await ProductModel.create(newProduct);
  return createdProduct;
};

export const findAllProducts = async () => {
  const products = await ProductModel.find();

  if (products.length === 0) {
    return {
      message: "no products found sorry.",
    };
  }

  return products;
};

export const editProduct = async (id: string, updateData: ProductDocument) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedProduct;
};
