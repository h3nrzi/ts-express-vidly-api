import { User } from "../../models/user"
import request from "supertest";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Genre } from "../../models/genre";

describe('Auth middleware', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    let token: string;

    beforeEach(async () => {
        server = require('../../index')
        token = (await new User() as any).generateAuthToken()
    })

    afterEach(async () => {
        await server.close()
        await Genre.deleteMany()
    })

    function exec() {
        return request(server)
            .post('/api/genres')
            .send({ name: 'genre1' })
            .set('x-auth-token', token)
    }

    it('should return 401 if no token is provided', async () => {
        token = ''

        const res = await exec()

        expect(res.status).toBe(401)
    })

    it('should return 400 if token is invalid', async () => {
        token = 'a'

        const res = await exec()

        expect(res.status).toBe(400)
    })

    it('should return 201 if token is valid', async () => {
        const res = await exec()

        expect(res.status).toBe(201)
    })
})