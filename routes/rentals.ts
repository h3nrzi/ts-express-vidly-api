import express from 'express';

import * as rentalController from '../controllers/rental'
import validateRequest from '../Middlewares/validateRequest';
const router = express.Router();

router.get('/', rentalController.getAll);
router.get('/:id', rentalController.get);
router.post('/',
    validateRequest(rentalController.validateRental),
    rentalController.create
);

export default router