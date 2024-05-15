import request, { Response } from 'supertest'

import { Rental } from '../../models/rental';
import mongoose from 'mongoose';
import { User } from '../../models/user';

describe('/api/returns', () => {
    let server: any;
    let customerId: any;
    let movieId: any;
    let token: any;
    let rental: any

    beforeEach(async () => {
        server = require('../../index')

        customerId = new mongoose.Types.ObjectId()
        movieId = new mongoose.Types.ObjectId()

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        })

        await rental.save();

        const user = new User() as any
        token = await user.generateAuthToken()
    })

    afterEach(async () => {
        await server.close()
        await Rental.deleteMany()
    })

    async function exec(): Promise<Response> {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ movieId, customerId })
    }

    it('should return 401 if client is not logged in!', async () => {
        token = ''

        const res = await exec()

        expect(res.status).toBe(401)
    });

    it('should return 400 if customerId is not provided', async () => {
        customerId = ''

        const res = await exec()

        expect(res.status).toBe(400)
    });

    it('should return 404 if no rental found for the customer/movie', async () => {
        await Rental.deleteMany()

        const res = await exec()

        expect(res.status).toBe(404)
    });

    it('should return 400 if rental is already processed', async () => {
        rental.dateReturned = new Date()
        await rental.save()

        const res = await exec()

        expect(res.status).toBe(400)
    });
})