import express from 'express';
import * as rentalController from '../controllers/rental'
const router = express.Router();

router.get('/', rentalController.getAll);
router.get('/:id', rentalController.get);
router.post('/', rentalController.create);

export default router