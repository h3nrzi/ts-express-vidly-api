import express from 'express';

import auth from '../Middlewares/auth';
import * as userController from '../controllers/user'
import validate from '../Middlewares/validateRequest';
const router = express.Router();


router.get('/me', auth, userController.getMe)
router.post('/',
    validate
    userController.create
);

export default router;
