const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    question: String,
    answer: String,
    correct: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);