import { Request, Response } from 'express';
import Joi from 'joi';
import _ from 'lodash'
import bcrypt from 'bcrypt'

import { AuthDto, UserDto } from '../dtos';
import { User } from '../models/user';

function validateUser(user: AuthDto) {
    const schema = {
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(1024),
    }

    return Joi.validate(user, schema)
}

export async function login(req: Request, res: Response) {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const { email, password } = req.body as UserDto

    let user = await User.findOne({ email }) as any
    if (!user)
        return res.status(400).send('ایمیل یا رمز عبور نامعتبر است.')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
        return res.status(400).send('ایمیل یا رمز عبور نامعتبر است.')

    const token = user.generateAuthToken()
    return res.send(token);
}