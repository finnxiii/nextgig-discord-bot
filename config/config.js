require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    console.log("🔍 Checking MongoDB connection...");

    if (!process.env.MONGODB_URI) {
        console.warn('⚠️ MONGODB_URI is not defined in environment variables');
        return;
    }

    try {
        console.log('📦 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectDB;