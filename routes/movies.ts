import express from 'express';
import { Movie, validateMovie } from '../models/movie';
import { MovieDto } from '../dtos';
const router = express.Router();






router.get('/', async (req, res) => {
    const movies = await Movie.find().sort({ name: 1 })
    res.send(movies)
})

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    if (!movie)
        return res.status(404).send('فیلم با شناسه ی داده شده پیدا نشد!');

    return res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const { title, genreId, dailyRentalRate, numberInStock } = req.body as MovieDto;

    const genre = await Movie.findById(genreId) as any
    if (!genre)
        return res.status(400).send('Invalid genre');

    const movie = new Movie({
        title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock,
        dailyRentalRate
    });
    await movie.save();

    return res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const { title, genreId, dailyRentalRate, numberInStock } = req.body as MovieDto;

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { title, genreId, dailyRentalRate, numberInStock },
        { new: true }
    )

    if (!movie)
        return res.status(404).send('فیلم با شناسه ی داده شده پیدا نشد!');

    return res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (!movie)
        return res.status(404).send('فیلم با شناسه ی داده شده پیدا نشد!');

    return res.send(movie);
});





export default router;
