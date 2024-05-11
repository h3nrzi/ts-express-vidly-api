import winston from 'winston';
require('winston-mongodb')
require('express-async-errors')
import config from 'config'
import Joi from 'joi'
const objectId = require('joi-objectid')
const dbLog = require('debug')('app:dbLog');
const serverLog = require('debug')('app:serverLog');
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

const app = express();
// @ts-expect-error
Joi.objectId = objectId(Joi)
if (!config.get('jwtPrivateKey')) {
    log("FATAL ERROR: jwtPrivateKey is not defined.")
    process.exit(1)
}
export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: "logfile.log" }),
        // @ts-expect-error
        new winston.transports.MongoDB({ db: "mongodb://localhost/vidly", collection: "log" })
    ]
})

//////////// connecting to DB
mongoose
    .connect('mongodb://localhost/vidly', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => dbLog('Connected to MongoDB...'))
    .catch(() => dbLog('Could not connect to MongoDB...'));

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
app.listen(port, () => serverLog('Listening on port ' + port));



