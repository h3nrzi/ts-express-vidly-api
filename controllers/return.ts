import { Request, Response } from 'express'
const Joi = require('joi')

import { ReturnDto } from '../dtos'
const Rental = require('../models/rental')
import moment from 'moment'
import { Movie } from '../models/movie'

export async function create(req: Request, res: Response) {
    const { customerId, movieId } = req.body as ReturnDto

    const rental = await Rental.lookup(customerId, movieId)

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

    return res.status(200).json(rental)
}

export function validateReturn(req: ReturnDto) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    };

    return Joi.validate(req, schema);
}