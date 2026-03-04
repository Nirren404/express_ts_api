import type { Request, Response } from "express";
import * as userService from "../services/user.services";
import * as orderService from "../services/order.services";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const order = await orderService.createOrder(user_id);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const addItemToOrder = async (req: Request, res: Response) => {
  try {
    const order_id = parseInt(req.params.id as string);
    const { product_id, quantity } = req.body;

    const item = await orderService.addItemToOrder(
      order_id,
      product_id,
      quantity,
    );
    res.status(201).json(item);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const order = await orderService.getOrderById(id);
    res.status(200).json(order);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
