const mongoose = require('mongoose');
const UserProgress = require('./models/UserProgress');
require('dotenv').config();

// Datos iniciales para la base de datos - usuarios de auth.ts
const initialData = [
  {
    userId: 1,
    userName: "Estudiante Demo",
    totalPoints: 0,
    completedQuestions: 0,
    completedWeeks: 0,
    completedWeekIds: [],
    questionProgress: []
  },
  {
    userId: 2,
    userName: "Juan Pérez",
    totalPoints: 0,
    completedQuestions: 0,
    completedWeeks: 0,
    completedWeekIds: [],
    questionProgress: []
  },
  {
    userId: 3,
    userName: "María García",
    totalPoints: 0,
    completedQuestions: 0,
    completedWeeks: 0,
    completedWeekIds: [],
    questionProgress: []
  },
  {
    userId: 4,
    userName: "Carlos López",
    totalPoints: 0,
    completedQuestions: 0,
    completedWeeks: 0,
    completedWeekIds: [],
    questionProgress: []
  },
  {
    userId: 5,
    userName: "Ana Martínez",
    totalPoints: 0,
    completedQuestions: 0,
    completedWeeks: 0,
    completedWeekIds: [],
    questionProgress: []
  }
];

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB conectado');
    
    try {
      // Eliminar datos existentes
      await UserProgress.deleteMany({});
      console.log('Datos anteriores eliminados');
      
      // Insertar nuevos datos
      const result = await UserProgress.insertMany(initialData);
      console.log(`Datos de prueba insertados correctamente (${result.length} registros)`);
      
      // Cerrar conexión
      mongoose.connection.close();
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
  }); 