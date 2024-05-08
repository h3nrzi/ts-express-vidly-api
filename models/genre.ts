import { Genre } from '../dtos';
import Joi from 'joi';
import mongoose from 'mongoose';

function validateGenre(genre: Genre) {
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

const Genre = mongoose.model('Genre', genreSchema);

export { Genre, validateGenre }