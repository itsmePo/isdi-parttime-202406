const mongoose = require('mongoose');

// Crear un esquema para el evento
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100, // Máximo 100 caracteres
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // Duración en minutos (puedes cambiar a otro formato si es necesario)
    default: null, // Campo no requerido
  },
  color: {
    type: String, // Color en formato HEX, RGB o nombre de color
    default: null, // Campo no requerido
    match: /^#([0-9A-F]{3}){1,2}$/i, // Validación para color HEX (opcional)
  },
}, {
  timestamps: true, // Añade createdAt y updatedAt automáticamente
});

// Crear el modelo de evento
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;