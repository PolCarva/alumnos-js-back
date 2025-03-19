const mongoose = require('mongoose');
const UserProgress = require('./models/UserProgress');
require('dotenv').config();

// Datos de preguntas por semana
const weekQuestions = {
  1: [1, 2, 3],         // Semana 1: preguntas 1, 2, 3
  2: [4, 5, 6],         // Semana 2: preguntas 4, 5, 6
  3: [7, 8, 9],         // Semana 3: preguntas 7, 8, 9
  4: [10, 11, 12]       // Semana 4: preguntas 10, 11, 12
};

// Función para actualizar estadísticas del usuario
function updateUserStats(userProgress) {
  const completedQuestions = userProgress.questionProgress.filter(q => q.completed).length;
  const totalPoints = userProgress.questionProgress.reduce((sum, q) => sum + q.points, 0);
  
  // Calcular semanas completadas
  const completedWeekIds = [];
  
  // Revisar cada semana
  Object.keys(weekQuestions).forEach(weekId => {
    const weekId_number = parseInt(weekId);
    const questionsInWeek = weekQuestions[weekId];
    
    // Verificar cuántas preguntas de esta semana han sido intentadas (completadas o falladas)
    const attemptedQuestionsInWeek = userProgress.questionProgress.filter(
      q => q.weekId === weekId_number && (q.completed || q.failed)
    );
    
    // Si el número de preguntas intentadas es igual al total de preguntas en la semana,
    // consideramos la semana como completada
    if (attemptedQuestionsInWeek.length === questionsInWeek.length) {
      completedWeekIds.push(weekId_number);
    }
  });
  
  userProgress.totalPoints = totalPoints;
  userProgress.completedQuestions = completedQuestions;
  userProgress.completedWeekIds = completedWeekIds;
  userProgress.completedWeeks = completedWeekIds.length;
  
  return userProgress;
}

// Conectar a MongoDB y actualizar datos
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB conectado');
    
    try {
      // Obtener todos los usuarios
      const users = await UserProgress.find({});
      console.log(`Encontrados ${users.length} usuarios para actualizar`);
      
      // Actualizar cada usuario
      let updatedCount = 0;
      for (const user of users) {
        const updatedUser = updateUserStats(user);
        await updatedUser.save();
        updatedCount++;
        console.log(`Usuario ${updatedUser.userName} (ID: ${updatedUser.userId}) actualizado. Semanas completadas: ${updatedUser.completedWeekIds.join(', ')}`);
      }
      
      console.log(`Actualización completada: ${updatedCount} usuarios actualizados`);
      
      // Cerrar conexión
      mongoose.connection.close();
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
  }); 