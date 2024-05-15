import Joi from 'joi';
import { Request, Response } from 'express'

import { Genre } from '../models/genre';
import { GenreDto } from '../dtos';

export async function getAll(req: Request, res: Response) {
    // throw new Error("could not get the genres!")
    const genres = await Genre.find().sort('name')

    res.json(genres);
}

export async function get(req: Request, res: Response) {
    const genre = await Genre.findById(req.params.id)
    if (!genre)
        return res.status(404).send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(genre);
}

export async function create(req: Request, res: Response) {
    let genre = new Genre({ name: req.body.name })
    genre = await genre.save()

    return res.status(201).send(genre);
}

export async function update(req: Request, res: Response) {
    const { error } = validateGenre(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    )

    if (!genre)
        return res.status(404).send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(genre);
}

export async function remove(req: Request, res: Response) {
    const genre = await Genre.findByIdAndDelete(req.params.id)

    if (!genre)
        return res.status(404).send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(genre);
}

export function validateGenre(genre: GenreDto) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    };

    return Joi.validate(genre, schema);
}