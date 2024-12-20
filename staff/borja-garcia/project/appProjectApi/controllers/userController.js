import User from "../models/newUser.js";

// Crear un usuario
export const createUser = async (email, username, password) => {
  const user = new User({ email, username, password });
  return await user.save();
};

// Obtener todos los usuarios
export const getUsers = async () => {
  return await User.find();
};
