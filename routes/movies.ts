import express from 'express';

import * as movieController from '../controllers/movie'
const router = express.Router();

router.get('/', movieController.getAll)
router.get('/:id', movieController.get);
router.post('/', movieController.create);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.remove);

export default router;
