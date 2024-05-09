import { UserDto } from '../dtos';
import Joi from 'joi';
import { Schema, model } from 'mongoose';

function validateUser(user: UserDto) {
    const schema = {
        name: Joi.string().required().min(50).max(50),
        email: Joi.string().required().min(50).max(255).email(),
        password: Joi.string().required().min(5).max(1024),
    }

    return Joi.validate(user, schema)
}

const userSchema = new Schema({
    name: {
        type: String, required: true,
        minlength: 5, maxlength: 50,
    },
    email: {
        type: String, required: true,
        unique: true,
        minlength: 5, maxlength: 255,
    },
    password: {
        type: String, required: true,
        minlength: 5, maxlength: 1024,
    }
});

const User = model('User', userSchema);

export { User, validateUser }