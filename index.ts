import winston from 'winston';
require('winston-mongodb')
require('express-async-errors')
import config from 'config'
import Joi from 'joi'
// @ts-expect-error
Joi.objectId = require('joi-objectid')(Joi)
export const log = require('debug')('app:log');
import express from 'express';


// Custom winston logger
export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: "logfile.log" }),
        // @ts-expect-error
        new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
    ],
    exceptionHandlers: [new winston.transports.File({ filename: 'exception.log' })],
    rejectionHandlers: [new winston.transports.File({ filename: 'rejections.log' })],
})

// process.on('uncaughtException', (ex) => {
//     log("We got an Uncaught Exception")
//     logger.log('error', '', ex)
//     process.exit(1)
// })

// process.on('unhandledRejection', (ex) => {
//     log("We got an Unhandled Rejection")
//     logger.log('error', '', ex)
//     process.exit(1)
// })



if (!config.get('jwtPrivateKey')) {
    log("FATAL ERROR: jwtPrivateKey is not defined.")
    process.exit(1)
}



const app = express();
require('./start/routes')(app)
require('./start/db')()


app.set('view engine', 'pug');
app.set('views', './views'); // default
////////// Listening on the server

const port = process.env.PORT || 3000;
app.listen(port, () => log('Listening on port ' + port));



