import { Request, Response } from 'express'
import { RentalDto } from '../dtos'
import { Rental } from '../models/rental'

export async function create(req: Request, res: Response) {
    const { customerId, movieId } = req.body as RentalDto

    if (!customerId)
        return res.status(400).send('شناسه مشتری ارائه نشده است')

    if (!movieId)
        return res.status(400).send('شناسه فیلم ارائه نشده است')

    const rental = await Rental.findOne({
        'customer._id': customerId,
        'movie._id': movieId
    })

    if (!rental)
        return res.status(404).send('فیلم اجاره ای پیدا نشد')

    return res.status(401).send('Unauthorized')
}