import express from 'express';

import auth from '../Middlewares/auth';
import * as userController from '../controllers/user'
const router = express.Router();


router.get('/me', auth, userController.getMe)
router.post('/', userController.create);

export default router;
