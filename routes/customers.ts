import { Customer, validateCustomer } from '../models/customer';
import express from 'express';
const router = express.Router();

/////////// GET ALL

router.get('/', async (req, res) => {
    const customers = await Customer
        .find()
        .sort({ name: 1 })
    res.json(customers);
});

///////////// GET ONE

router.get('/:id', async (req, res) => {
    // Look up the customer and send the to client
    const customer = await Customer.findById(req.params.id)

    if (!customer)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(customer);
});

////////// POST

router.post('/', async (req, res) => {
    // Validate the request
    const { error } = validateCustomer(req.body);

    if (error)
        return res
            .status(400)
            .send(error.details[0].message);

    // Create customer and send to the client
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    customer = await customer.save()


    return res
        .status(201)
        .send(customer);
});

//////////// PUT

router.put('/:id', async (req, res) => {
    // Validate the request
    const { error } = validateCustomer(req.body);

    if (error)
        return res
            .status(400)
            .send(error.details[0].message);

    // Look up the customer & update & send to the client
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    )

    if (!customer)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(customer);
});

///////////// DELETE

router.delete('/:id', async (req, res) => {
    // Delete the customer and send to the client
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if (!customer)
        return res
            .status(404)
            .send('ژانر با شناسه ی داده شده پیدا نشد!');

    return res.send(customer);
});

export default router;