import { Request, Response } from 'express'
import { RentalDto } from '../dtos'
import { Rental } from '../models/rental'
import moment from 'moment'
import { Movie } from '../models/movie'

export async function create(req: Request, res: Response) {
    const { customerId, movieId } = req.body as RentalDto

    if (!customerId)
        return res.status(400).send('شناسه مشتری ارائه نشده است')

    if (!movieId)
        return res.status(400).send('شناسه فیلم ارائه نشده است')

    const rental = await Rental.findOne({
        'customer._id': customerId,
        'movie._id': movieId
    }) as any

    if (!rental)
        return res.status(404).send('فیلم اجاره ای پیدا نشد')

    if (rental.dateReturned)
        return res.status(400).send('بازگشت فیلم اجاره ای قبلا پردازش شده است')

    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days')
    rental.rentalFee = rentalDays * rental.movie?.dailyRentalRate!
    await rental.save()

    await Movie.updateOne({ _id: rental.movie._id },
        { $inc: { numberInStock: 1 } }
    )

    return res.status(200).send('درخواست معتبر!')
}