import express from "express";
import {
  createContact,
  deleteContactById,
  getContactById,
  getContacts,
  getContactsByUserId,
  updateContactById,
} from "../services/contactService.js";
import { getUserById, saveUserContact } from "../services/userService.js";
const router = express.Router();

// Ruta para agregar un contacto de emergencia vinculado a un usuario
router.post("/users/:userId", async (req, res) => {
  try {
    const contactData = {
      contactName: req.body.contactName,
      phone: req.body.phone,
      relationship: req.body.relationship,
    };
    // Verificar que el usuario exista
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Crear el contacto de emergencia
    const contact = await createContact(user, contactData);
    await saveUserContact(user, contact);

    res.status(201).json({ message: "Contacto de emergencia creado" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el contacto de emergencia" });
  }
});

// Ruta para obtener un teléfono de emergencia por ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await getContactById(req.params.id); // Busca por ID
    if (!contact) {
      return res.status(404).json({
        message: "No existen contactos de emergencia para este usuario",
      });
    }
    res.status(200).json(contact);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el contacto de emergencia" });
  }
});

// Ruta para obtener todos los teléfonos de emergencia
router.get("/", async (req, res) => {
  try {
    const contacts = await getContacts(); // Recupera todos los teléfonos
    if (!contacts || contacts.length === 0) {
      return res
        .status(404)
        .json({ message: "No existen contactos de emergencia" });
    }
    res.status(200).json(contacts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los teléfonos de emergencia" });
  }
});
//Contactos de emergencia por userId
router.get("/users/:userId", async (req, res) => {
  try {
    const user = await getUserById(req.params.userId); // Busca por ID
    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    const contacts = await getContactsByUserId(req.params.userId);
    if (contacts.length === 0) {
      return res.status(404).json({
        message: "No existen contactos de emergencia para este usuario",
      });
    }
    res.status(200).json(contacts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener el contacto de emergencia" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await deleteContactById(req.params.id); // Busca y elimina el contacto por su ID

    if (!deletedContact) {
      return res.status(404).json({ message: "Contacto no encontrado" }); // Respuesta si el contacto no existe
    }

    res.status(200).json({ message: "Contacto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});
// Ruta para actualizar un contacto de emergencia
router.put("/:id", async (req, res) => {
  try {
    const contactData = {
      contactName: req.body.contactName,
      phone: req.body.phone,
      relationship: req.body.relationship,
    };
    const updatedContact = await updateContactById(req.params.id, contactData);

    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: "Contacto de emergencia no encontrado" });
    }

    res.status(200).json({ message: "Contacto de emergencia actualizado" });
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el contacto de emergencia",
      error: err.message,
    });
  }
});

export default router;
