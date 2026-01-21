import type { Request, Response } from "express";
import * as productService from "../services/product.services";

export const createProduct = async (
  req: Request<{}, {}, productService.Product>,
  res: Response,
) => {
  try {
    const { name, price } = req.body;
    const newProduct = await productService.createProduct(name, price);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve products",
      error,
    });
  }
};

export const getproductById = (req: Request, res: Response) => {
  const productid = req.params.id;

  res.json({ id: productid });
};

export const editProduct = async (
  req: Request<{ id: string }, {}, productService.Product>,
  res: Response,
) => {
  const changeProduct = await productService.editExistingProduct(
    req.params.id,
    req.body,
  );
  res.status(200).json(changeProduct);
};
