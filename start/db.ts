import mongoose from "mongoose";
import { logger } from "../index";

function dbConnection() {
    mongoose
        .connect('mongodb://localhost/vidly')
        .then(() => logger.info('Connected to MongoDB...'))
}

module.exports = dbConnection