import request from 'supertest'
import { Server, IncomingMessage, ServerResponse } from "http";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;
describe('/api/genres', () => {
    beforeEach(() => server = require('../../index'))
    afterEach(() => server.close())


    describe('GET /', () => {
        it('should return all genres', async () => {
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
        })
    });
});