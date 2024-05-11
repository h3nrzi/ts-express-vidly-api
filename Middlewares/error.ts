import { logger } from '../index'
import { Request, Response, NextFunction } from 'express';

const error = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error('ERROR', err)
    return res.status(500).send('Something failed.')
}

export default error;
