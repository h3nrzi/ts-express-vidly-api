import winston from 'winston';
require('winston-mongodb')
require('express-async-errors')
import config from 'config'
import Joi from 'joi'
const objectId = require('joi-objectid')
const log = require('debug')('app:log');
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import error from './Middlewares/error';
import authRouter from './routes/auth'
import userRouter from './routes/users'
import rentalRouter from './routes/rentals'
import movieRouter from './routes/movies'
import genreRouter from './routes/genres';
import homeRouter from './routes/home';
import customerRouter from './routes/customers'



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

const app = express();

// @ts-expect-error
Joi.objectId = objectId(Joi)

if (!config.get('jwtPrivateKey')) {
    log("FATAL ERROR: jwtPrivateKey is not defined.")
    process.exit(1)
}





mongoose
    .connect('mongodb://localhost/vidly')
    .then(() => log('Connected to MongoDB...'))
    .catch(() => log('Could not connect to MongoDB...'));

app.set('view engine', 'pug');
app.set('views', './views'); // default

////////// Middlewares 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    log('Morgan enabled...');
    // const promise = Promise.reject(new Error("promise rejected"))
    // promise.then(() => log("Done!"))
    // throw new Error("Uncaught ex")
};

////////// Routers

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/genres', genreRouter);
app.use('/api/customers', customerRouter);
app.use('/api/movies', movieRouter);
app.use('/', homeRouter);
app.use(error)

////////// Listening on the server

const port = process.env.PORT || 3000;
app.listen(port, () => log('Listening on port ' + port));



