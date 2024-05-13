import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

function validateObjectId(req: Request, res: Response, next: NextFunction) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('شناسه نامعتبر است.')
    return next()
}

export default validateObjectId;
