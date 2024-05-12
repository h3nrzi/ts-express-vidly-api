const { User } = require('../../../models/user');
import jwt from 'jsonwebtoken';
import config from 'config';
import mongoose from 'mongoose';

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        // ARRANGE
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const user = new User(payload)

        // ACTION
        const token = user.generateAuthToken()
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))

        // ASSERTION
        expect(decoded).toMatchObject(payload)
    })
});