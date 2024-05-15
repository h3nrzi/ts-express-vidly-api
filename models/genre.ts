import { Schema, model } from 'mongoose';

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, maxlength: 50,
    }
});

const Genre = model('Genre', genreSchema);

export { Genre, genreSchema }