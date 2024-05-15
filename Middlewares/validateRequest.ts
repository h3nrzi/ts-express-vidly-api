import { Request, Response, NextFunction } from 'express'

function validateRequest(validator: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = validator(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        return next()
    }
}

export default validateRequest;
