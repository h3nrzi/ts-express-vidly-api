import jwt from 'jsonwebtoken'
import config from 'config'

import { Schema, model } from 'mongoose';

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
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'))
}

const User = model('User', userSchema);

export { User }