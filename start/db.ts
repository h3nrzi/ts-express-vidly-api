import mongoose from "mongoose";
import config from 'config';
const logger = require('../start/logging')()


function dbConnection() {
    const db: string = config.get('db')
    mongoose
        .connect(db)
        .then(() => logger.info(`Connected to ${db}...`))
}

module.exports = dbConnection