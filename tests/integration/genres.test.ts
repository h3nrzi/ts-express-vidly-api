import request from 'supertest'
import { Server, IncomingMessage, ServerResponse } from "http";

import { Genre } from '../../models/genre';
import { User } from '../../models/user';

interface Genre {
    _id: string;
    name: string;
}

let server: Server<typeof IncomingMessage, typeof ServerResponse>;
describe('/api/genres', () => {
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
    });

    describe('POST /', () => {
        it('should return 401 if client is not logged in', async () => {
            const res = await request(server).post('/api/genres').send({ name: 'genre1' })
            expect(res.status).toBe(401)
        })

        it('should return 400 if genre is invalid (less than 5 characters)', async () => {
            const user = new User() as any
            const token = user.generateAuthToken()

            const res = await request(server)
                .post('/api/genres')
                .send({ name: '1234' })
                .set('x-auth-token', token)

            expect(res.status).toBe(400)
        })

        it('should return 400 if genre is invalid (more than 50 characters)', async () => {
            const user = new User() as any
            const token = user.generateAuthToken()

            const res = await request(server)
                .post('/api/genres')
                .send({ name: 'A'.repeat(51) })
                .set('x-auth-token', token)

            expect(res.status).toBe(400)
        })

        it('should save the genre if it is valid.', async () => {
            const user = new User() as any
            const token = user.generateAuthToken()

            await request(server)
                .post('/api/genres')
                .send({ name: 'genre1' })
                .set('x-auth-token', token)

            const genre = await Genre.findOne({ name: 'genre1' })

            expect(genre).not.toBeNull()
        })

        it('should return genre if it is valid.', async () => {
            const user = new User() as any
            const token = user.generateAuthToken()

            const res = await request(server)
                .post('/api/genres')
                .send({ name: 'genre1' })
                .set('x-auth-token', token)

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'genre1')
        })
    })
});