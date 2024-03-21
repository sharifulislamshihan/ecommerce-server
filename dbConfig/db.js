const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');
const connectDB = async (options = {}) => {
    try {
        await mongoose.connect(mongodbURL, options);
        console.log("Mongodb connected successfully...");

        mongoose.connection.on('error', (error) => {
            console.error(`DB connection error: ${error.message}`);
        })
    }
    catch (error) {
        console.error('could not connect to db due to :', error.toString());
    }
}

module.exports = connectDB;