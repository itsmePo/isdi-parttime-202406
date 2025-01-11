import mongoose from 'mongoose';

// Crear un esquema para teléfonos de emergencia con validación específica de España
const emergencyContactSchema = new mongoose.Schema({
  contactName: {
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
  relationship: {
    type: String,
    required: false,
    trim: true,
    enum: ['Familiar', 'Amigo', 'Pareja', 'Personal Médico', 'Otro'], // Relación con el contacto
    default: 'Otro', // Relación por defecto si no se especifica nada
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Cada contacto debe estar vinculado a un usuario
  },
}, {
  timestamps: true, // Añade createdAt y updatedAt automáticamente
});

// Crear el modelo de teléfono de emergencia
const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);

export default EmergencyContact;