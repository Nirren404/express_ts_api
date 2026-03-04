import { Request, Response } from "express";
import * as productService from "../services/product.services";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const product = await productService.createproduct(name, price);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
