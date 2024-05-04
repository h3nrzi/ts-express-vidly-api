import joi from 'joi';
import express from 'express';

const app = express();
app.use(express.json());

interface Genre {
    id: number;
    name: string;
}

function validateGenre(genre: Genre) {
    const schema = {
        name: joi.string().min(3).required(),
    };

    return joi.validate(genre, schema);
}

const genres: Genre[] = [
    { id: 1, name: "Action" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Romance" },
];

/////////// GET ALL

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

/////////// GET ONE

app.get('/api/genres/:id', (req, res) => {
    // Look up the genre and send the to client
    const genre = genres.find((genre) =>
        genre.id === parseInt(req.params.id));

    if (!genre)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(genre);
});

////////// POST

app.post('/api/genres', (req, res) => {
    // Validate the request
    const { error } = validateGenre(req.body);

    if (error)
        return res
            .status(400)
            .send(error.details[0].message);

    // Create genre and send to the client
    const genre: Genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);

    return res
        .status(201)
        .send(genre);
});

////////// PUT

app.put('/api/genres/:id', (req, res) => {
    // Look up the genre
    const genre = genres.find((genre) =>
        genre.id === parseInt(req.params.id));
    if (!genre)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    // Validate the request
    const { error } = validateGenre(req.body);

    if (error)
        return res
            .status(400)
            .send(error.details[0].message);

    // Update the genre and send to the client
    genre.name = req.body.name;

    return res.send(genre);
});

/////////// DELETE

app.delete('/api/genres/:id', (req, res) => {
    // Look up the genre
    const genre = genres.find((genre) =>
        genre.id === parseInt(req.params.id));
    if (!genre)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    // Delete the genre and send to the client
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.send(genre);
});

////////// Listening on the server

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port));



