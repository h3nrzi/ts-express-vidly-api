import { GenreDto } from '../dtos';
import Joi from 'joi';
import { Schema, model } from 'mongoose';

function validateGenre(genre: GenreDto) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    };

    return Joi.validate(genre, schema);
}

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, maxlength: 50,
    }
});

const Genre = model('Genre', genreSchema);

export { Genre, validateGenre, genreSchema }