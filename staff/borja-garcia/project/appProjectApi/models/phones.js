const mongoose = require('mongoose');

// Crear un esquema para teléfonos de emergencia con validación específica de España
const emergencyPhoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100, // Límite opcional de caracteres
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Evita duplicados
    match: /^(\+34\s?|0034\s?|34\s?)?([6789]\d{8})$/, // Validación para teléfonos de España
  },
}, {
  timestamps: true, // Añade createdAt y updatedAt automáticamente
});

// Crear el modelo de teléfono de emergencia
const EmergencyPhone = mongoose.model('EmergencyPhone', emergencyPhoneSchema);

module.exports = EmergencyPhone;