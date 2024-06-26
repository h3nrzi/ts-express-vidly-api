import mongoose from 'mongoose'
import { Request, Response } from 'express';
const Joi = require('joi')

import { RentalDto } from '../dtos';
import { Movie } from '../models/movie';
import { Customer } from '../models/customer';
const Rental = require('../models/rental')

export async function getAll(req: Request, res: Response) {
    const movies = await Rental.find().sort({ dateOut: -1 })

    res.json(movies);
}

export async function get(req: Request, res: Response) {
    const rental = await Rental.findById(req.params.id)

    if (!rental)
        return res.status(404).send('فیلم اجاره داده شده ای با شناسه ی داده شده پیدا نشد!');

    return res.send(rental);
}

export async function create(req: Request, res: Response) {
    const { customerId, movieId } = req.body as RentalDto

    const customer = await Customer.findById(customerId)
    if (!customer)
        return res.status(400).send('شناسه ی مشتری نامعتبر است')

    const movie = await Movie.findById(movieId) as any
    if (!movie)
        return res.status(400).send('شناسه ی فیلم نامعتبر است')
    if (movie.numberInStock === 0)
        return res.status(400).send('فیلم موجود نیست')

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    // Start a new session
    mongoose.startSession().then((session) => {
        // Start a transaction
        session.startTransaction()

        async function startOperations() {
            try {
                // transactional operations
                rental = await rental.save()
                movie.numberInStock--;
                await movie.save();

                // Commit the transaction
                await session.commitTransaction();
            } catch (error) {
                // If any operation fails, rollback the transaction
                await session.abortTransaction();
                console.error('Transaction aborted:', error);
            } finally {
                // End the session
                session.endSession();
            }
        } startOperations()
    })

    return res.status(201).send(rental);
}

export function validateRental(rental: RentalDto) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }

    return Joi.validate(rental, schema)
}