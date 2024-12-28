import express from "express";
import {
  createEvent,
  deleteEventById,
  getEventById,
  getEvents,
  updateEventById,
  getEventsByUserId,
} from "../services/eventService.js"; // Importa funciones del controlador
import { getUserById, saveUserEvent } from "../services/userService.js";
const router = express.Router();

// Crear un evento
router.post("/users/:userId", async (req, res) => {
  try {
    const eventData = {
      eventName: req.body.eventName,
      startDateTime: req.body.startDateTime,
      duration: req.body.duration,
      color: req.body.color,
      userId: req.params.userId,
    };

    // Verifica que el usuario exista
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const savedEvent = await createEvent(eventData);
    await saveUserEvent(user, savedEvent); // Guarda el evento en la base de datos

    res.status(201).json({ message: "Evento creado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el evento" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" }); // Respuesta si el evento no existe
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el evento" });
  }
});

// Obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const events = await getEvents();
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No existen eventos" });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos" });
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const user = await getUserById(req.params.userId); // Busca por ID
    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    const events = await getEventsByUserId(req.params.userId);
    if (events.length === 0) {
      return res.status(404).json({
        message: "No existen eventos de este usuario",
      });
    }
    res.status(200).json(events);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los eventos del usuario" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await deleteEventById(req.params.id); // Busca y elimina el usuario por su ID

    if (!deletedEvent) {
      return res.status(404).json({ message: "Evento no encontrado" }); // Respuesta si el usuario no existe
    }

    res.status(200).json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateEvent = {
      eventName: req.body.eventName,
      startDateTime: req.body.startDateTime,
      duration: req.body.duration,
      color: req.body.color,
    };
    const modifyEventById = await updateEventById(req.params.id, updateEvent); // Busca y modifica el usuario por su ID

    if (!modifyEventById) {
      return res.status(404).json({ message: "Evento no encontrado" }); // Respuesta si el usuario no existe
    }

    res.status(200).json({ message: "Evento modificado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el evento" }); // Manejo de errores
  }
});

export default router;
