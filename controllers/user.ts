import { Request, Response } from 'express';
import _ from 'lodash'

import { UserDto } from '../dtos';
import { User, validateUser } from '../models/user';
import bcrypt from 'bcrypt'

export async function getMe(req: Request, res: Response) {
    // @ts-expect-error
    const user = await User.findById(req.user._id).select('-password -__v')

    return res.json(user)
}

export async function create(req: Request, res: Response) {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const { email } = req.body as UserDto

    let user = await User.findOne({ email }) as any
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
}