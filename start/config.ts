import express, { Express } from 'express';
import morgan from 'morgan';
const helmet = require('helmet');
const compression = require('compression');
const config = require('config');
import { Logger } from 'winston';

function configuration(app: Express, logger: Logger) {
    if (!config.get('jwtPrivateKey')) {
        logger.error('', new Error("jwtPrivateKey is not defined."))
        process.exit(1)
    }


    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        // const promise = Promise.reject(new Error("promise rejected"))
        // promise.then(() => log("Done!"))
        // throw new Error("Uncaught ex")
    };

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(helmet());
    app.use(compression());
}

module.exports = configuration