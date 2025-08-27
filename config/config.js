require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    if (!process.env.MONGODB_URI) {
        console.warn('⚠️ MONGODB_URI is not defined in environment variables');
        return;
    }

    try {
        console.log('📦 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        throw error;
    }
}

module.exports = connectDB;