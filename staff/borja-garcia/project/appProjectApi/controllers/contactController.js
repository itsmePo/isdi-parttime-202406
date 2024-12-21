import express from "express";
import EmergencyContact from '../models/contacts.js' // Ruta al modelo
import { createContact } from '../services/contactService.js';
import { getUserById, saveUserContact } from '../services/userService.js';
const router = express.Router();

// Ruta para obtener todos los teléfonos de emergencia
router.get('/', async (req, res) => {
  try {
    const contacts = await EmergencyContact.find(); // Recupera todos los teléfonos
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los teléfonos de emergencia', error: err.message });
  }
});

// Ruta para obtener un teléfono de emergencia por ID
router.get('/:id', async (req, res) => {
  try {
    const phone = await EmergencyContact.findById(req.params.id); // Busca por ID
    if (!phone) {
      return res.status(404).json({ message: 'Teléfono de emergencia no encontrado' });
    }
    res.status(200).json(phone);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el teléfono de emergencia', error: err.message });
  }
});

// Ruta para agregar un contacto de emergencia vinculado a un usuario
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Captura el parámetro dinámico desde la ruta
    const { contactName, phone, relationship } = req.body; //Perfeccionar***
    const contactData = { contactName, phone, relationship }
    //const contactData = { name, phone, relationship };
    // Verificar que el usuario exista
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Crear el contacto de emergencia
    const contact = await createContact(user, contactData);
    await saveUserContact(user, contact);

    res.status(201).json({ message: 'Contacto de emergencia creado'});
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el contacto de emergencia', error: err.message });
  }
});

// Ruta para actualizar un contacto de emergencia
router.put('/:id', async (req, res) => {
  try {
    const { contactName, phone } = req.body;
    const updatedContact = await EmergencyContact.findByIdAndUpdate(
      req.params.id,
      { contactName, phone },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contacto de emergencia no encontrado' });
    }

    res.status(200).json({ message: 'Contacto de emergencia actualizado', contact: updatedContact });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el contacto de emergencia', error: err.message });
  }
});

export default router;