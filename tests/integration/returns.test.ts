import request from 'supertest'
import { Server, IncomingMessage, ServerResponse } from "http";

import { Rental } from '../../models/rental';
import mongoose from 'mongoose';

describe('/api/returns', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    let customerId: any;
    let moveId: any;
    let rental: any;

    beforeEach(async () => {
        server = require('../../index')

        customerId = new mongoose.Types.ObjectId()
        moveId = new mongoose.Types.ObjectId()

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: moveId,
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
            .send({ customerId, moveId })

        expect(res.status).toBe(401)
    });
})