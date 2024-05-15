import { Request, Response } from 'express';
const Joi = require("joi")

import { Movie } from '../models/movie';
import { MovieDto } from '../dtos';

export async function getAll(req: Request, res: Response) {
    const movies = await Movie.find().sort({ name: 1 })

    res.send(movies)
}

export async function get(req: Request, res: Response) {
    const movie = await Movie.findById(req.params.id)

    if (!movie)
        return res.status(404).send('فیلم با شناسه ی داده شده پیدا نشد!');

    return res.send(movie);
}

export async function create(req: Request, res: Response) {
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
}

export async function update(req: Request, res: Response) {
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
}

export async function remove(req: Request, res: Response) {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (!movie)
        return res.status(404).send('فیلم با شناسه ی داده شده پیدا نشد!');

    return res.send(movie);
}

export function validateMovie(movie: MovieDto) {
    const schema = {
        title: Joi.string().required().min(5).max(50),
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required().min(0),
        genreId: Joi.objectId().required(),
    }

    return Joi.validate(movie, schema)
}