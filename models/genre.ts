import { GenreDto as Genre } from '../dtos';
import Joi from 'joi';
import { Schema, model } from 'mongoose';

function validateGenre(genre: Genre) {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(genre, schema);
}

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, maxlength: 255,
    }
});

const Genre = model('Genre', genreSchema);

export { Genre, validateGenre, genreSchema }