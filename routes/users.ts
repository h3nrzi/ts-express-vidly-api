import { UserDto } from '../dtos';
import { User, validateUser } from '../models/user';
import express from 'express';
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const { email, name, password } = req.body as UserDto

    let user = await User.findOne({ email })
    if (user)
        return res.status(400).send('کاربر قبلا ثبت نام کرده است')

    user = new User({ name, email, password })
    await user.save()

    return res.status(201).json(user);
});

export default router;
