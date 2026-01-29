import { ProductDocument, ProductModel } from "../models/product.model";
import { AppError } from "../utils/app.error";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
  category: string;
}

export const createProduct = async (
  name: string,
  price: number,
  stock: number,
  category: string,
  description?: string,
) => {
  const newProduct: ProductDocument = {
    name,
    price,
    description,
    stock,
    category,
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
    throw new AppError("No products found", 404);
  }

  return products;
};

export const findProductById = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const updateProductById = async (
  id: string,
  updateData: Partial<ProductDocument>,
) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedProduct) {
    throw new AppError("Product not found", 404);
  }
  return updatedProduct;
};

export const deleteProductById = async (id: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new AppError("Product not found", 404);
  }
  return deletedProduct;
};
