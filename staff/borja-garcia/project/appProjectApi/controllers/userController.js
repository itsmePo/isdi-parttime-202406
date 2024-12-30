import express from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
  authUser
} from "../services/userService.js"; // Importa funciones del controlador
import jwt from "jsonwebtoken";

const router = express.Router();

// Crear un usuario
router.post("/", async (req, res) => {
  try {
    const userObject = { 
      email: req.body.email, 
      username: req.body.username,
      pwd: req.body.password,
      repeatPwd: req.body.repeatPassword
    };
    await createUser(userObject);
    res.status(200).json({ message: "Usuario creado correctamente" });
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

router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    const deletedUser = await deleteUserById(userId); // Busca y elimina el usuario por su ID

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" }); // Respuesta si el usuario no existe
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    const fetchUserById = await getUserById(userId); // Busca y elimina el usuario por su ID

    if (!fetchUserById) {
      return res.status(404).json({ message: "Usuario no encontrado" }); // Respuesta si el usuario no existe
    }

    res.json(fetchUserById);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

router.put("/:userId", async (req, res) => {
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
      return res.status(404).json({ message: "Usuario no encontrado" }); // Respuesta si el usuario no existe
    }

    res.status(200).json({ message: "Usuario modificado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

router.post("/auth", async (req, res) => {
  try {
    const user = await authUser(req.body.email, req.body.password);
    if (!user || user.length === 0) {
      return res
        .status(404)
        .json({ message: "Credentials error" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
