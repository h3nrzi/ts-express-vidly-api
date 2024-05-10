import express from 'express';
import bcrypt from 'bcrypt'
import * as _ from 'lodash'

import { UserDto } from '../dtos';
import { User, validateUser } from '../models/user';
import auth from '../Middlewares/auth';
const router = express.Router();


router.get('/me', auth, async (req, res) => {
    // @ts-expect-error
    const user = await User.findById(req.user._id).select('-password -__v')
    return res.json(user)
})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const { email } = req.body as UserDto

    let user = await User.findOne({ email })
    if (user)
        return res.status(400).send('کاربر قبلا ثبت نام کرده است')

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()
    return res
        .status(201)
        .header('x-auth-token', token)
        .json(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

export default router;
