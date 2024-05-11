import { RentalDto } from '../dtos';
import { Movie } from '../models/movie';
import { Customer } from '../models/customer';
import { Rental, validateRental } from '../models/rental';
import mongoose from 'mongoose'
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Rental
        .find()
        .sort({ dateOut: -1 })

    res.json(movies);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id)

    if (!rental)
        return res.status(404).send('فیلم اجاره داده شده ای با شناسه ی داده شده پیدا نشد!');

    return res.send(rental);
});


router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

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
});

export default router