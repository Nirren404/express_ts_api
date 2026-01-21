import { UserDocument, UserModel } from "../models/user.model";

// Creating a new user
export const createUser = async (name: string, email: string, age: number) => {
  const newUser: UserDocument = new UserModel({ name, email, age });
  return await UserModel.create({ name, email, age });
};

// Getting all users matching the criteria
export const getAllUsers = async (name: string, email: string, age: number) => {
  const finduser: UserDocument[] = await UserModel.find({
    name: name,
    email: email,
    age: age,
  });
  return finduser;
};

// Getting a user by ID
export const getUserById = async (id: string) => {
  const getUserId = await UserModel.findById(id);
  return getUserId;
};

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
