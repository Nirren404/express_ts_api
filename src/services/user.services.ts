import { AppError } from "../utils/app.error";
import { pool } from "../config/db";

export interface Users {
  id: number;
  name: string;
  email: string;
}

export const createUser = async (name: string, email: string) => {
  if (!name || !email) {
    throw new AppError("Name and email are required", 400);
  }
  try {
    const { rows } = await pool.query<Users>(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email],
    );
    return rows[0];
  } catch (error: any) {
    throw new AppError("Failed to create user", 500);
  }
};

export const getAllUsers = async (): Promise<Users[]> => {
  try {
    const { rows } = await pool.query<Users>(
      "SELECT id, name, email FROM users",
    );
    return rows;
  } catch (error: any) {
    throw new AppError("Failed to fetch users", 500);
  }
};

export const getUserById = async (id: number): Promise<Users> => {
  try {
    const { rows } = await pool.query<Users>(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id],
    );
    if (!rows[0]) throw new AppError("User not found", 404);
    return rows[0];
  } catch (error: any) {
    throw new AppError("Failed to fetch user", 500);
  }
};

export const updateUser = async (
  id: number,
  updateData: Partial<Users>,
): Promise<Users> => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  if (fields.length === 0) {
    const { rows } = await pool.query<Users>(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id],
    );
    if (!rows[0]) throw new AppError("User not found", 404);
    return rows[0];
  }

  const setClause = fields
    .map((field, index) => "${field} = $${index + 1}")
    .join(", ");

  const query =
    "UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING id, name, email";
  const result = await pool.query<Users>(query, [...values, id]);

  if (!result.rows[0]) throw new AppError("User not found", 404);
  return result.rows[0];
};

export const deleteById = async (id: number): Promise<Users> => {
  try {
    const { rows } = await pool.query<Users>(
      "DELETE FROM users WHERE id = $1 RETURNING id, name, email",
      [id],
    );
    if (!rows[0]) throw new AppError("User not found", 404);
    return rows[0];
  } catch (error: any) {
    throw new AppError("Failed to delete user", 500);
  }
};
