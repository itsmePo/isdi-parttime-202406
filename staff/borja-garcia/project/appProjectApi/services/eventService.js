import Event from "../models/events.js";

export const createEvent = async (eventObject) => {

  const { userId, ...eventData } = eventObject;

  // Crear y guardar el evento
  const event = new Event({ 
    user: userId,
    ...eventData 
  });

return await event.save();
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

export const getEventsByUserId = async (userId) => {
  return await Event.find({ user: userId });
}