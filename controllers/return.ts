import { Request, Response } from 'express'

export async function create(req: Request, res: Response) {
    res.status(401).send('Unauthorized')
}