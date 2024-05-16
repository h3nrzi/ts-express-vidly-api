import mongoose from "mongoose";
import config from 'config';
import { Logger } from "winston";


function dbConnection(logger: Logger) {
    const db: string = config.get('db')
    mongoose
        .connect(db)
        .then(() => logger.info(`Connected to ${db}...`))
        .catch((err) => logger.error('', err))
}

module.exports = dbConnection