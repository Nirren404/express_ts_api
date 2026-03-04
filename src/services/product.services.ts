import { pool } from "../config/db";
import { AppError } from "../utils/app.error";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export const createproduct = async (name: string, price: number) => {
  try {
    const { rows } = await pool.query<Product>(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price",
      [name, price],
    );
    return rows[0];
  } catch (error: any) {
    throw new AppError("Failed to create product", 500);
  }
};

export const getAllProducts = async () => {
  const { rows } = await pool.query<Product>(
    "SELECT id, name, price FROM products",
  );
  return rows;
};
