import * as customerController from '../controllers/customer';
import express from 'express';
const router = express.Router();

router.get('/', customerController.getAll);
router.get('/:id', customerController.get);
router.post('/', customerController.create);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.remove);

export default router;