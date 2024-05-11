import { Request, Response, NextFunction, RequestHandler } from 'express';


function asyncMiddleware(handler: RequestHandler) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next)
        } catch (ex) {
            next(ex)
        }
    }
}

export default asyncMiddleware;
