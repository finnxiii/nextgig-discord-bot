const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: { type: String, required: true, unique: true },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    quizzesTaken: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);