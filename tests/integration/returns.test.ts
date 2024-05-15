import request from 'supertest'

import { Rental } from '../../models/rental';
import mongoose from 'mongoose';
import { User } from '../../models/user';

describe('/api/returns', () => {
    let server: any;
    let customerId: any;
    let movieId: any;
    let rental: any;

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
    })
    afterEach(async () => {
        await server.close()
        await Rental.deleteMany()
    })

    it('should return 401 if client is not logged in!', async () => {
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId, movieId })

        expect(res.status).toBe(401)
    });

    it('should return 400 if customerId is not provided', async () => {
        const user = new User() as any
        const token = await user.generateAuthToken()

        const res = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ movieId })

        expect(res.status).toBe(400)
    });

    it('should return 400 if movieId is not provided', async () => {
        const user = new User() as any
        const token = await user.generateAuthToken()

        const res = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId })

        expect(res.status).toBe(400)
    });
})