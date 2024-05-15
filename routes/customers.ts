import * as customerController from '../controllers/customer';
import express from 'express';

import validateRequest from '../Middlewares/validateRequest';
const router = express.Router();

router.get('/', customerController.getAll);
router.get('/:id', customerController.get);
router.post('/',
    validateRequest(customerController.validateCustomer),
    customerController.create
);
router.put('/:id',
    validateRequest(customerController.validateCustomer),
    customerController.update
);
router.delete('/:id', customerController.remove);

export default router;