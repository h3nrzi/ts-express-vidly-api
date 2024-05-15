import express from 'express';

import auth from '../Middlewares/auth';
import admin from '../Middlewares/admin';
import validateObjectId from '../Middlewares/validateObjectId';
import * as genreController from '../controllers/genre'
import validateRequest from '../Middlewares/validateRequest';
const router = express.Router();



router.get('/', genreController.getAll);
router.get('/:id',
    validateObjectId,
    genreController.get
);
router.post('/',
    auth,
    validateRequest(genreController.validateGenre),
    genreController.create
);
router.put('/:id',
    auth,
    validateObjectId,
    validateRequest(genreController.validateGenre),
    genreController.update
);
router.delete('/:id',
    auth,
    admin,
    validateObjectId,
    genreController.remove
);

export default router;