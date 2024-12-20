// const mongoose = require('mongoose');
// const Event = require('./models/event'); // Ruta al modelo

// mongoose.connect('mongodb://localhost:27017/eventsDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// })
//   .then(() => console.log('Conectado a MongoDB'))
//   .catch(err => console.error('Error al conectar a MongoDB:', err));

// // Crear un evento de ejemplo
// const newEvent = new Event({
//   eventName: 'Reunión de equipo',
//   startDateTime: new Date('2024-12-20T10:00:00'), // Fecha y hora de inicio
//   duration: 120, // Duración en minutos
//   color: '#FF5733', // Color en formato HEX
// });

// newEvent.save()
//   .then(event => console.log('Evento creado:', event))
//   .catch(err => console.error('Error al crear el evento:', err));