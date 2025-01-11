import User from "../models/users.js";
import bcrypt from 'bcrypt';
import { Errors } from "../errors";

// Crear un usuario
export const createUser = async (userObject) => {
  // Comparar las contraseñas en texto plano antes de cifrarlas
  if (userObject.pwd !== userObject.repeatPwd) {
  throw new Errors.PasswordNotValidError('Las contraseñas no coinciden');
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
  const savedUser = await user.save();
  if(!savedUser) {
    throw new Errors.SaveError('No se ha podido guardar el usuario');
  }
  return savedUser;
};

// Obtener todos los usuarios
export const getUsers = async () => {
  const usersFound = await User.find();
  if(!usersFound || usersFound.length === 0) {
    throw new Errors.NotFoundError('No se han encontrado usuarios');
  }  
  return usersFound;
};

export const deleteUserById = async (userId) => {
  const deleteUser = await User.findByIdAndDelete(userId);
  if(!deleteUser) {
    throw new Errors.DeleteError('No se ha podido eliminar el usuario');
  }
  return deleteUser;
};

export const updateUserById = async (userId, updatedUser) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
  if(!updatedUser) {
    throw new Errors.UpdateError('No se ha podido actualizar el usuario');
  }
  return updatedUser;
};

export const getUserById = async (userId) => {
  const foundUser = await User.findById(userId);
  if(!foundUser) {
    throw new Errors.NotFoundError('No se ha encontrado el usuario');
  }
  return foundUser;
};

export const saveUserContact = async (user, contact) => {
  user.contacts = user.contacts || []; // Comprobar para que tenga sentido
  user.contacts.push(contact._id); // Asegúrate de que el esquema del usuario tenga el campo `contacts`
  const savedUser = await user.save();
  if(!savedUser) {
    throw new Errors.SaveError('No se ha podido vincular el contacto al usuario');
  }
  return savedUser;
};

export const saveUserEvent = async (user, event) => {
  user.events = user.events || []; // Comprobar para que tenga sentido
  user.events.push(event._id); // Asegúrate de que el esquema del usuario tenga el campo `contacts`
  const savedUser = await user.save();
  if(!savedUser) {
    throw new Errors.SaveError('No se ha podido vincular el evento al usuario');
  }
  return savedUser;
};

////////////// Gestión de autentificación y Contraseñas (cifrados) //////////////

export const authUser = async (email, pwd) => {

  const user = await User.findOne({ email });
  if (!user || !(await isPasswordValid(pwd, user.password))) {
    throw new Errors.CredentialsError("Credenciales incorrectas");
  }
  return user;
};

export const isPasswordValid = async (pwd, hashedPwd) => {
  return await bcrypt.compare(pwd, hashedPwd);
}