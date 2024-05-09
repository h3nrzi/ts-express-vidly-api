import { MovieDto } from '../dtos'
import Joi from 'joi'
import { Schema, model } from 'mongoose'
import { genreSchema } from './genre'

function validateMovie(movie: MovieDto) {
    const schema = {
        title: Joi.string().required().min(5).max(50),
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required().min(0),
        // @ts-expect-error
        genreId: Joi.objectId().required(),
    }

    return Joi.validate(movie, schema)
}

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5, maxlength: 255,
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0, max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0, max: 255
    }
})

const MovieDto = model('Movie', movieSchema)

export { MovieDto as Movie, validateMovie }
