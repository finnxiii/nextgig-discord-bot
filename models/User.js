const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: { type: String, required: true, unique: true },
    keyword: { type: String, required: true },
    location: { type: String, default: "remote" },
    frequency: { type: String, default: "daily" },
    subscribedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);