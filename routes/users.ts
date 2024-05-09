import bcrypt from 'bcrypt'
import * as _ from 'lodash'
import { UserDto } from '../dtos';
import { User, validateUser } from '../models/user';
import express from 'express';
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const { email } = req.body as UserDto

    let user = await User.findOne({ email })
    if (user)
        return res.status(400).send('کاربر قبلا ثبت نام کرده است')

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    return res.status(201).json(_.pick(user, ['_id', 'name', 'email']));
});

export default router;
