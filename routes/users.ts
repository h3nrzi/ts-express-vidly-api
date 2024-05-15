import express from 'express';

import auth from '../Middlewares/auth';
import * as userController from '../controllers/user'
import validateRequest from '../Middlewares/validateRequest';
const router = express.Router();


router.get('/me', auth, userController.getMe)
router.post('/',
    validateRequest(userController.validateUser),
    userController.create
);

export default router;
