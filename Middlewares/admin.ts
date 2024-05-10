import { Request, Response, NextFunction } from "express";

function admin(req: Request, res: Response, next: NextFunction) {
    // @ts-expect-error
    if (!req.user.isAdmin)
        return res.status(403).send('دسترسی رد شد.')
    return next()
}

export default admin;