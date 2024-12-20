import express from "express";
import { createUser, getUsers } from "../controllers/userController.js"; // Importa funciones del controlador

const router = express.Router();

// Crear un usuario
router.post("/", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await createUser(email, username, password);
    res.status(201).json(user);
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

export default router;
