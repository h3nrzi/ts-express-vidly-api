const { createLogger, format, transports } = require('winston');
const { combine, prettyPrint, colorize, simple, json } = format;

// require('winston-mongodb')
require('express-async-errors')

function logging() {
    // Custom winston logger
    const logger = createLogger({
        transports: [
            new transports.Console({ format: combine(colorize(), prettyPrint(), simple()) }),
            new transports.File({ filename: "logfile.log" }),
            // new transports.MongoDB({ db: "mongodb://localhost/vidly" })
        ],
        rejectionHandlers: [
            new transports.Console({ format: combine(colorize(), prettyPrint(), simple()) }),
            new transports.File({ filename: 'rejections.log' })
        ],
        exceptionHandlers: [
            new transports.Console({ format: combine(colorize(), prettyPrint(), simple()) }),
            new transports.File({ filename: 'exception.log' })
        ],
    })

    // process.on('uncaughtException', (ex) => {
    //     logger.error('', ex)
    //     process.exit(1)
    // })

    // process.on('unhandledRejection', (ex) => {
    //     logger.error('', ex)
    //     process.exit(1)
    // })

    return logger
}

module.exports = logging