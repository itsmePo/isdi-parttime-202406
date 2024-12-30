import User from "../models/users.js";
import bcrypt from 'bcrypt';

// Crear un usuario
export const createUser = async (userObject) => {
  // Comparar las contraseñas en texto plano antes de cifrarlas
  if (userObject.pwd !== userObject.repeatPwd) {
    throw new Error("Las contraseñas no coinciden, torpe");
  }

  // Cifrar la contraseña solo después de la validación
  const hashedPwd = await bcrypt.hash(userObject.pwd, 10);

  // Crear el objeto userData con la contraseña cifrada
  const userData = {
    username: userObject.username,
    email: userObject.email,
    password: hashedPwd,
  };

  // Guardar el usuario en la base de datos
  const user = new User(userData);
  return await user.save();
};

// Obtener todos los usuarios
export const getUsers = async () => {
  return await User.find();
};

export const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

export const updateUserById = async (userId, updatedUser) => {
  return await User.findByIdAndUpdate(userId, updatedUser, { new: true });
};

export const getUserById = async (userId) => {
  return await User.findById(userId);
};

export const saveUserContact = async (user, contact) => {
  user.contacts = user.contacts || []; // Comprobar para que tenga sentido
  user.contacts.push(contact._id); // Asegúrate de que el esquema del usuario tenga el campo `contacts`
  await user.save();
};

export const saveUserEvent = async (user, event) => {
  user.events = user.events || []; // Comprobar para que tenga sentido
  user.events.push(event._id); // Asegúrate de que el esquema del usuario tenga el campo `contacts`
  await user.save();
};

////////////// Gestión de autentificación y Contraseñas (cifrados) //////////////

export const authUser = async (email, pwd) => {

  const user = await User.findOne({ email });
  if (!user || !(await isPasswordValid(pwd, user.password))) {
    throw new Error("Credenciales incorrectas");
  }
  return user;
};

export const isPasswordValid = async (pwd, hashedPwd) => {
  return await bcrypt.compare(pwd, hashedPwd);
}