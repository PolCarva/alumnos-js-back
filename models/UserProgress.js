const mongoose = require('mongoose');

const QuestionProgressSchema = new mongoose.Schema({
  userId: { 
    type: Number,
    required: true
  },
  weekId: { type: Number, required: true },
  questionId: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  failed: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  userAnswer: { type: String }
});

const UserProgressSchema = new mongoose.Schema({
  userId: { 
    type: Number,
    required: true,
    unique: true
  },
  userName: { type: String, required: true },
  userClass: { 
    type: String, 
    required: true,
    default: 'M',
    enum: ['M', 'L']
  },
  totalPoints: { type: Number, default: 0 },
  completedQuestions: { type: Number, default: 0 },
  completedWeeks: { type: Number, default: 0 },
  completedWeekIds: [{ type: Number }],
  questionProgress: [QuestionProgressSchema]
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema); 