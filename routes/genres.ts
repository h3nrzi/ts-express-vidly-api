const dbLog = require('debug')('app:dbLog');
import mongoose from 'mongoose';
import Joi from 'joi';
import express from 'express';
const router = express.Router();

function validateGenre(genre: { name: string }) {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(genre, schema);
}

// connecting to DB
mongoose
    .connect('mongodb://localhost/vidly', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => dbLog('Connected to MongoDB...'))
    .catch(() => dbLog('Could not connect to MongoDB...'));


// creating schema 
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, maxlength: 255,
    }
});

// creating Course class
const Genre = mongoose.model('Course', genreSchema);







/////////// GET ALL

router.get('/', async (req, res) => {
    const genres = await Genre
        .find()
        .sort({ name: 1 })
    res.json(genres);
});

// /////////// GET ONE

router.get('/:id', async (req, res) => {
    // Look up the genre and send the to client
    const genre = await Genre.findById(req.params.id)

    if (!genre)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(genre);
});

////////// POST

router.post('/', async (req, res) => {
    // Validate the request
    const { error } = validateGenre(req.body);

    if (error)
        return res
            .status(400)
            .send(error.details[0].message);

    // Create genre and send to the client
    let genre = new Genre({ name: req.body.name })
    genre = await genre.save()


    return res
        .status(201)
        .send(genre);
});

// ////////// PUT

router.put('/:id', async (req, res) => {
    // Validate the request
    const { error } = validateGenre(req.body);

    if (error)
        return res
            .status(400)
            .send(error.details[0].message);

    // Look up the genre and update and send to the client
    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    )

    if (!genre)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(genre);
});

// /////////// DELETE

router.delete('/:id', async (req, res) => {
    // Delete the genre and send to the client
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(genre);
});

export default router;