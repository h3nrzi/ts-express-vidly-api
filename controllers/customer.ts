import Joi from 'joi';

import { Customer } from '../models/customer';
import { Request, Response } from 'express'


export async function getAll(req: Request, res: Response) {
    const customers = await Customer.find().sort({ name: 1 })

    res.json(customers);
}

export async function get(req: Request, res: Response) {
    const customer = await Customer.findById(req.params.id)

    if (!customer)
        return res.status(404).send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(customer);
}

export async function create(req: Request, res: Response) {
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    customer = await customer.save()

    return res.status(201).send(customer);
}

export async function update(req: Request, res: Response) {
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    )

    if (!customer)
        return res.status(404).send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(customer);
}

export async function remove(req: Request, res: Response) {
    const customer = await Customer.findByIdAndDelete(req.params.id)

    if (!customer)
        return res.status(404).send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(customer);
}

export function validateCustomer(customer: Customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}