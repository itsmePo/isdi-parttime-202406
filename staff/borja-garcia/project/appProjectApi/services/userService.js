import User from "../models/users.js";

// Crear un usuario
export const createUser = async (userObject) => {
  const user = new User(userObject);
  return await user.save();
};

// Obtener todos los usuarios
export const getUsers = async () => {
  return await User.find();
};

export const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
}

export const updateUserById = async (userId, updatedUser) => {
  return await User.findByIdAndUpdate(userId, updatedUser, { new: true });
}

export const getUserById = async (userId) => {
  return await User.findById(userId);
}
