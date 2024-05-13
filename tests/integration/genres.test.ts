import request from 'supertest'
import { Server, IncomingMessage, ServerResponse } from "http";
import { Genre } from '../../models/genre';

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
});