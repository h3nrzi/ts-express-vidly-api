import { RentalDto } from '../dtos'
import { Schema, model } from 'mongoose'
import Joi from 'joi'

function validateRental(rental: RentalDto) {
    const schema = {
        // @ts-expect-error
        customerId: Joi.objectId().required(),
        // @ts-expect-error
        movieId: Joi.objectId().required()
    }

    return Joi.validate(rental, schema)
}

const movieSchema = new Schema({
    title: {
        type: String, required: true,
        trim: true,
        minlength: 5, maxlength: 255
    },
    dailyRentalRate: {
        type: Number, required: true,
        min: 0, max: 255
    },
})

const customerSchema = new Schema({
    name: {
        type: String, required: true,
        minlength: 5, maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String, required: true,
        minlength: 5, maxlength: 50
    }
})

const rentalSchema = new Schema({
    customer: customerSchema,
    movie: movieSchema,
    dateOut: {
        type: Date, required: true,
        default: Date.now
    },
    dateReturned: Date,
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = model('Rental', rentalSchema)

export { Rental, validateRental }