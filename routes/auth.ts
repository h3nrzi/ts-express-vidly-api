import express from 'express';
import Joi from 'joi';
import * as _ from 'lodash'
import bcrypt from 'bcrypt'

import { AuthDto, UserDto } from '../dtos';
import { User } from '../models/user';
const router = express.Router();

function validateUser(user: AuthDto) {
    const schema = {
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(1024),
    }

    return Joi.validate(user, schema)
}


router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const { email, password } = req.body as UserDto

    let user = await User.findOne({ email })
    if (!user)
        return res.status(400).send('ایمیل یا رمز عبور نامعتبر است.')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
        return res.status(400).send('ایمیل یا رمز عبور نامعتبر است.')

    return res.send(true);
});

export default router;
