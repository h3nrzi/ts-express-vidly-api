import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
const log = require('debug')('app:log');

import error from '../Middlewares/error';
import authRouter from '../routes/auth'
import userRouter from '../routes/users'
import rentalRouter from '../routes/rentals'
import movieRouter from '../routes/movies'
import genreRouter from '../routes/genres';
import homeRouter from '../routes/home';
import customerRouter from '../routes/customers'

function appRouter(app: Express) {
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

    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/rentals', rentalRouter);
    app.use('/api/genres', genreRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/movies', movieRouter);
    app.use('/', homeRouter);
    app.use(error)
};

export default appRouter