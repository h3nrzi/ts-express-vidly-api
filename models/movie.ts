import { Schema, model } from 'mongoose'

import { genreSchema } from './genre'

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

const Movie = model('Movie', movieSchema)

export { Movie }
