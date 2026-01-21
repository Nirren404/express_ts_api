import { UserDocument, UserModel } from "../models/user.model";

export interface Users {
  name: string;
  email: string;
  age: number;
}
// Creating a new user
export const createUser = async (name: string, email: string, age: number) => {
  const newUser: UserDocument = new UserModel({ name, email, age });
  return await UserModel.create({ name, email, age });
};

// Getting all users matching the criteria
export const getAllUsers = async () => {
  const users = await UserModel.find();

  if (users.length === 0) {
    throw new Error("No users found");
  }
  return users;
};

// Getting a user by ID
export const getUserById = async (id: string) => {
  const getUserId = await UserModel.findById(id);
  return getUserId;
};

//
export const updateById = async (
  id: string,
  updateData: Partial<UserDocument>,
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedUser;
};

// Create user.service.ts (delete)
export const deleteById = async (id: string) => {
  const deleteduser = await UserModel.findByIdAndDelete(id);
  return deleteduser;
};
