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
import { userResponse } from "../responses/userResponse.js";

const router = express.Router();

// Crear un usuario
router.post("/", async (req, res, next) => {
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
    next(error)
}
});

// Obtener todos los usuarios
router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(userResponse(users));
  } catch (error) {
    next(error)  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    await deleteUserById(userId); // Busca y elimina el usuario por su ID

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error)  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    const fetchUserById = await getUserById(userId); // Busca y elimina el usuario por su ID

    res.json(userResponse(fetchUserById));
  } catch (error) {
    next(error)  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    const { email, username, password } = req.body;
    const updateUser = {
      email,
      username,
      password,
    };
    await updateUserById(userId, updateUser); // Busca y modifica el usuario por su ID
    res.status(200).json({ message: "Usuario modificado correctamente" });
  } catch (error) {
    next(error)  }
});

router.post("/auth", async (req, res, next) => {
  try {
    const user = await authUser(req.body.email, req.body.password);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token: token });
  } catch (error) {
    next(error)  }
});

export default router;
