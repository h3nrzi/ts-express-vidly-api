import express from 'express';

import * as movieController from '../controllers/movie'
import validateRequest from '../Middlewares/validateRequest';
const router = express.Router();

router.get('/', movieController.getAll)
router.get('/:id', movieController.get);
router.post('/',
    validateRequest(movieController.validateMovie),
    movieController.create
);
router.put('/:id',
    validateRequest(movieController.validateMovie),
    movieController.update
);
router.delete('/:id', movieController.remove);

export default router;
