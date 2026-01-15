import type { Request, Response } from "express";

export const getProducts = (req: Request, res: Response) => {
  const products = [
    { id: 1, name: "Apple", price: 100 },
    { id: 2, name: "Pineapple", price: 150 },
  ];

  res.status(200).json(products);
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;

  res.status(201).json({ message: "Product created", data: { name, price } });
};

export const getproductById = (req: Request, res: Response) => {
  const productid = req.params.id;

  res.json({ id: productid });
};
