import { CustomerDto as Customer } from '../dtos';
import Joi from 'joi';
import { Schema, model } from 'mongoose';

function validateCustomer(customer: Customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5, maxlength: 50,
    },
});

const Customer = model('Customer', customerSchema);

export { Customer, validateCustomer }