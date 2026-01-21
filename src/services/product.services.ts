import { ProductDocument, ProductModel } from "../models/product.model";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export const createProduct = async (name: string, price: number) => {
  const existingProduct = await ProductModel.findOne({ name });
  if (existingProduct) {
    throw new Error("Product with this name already exists");
  }
  const newProduct: ProductDocument = {
    name,
    price,
  };
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

export const editExistingProduct = async (
  id: string,
  updateData: ProductDocument,
) => {
  const updatedProduct = await editProduct(id, updateData);
  return updatedProduct;
};
const editProduct = async (id: string, updateData: ProductDocument) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedProduct;
};
