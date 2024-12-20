import express from "express";
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from "../services/userService.js"; // Importa funciones del controlador

const router = express.Router();

// Crear un usuario
router.post("/", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userObject = { email, username, password };
    await createUser(userObject);
    res.status(200).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    const deletedUser = await deleteUserById(userId); // Busca y elimina el usuario por su ID

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // Respuesta si el usuario no existe
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    const fetchUserById = await getUserById(userId); // Busca y elimina el usuario por su ID

    if (!fetchUserById) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // Respuesta si el usuario no existe
    }

    res.json(fetchUserById);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    const { email, username, password } = req.body;
    const updateUser = {
      email,
      username,
      password,
    };
    const modifyUserById = await updateUserById(userId, updateUser); // Busca y modifica el usuario por su ID

    if (!modifyUserById) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // Respuesta si el usuario no existe
    }

    res.status(200).json({ message: 'Usuario modificado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

export default router;
