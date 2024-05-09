import { GenreDto } from '../dtos';
import Joi from 'joi';
import mongoose from 'mongoose';

function validateGenre(genre: GenreDto) {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(genre, schema);
}

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, maxlength: 255,
    }
});

const GenreDto = mongoose.model('Genre', genreSchema);

export { GenreDto as Genre, validateGenre, genreSchema }