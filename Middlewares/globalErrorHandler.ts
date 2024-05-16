const logger = require('../start/logging')()
import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.log('error', '', err)
    return res.status(500).send('یک چیزی درست پیش نرفت!')
}

export default globalErrorHandler;
