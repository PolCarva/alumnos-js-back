const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');

// Datos de preguntas por semana (necesarios para saber cuántas preguntas hay en cada semana)
const weekQuestions = {
  1: [1, 2, 3],         // Semana 1: preguntas 1, 2, 3
  2: [4, 5, 6],         // Semana 2: preguntas 4, 5, 6
  3: [7, 8, 9],         // Semana 3: preguntas 7, 8, 9
  4: [10, 11, 12]       // Semana 4: preguntas 10, 11, 12
};

// Obtener todos los usuarios para el leaderboard
router.get('/', async (req, res) => {
  try {
    const usersProgress = await UserProgress.find().sort({ totalPoints: -1 });
    res.json(usersProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener progreso de un usuario específico por ID
router.get('/:userId', async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({ userId: parseInt(req.params.userId) });
    
    if (!userProgress) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json(userProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear o actualizar progreso de usuario
router.post('/', async (req, res) => {
  try {
    // Buscar si el usuario ya existe
    let userProgress = await UserProgress.findOne({ userId: req.body.userId });
    
    if (userProgress) {
      // Si el usuario ya existe, no lo actualizamos automáticamente
      // solo devolvemos el usuario existente
      return res.status(200).json(userProgress);
    } else {
      // Crear nuevo usuario
      userProgress = new UserProgress(req.body);
      await userProgress.save();
      return res.status(201).json(userProgress);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar progreso de una pregunta (sin autenticación)
router.post('/:userId/question', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { weekId, questionId, completed, points, failed, userAnswer } = req.body;
    
    // Buscar el usuario
    const userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Verificar si la pregunta ya existe en el progreso
    const questionIndex = userProgress.questionProgress.findIndex(
      q => q.questionId === questionId && q.weekId === weekId
    );
    
    if (questionIndex >= 0) {
      // Actualizar pregunta existente
      userProgress.questionProgress[questionIndex] = {
        userId,
        weekId,
        questionId,
        completed,
        points,
        failed,
        userAnswer
      };
    } else {
      // Agregar nueva pregunta al progreso
      userProgress.questionProgress.push({
        userId,
        weekId,
        questionId,
        completed,
        points,
        failed,
        userAnswer
      });
    }
    
    // Actualizar estadísticas
    updateUserStats(userProgress);
    
    await userProgress.save();
    res.json(userProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
}

module.exports = router; 