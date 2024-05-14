import { User } from '../../../models/user';
import authMiddleware from '.../../../Middlewares/auth';
import mongoose from 'mongoose';

describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const token = (new User(user) as any).generateAuthToken()
        const req: any = { header: jest.fn().mockReturnValue(token) }
        const res: any = {}
        const next = jest.fn()

        authMiddleware(req, res, next)

        expect(req.user).toMatchObject(user)
    })
})