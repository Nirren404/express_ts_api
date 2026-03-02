import { UserDocument, UserModel } from "../models/user.model";
import { AppError } from "../utils/app.error";
import { pool } from "../config/db";
import bcrypt from "bcrypt";

export interface Users {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (data: Partial<Users>) => {
  const query =
    "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, email, admin, created_at, updated_at";
  const encryptedPassword = await bcrypt.hash(data.password as string, 10);
  const values = [data.firstname, data.lastname, data.email, encryptedPassword];
  const result = await pool.query<Partial<Users>>(query, values);
  if (!result) throw new AppError("Failed to create user", 500);
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query<Partial<Users>>(
    "SELECT id, firstname, lastname, email, admin, created_at, updated_at FROM users",
  );
  console.log(result);
  return result.rows;
};

export const getUserById = async (id: string) => {
  const query =
    "SELECT id, firstname, lastname, email, admin, created_at, updated_at FROM users WHERE id = $1";
  const result = await pool.query<Partial<Users>>(query, [id]);
  if (!result) throw new AppError("User not found", 404);

  return result.rows[0] || null;
};

export const updateById = async (
  id: string,
  updateData: Partial<UserDocument>,
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new AppError("User with the provided ID not found", 404);
  }
  return updatedUser;
};

export const deleteById = async (id: string) => {
  const deleteUser = await UserModel.findByIdAndDelete(id);
  if (!deleteUser) {
    throw new AppError("Couldn't delete it", 404);
  }
  return deleteUser;
};

export const updateUser = async (id: string, updateData: Partial<Users>) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
  const query = `UPDATE users SET ${setClause} WHERE id = ${id} RETURNING id, firstname, lastname, email, admin, created_at, updated_at`;

  const result = await pool.query<Partial<Users>>(query, values);
  if (!result) throw new AppError("Failed to update user", 500);
  return result.rows[0];
};
