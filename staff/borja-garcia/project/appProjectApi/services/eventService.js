import Event from "../models/events.js";
import { Errors } from "../errors";

export const createEvent = async (eventObject) => {
  const { userId, ...eventData } = eventObject;

  // Crear y guardar el evento
  const event = new Event({
    user: userId,
    ...eventData,
  });

  const savedEvent = await event.save();
  if(!savedEvent) {
    throw new Errors.SaveError("Error al crear el evento");
  }
  return savedEvent;
};

// Obtener todos los eventos
export const getEvents = async () => {
const eventsFound = await Event.find();
  if (!eventsFound || eventsFound.length === 0) {
    throw new Errors.NotFoundError("No existen eventos");
  }
  return eventsFound;
};

export const deleteEventById = async (eventId) => {
  const deletedEvent = await Event.findByIdAndDelete(eventId);
  if (!deletedEvent) {
    throw new Errors.DeleteError("No se pudo eliminar el evento");
  }
  return deletedEvent;
};

export const updateEventById = async (eventId, updatedEvent) => {
  const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEvent, { new: true });
  if (!updatedEvent) {
    throw new Errors.UpdateError("No se pudo actualizar el evento");
  }
  return updatedEvent;
};

export const getEventById = async (eventId) => {
  const eventFound = await Event.findById(eventId);
  if (!eventFound) {
    throw new Errors.NotFoundError("No se encontró el evento");
  }
  return eventFound;
};

export const getEventsByUserId = async (userId) => {
  const eventsFound = await Event.find({ user: userId });
  if (!eventsFound || eventsFound.length === 0) {
    throw new Errors.NotFoundError("No existen eventos para este usuario");
  }
  return eventsFound;
};
