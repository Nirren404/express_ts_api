import { pool } from "../config/db";
import { AppError } from "../utils/app.error";

export const createOrder = async (user_id: number) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO orders (user_id) VALUES ($1) RETURNING id, user_id, created_at",
      [user_id],
    );
    return rows[0];
  } catch (error: any) {
    throw new AppError("Invalid user_id", 400);
  }
};

export const addItemToOrder = async (
  order_id: number,
  product_id: number,
  quantity: number,
) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING order_id, product_id, quantity",
      [order_id, product_id, quantity],
    );
    return rows[0];
  } catch (error: any) {
    throw new AppError("Invalid order or product", 400);
  }
};

export const getOrderById = async (id: number) => {
  const query = `
    SELECT 
      o.id AS order_id,
      u.id AS user_id,
      u.name AS user_name,
      p.id AS product_id,
      p.name AS product_name,
      oi.quantity
    FROM orders o
    JOIN users u ON o.user_id = u.id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.id = $1
  `;

  const { rows } = await pool.query(query, [id]);

  if (rows.length === 0) {
    throw new AppError("Order not found", 404);
  }

  return {
    id: rows[0].order_id,
    user: {
      id: rows[0].user_id,
      name: rows[0].user_name,
    },
    products: rows.map((row) => ({
      id: row.product_id,
      name: row.product_name,
      quantity: row.quantity,
    })),
  };
};
