import { Genre, validateGenre } from '../models/genre';
import express from 'express';
const router = express.Router();

/////////// GET ALL

router.get('/', async (req, res) => {
    const genres = await Genre
        .find()
        .sort({ name: 1 })
    res.json(genres);
});

///////////// GET ONE

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

//////////// PUT

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

///////////// DELETE

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