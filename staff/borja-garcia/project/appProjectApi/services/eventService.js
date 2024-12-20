import Event from "../models/events.js";
import User from "../models/users.js";
// Crear un evento
export const createEvent = async (eventObject) => {
  const { userId, ...eventData } = eventObject;

  // Verificar si el usuario existe
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Crear y guardar el evento
  const event = new Event({ ...eventData, user: userId });
  const savedEvent = await event.save();

  // Asociar el evento al usuario
  user.events = user.events || [];
  user.events.push(savedEvent._id); // Asegúrate de que el esquema del usuario tenga el campo `events`
  await user.save();

  return savedEvent;
};

// Obtener todos los eventos
export const getEvents = async () => {
  return await Event.find();
};

export const deleteEventById = async (eventId) => {
  return await Event.findByIdAndDelete(eventId);
}

export const updateEventById = async (eventId, updatedEvent) => {
  return await Event.findByIdAndUpdate(eventId, updatedEvent, { new: true });
}

export const getEventById = async (eventId) => {
  return await Event.findById(eventId);
}
