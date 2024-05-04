import { NextFunction } from "express";

export default function log(
    req: Request,
    res: Response,
    next: NextFunction) {
    console.log("Hello from Middleware...");
    next();
}