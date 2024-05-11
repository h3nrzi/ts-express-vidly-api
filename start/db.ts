import mongoose from "mongoose";
const logger = require('../start/logging')()

function dbConnection() {
    mongoose
        .connect('mongodb://localhost/vidly')
        .then(() => logger.info('Connected to MongoDB...'))
}

module.exports = dbConnection