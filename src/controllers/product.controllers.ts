import type { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.services";
import { CreateProductTypeZ } from "../schemas/product.schema";

export const createProduct = async (
  req: Request<{}, {}, CreateProductTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const newProduct = await productService.createProduct(
      name,
      price,
      stock,
      category,
      description,
    );
    res
      .status(201)
      .json({ status: "Product created successfully", data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getproductById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productById = await productService.findProductById(req.params.id);
    res.status(200).json(productById);
  } catch (error) {
    next(error);
  }
};

export const UpdateProductById = async (
  req: Request<{ id: string }, {}, Partial<CreateProductTypeZ>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedProduct = await productService.updateProductById(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await productService.deleteProductById(req.params.id);
    res.status(200).json({ status: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
