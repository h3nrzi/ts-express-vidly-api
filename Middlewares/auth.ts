import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from 'config';


function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('دسترسی رد شد. هیچ توکنی ارائه نشده است');

    try {
        const decoded = jwt.verify(token!, config.get('jwtPrivateKey'));
        // @ts-expect-error
        req.user = decoded

        return next();
    } catch (ex) {
        return res.status(400).send('توکن نامعتبر است.')
    }

}

export default auth;