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
router.post("/users/:userId", async (req, res, next) => {
  try {
    const eventData = {
      eventName: req.body.eventName,
      startDateTime: req.body.startDateTime,
      duration: req.body.duration,
      color: req.body.color,
      category: req.body.category,
      userId: req.params.userId
    };

    // Verifica que el usuario exista
    const user = await getUserById(req.params.userId);
    const savedEvent = await createEvent(eventData);
    await saveUserEvent(user, savedEvent); // Guarda el evento en la base de datos

    res.status(200).json({ message: "Evento creado correctamente" });
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await getEventById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    next(error)  }
});

// Obtener todos los eventos
router.get("/", async (req, res, next) => {
  try {
    const events = await getEvents();
    res.status(200).json(events);
  } catch (error) {
    next(error)  }
});

router.get("/users/:userId", async (req, res, next) => {
  try {
    await getUserById(req.params.userId); // Busca por ID
    const events = await getEventsByUserId(req.params.userId);
    res.status(200).json(events);
  } catch (error) {
    next(error)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteEventById(req.params.id); // Busca y elimina el usuario por su ID

    res.status(200).json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    next(error)  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updateEvent = {
      eventName: req.body.eventName,
      startDateTime: req.body.startDateTime,
      duration: req.body.duration,
      color: req.body.color,
      category: req.body.category
    };
    await updateEventById(req.params.id, updateEvent); // Busca y modifica el usuario por su ID

    res.status(200).json({ message: "Evento modificado correctamente" });
  } catch (error) {
    next(error)  }
});

export default router;
