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
router.post("/users/:userId", async (req, res, next) => {
  try {
    const contactData = {
      contactName: req.body.contactName,
      phone: req.body.phone,
      relationship: req.body.relationship,
    };
    // Verificar que el usuario exista
    const user = await getUserById(req.params.userId);
    // Crear el contacto de emergencia
    const contact = await createContact(user, contactData);
    await saveUserContact(user, contact);

    res.status(201).json({ message: "Contacto de emergencia creado" });
  } catch (error) {
    next(error)
  }
});

// Ruta para obtener un teléfono de emergencia por ID
router.get("/:id", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id); // Busca por ID
    res.status(200).json(contact);
  } catch (error) {
    next(error)
  }
});

// Ruta para obtener todos los teléfonos de emergencia
router.get("/", async (req, res, next) => {
  try {
    const contacts = await getContacts(); // Recupera todos los teléfonos
    res.status(200).json(contacts);
  } catch (error) {
    next(error)
  }
});
//Contactos de emergencia por userId
router.get("/users/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId); // Busca por ID

    const contacts = await getContactsByUserId(req.params.userId);
    res.status(200).json(contacts);
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedContact = await deleteContactById(req.params.id); // Busca y elimina el contacto por su ID

    res.status(200).json({ message: "Contacto eliminado correctamente" });
  } catch (error) {
    next(error)
  }
});
// Ruta para actualizar un contacto de emergencia
router.put("/:id", async (req, res, next) => {
  try {
    const contactData = {
      contactName: req.body.contactName,
      phone: req.body.phone,
      relationship: req.body.relationship,
    };
    const updatedContact = await updateContactById(req.params.id, contactData);

    res.status(200).json({ message: "Contacto de emergencia actualizado" });
  } catch (error) {
    next(error)
  }
});

export default router;
