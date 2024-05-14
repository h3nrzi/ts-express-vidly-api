import request, { Response } from 'supertest'
import { Server, IncomingMessage, ServerResponse } from "http";

import { Genre } from '../../models/genre';
import { User } from '../../models/user';
import mongoose from 'mongoose';

interface Genre {
    _id: string;
    name: string;
}

describe('/api/genres', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;

    beforeEach(() => server = require('../../index'))
    afterEach(async () => {
        server.close()
        await Genre.deleteMany()
    })


    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ])

            const res = await request(server).get('/api/genres')

            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some((g: Genre) => g.name === 'genre1')).toBeTruthy()
            expect(res.body.some((g: Genre) => g.name === 'genre2')).toBeTruthy()
        })
    });

    describe('GET /:id', () => {
        it('should return the genre if valid id is passed.', async () => {
            const genre = new Genre({ name: 'genre1' })
            await genre.save()

            const res = await request(server).get('/api/genres/' + genre._id)

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name)
        })

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/' + 1)

            expect(res.status).toBe(404);
        })

        it('should return 404 if no genre with the given id exist', async () => {
            const id = new mongoose.Types.ObjectId()
            const res = await request(server).get('/api/genres/' + id)

            expect(res.status).toBe(404);
        })
    });

    describe('POST /', () => {
        let token: string;
        let name: string;

        // Default value
        beforeEach(() => {
            const user = new User() as any
            token = user.generateAuthToken()
            name = 'genre1'
        })

        async function exec(): Promise<Response> {
            return await request(server)
                .post('/api/genres')
                .send({ name })
                .set('x-auth-token', token)
        }


        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec()

            expect(res.status).toBe(401)
        })

        it('should return 400 if genre is invalid (less than 5 characters)', async () => {
            name = '1234'

            const res = await exec()

            expect(res.status).toBe(400)
        })

        it('should return 400 if genre is invalid (more than 50 characters)', async () => {
            name = 'A'.repeat(51)

            const res = await exec()

            expect(res.status).toBe(400)
        })

        it('should save the genre if it is valid.', async () => {
            await exec()

            const genre = await Genre.findOne({ name: 'genre1' })

            expect(genre).not.toBeNull()
        })

        it('should return genre if it is valid.', async () => {
            const res = await exec()

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'genre1')
        })
    })
});