import { CustomerDto as Customer } from '../dtos';
import { Schema, model } from 'mongoose';

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

export { Customer }