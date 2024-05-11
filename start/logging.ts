import winston from 'winston';
require('winston-mongodb')
require('express-async-errors')

function logging() {
    // Custom winston logger
    const logger = winston.createLogger({
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

    return logger
}

module.exports = logging