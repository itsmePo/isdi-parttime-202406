const express = require('express');
const mongoose = require('mongoose');
const EmergencyPhone = require('./models/emergencyPhone'); // Ruta al modelo

const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Ruta para obtener todos los teléfonos de emergencia
app.get('/api/emergency-phones', async (req, res) => {
  try {
    const phones = await EmergencyPhone.find(); // Recupera todos los teléfonos
    res.status(200).json(phones);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los teléfonos de emergencia', error: err.message });
  }
});

// Ruta para obtener un teléfono de emergencia por ID
app.get('/api/emergency-phones/:id', async (req, res) => {
  try {
    const phone = await EmergencyPhone.findById(req.params.id); // Busca por ID
    if (!phone) {
      return res.status(404).json({ message: 'Teléfono de emergencia no encontrado' });
    }
    res.status(200).json(phone);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el teléfono de emergencia', error: err.message });
  }
});

// Conectar a MongoDB y arrancar el servidor
mongoose.connect('mongodb://localhost:27017/emergencyPhonesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));