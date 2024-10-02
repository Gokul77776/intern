require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error('MONGO_URL is not defined');
    }
    try {
        await mongoose.connect(mongoUrl, {
             
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
