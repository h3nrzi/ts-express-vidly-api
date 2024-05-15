import { Request, Response } from 'express'

export async function create(req: Request, res: Response) {
    if (!req.body.customerId)
        return res.status(400).send('customerId is not provided')

    if (!req.body.movieId)
        return res.status(400).send('movieId is not provided')

    return res.status(401).send('Unauthorized')
}