import express from "express";
import { createEvent, deleteEventById, getEventById, getEvents, updateEventById } from "../services/eventService.js"; // Importa funciones del controlador

const router = express.Router();

// Crear un evento
router.post("/", async (req, res) => {
  try {
    const { eventName, startDateTime, duration, color, user } = req.body;
    const event = { eventName, startDateTime, duration, color, user };
    await createEvent(event);
    res.status(200).json({ message: 'Evento creado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params; // Captura el parámetro dinámico desde la ruta
    const deletedEvent = await deleteEventById(eventId); // Busca y elimina el usuario por su ID

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' }); // Respuesta si el usuario no existe
    }

    res.status(200).json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params; // Captura el parámetro dinámico desde la ruta
    const fetchEventById = await getEventById(eventId); // Busca y elimina el usuario por su ID

    if (!fetchEventById) {
      return res.status(404).json({ message: 'Evento no encontrado' }); // Respuesta si el usuario no existe
    }

    res.json(fetchEventById);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

router.put('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params; // Captura el parámetro dinámico desde la ruta
    const { eventName, startDateTime, duration, color } = req.body;
    const updateEvent = {
        eventName, startDateTime, duration, color
    };
    const modifyEventById = await updateEventById(eventId, updateEvent); // Busca y modifica el usuario por su ID

    if (!modifyEventById) {
      return res.status(404).json({ message: 'Evento no encontrado' }); // Respuesta si el usuario no existe
    }

    res.status(200).json({ message: 'Evento modificado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

export default router;
