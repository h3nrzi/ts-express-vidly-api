import express from 'express';
import * as authController from '../controllers/auth';
import validateRequest from '../Middlewares/validateRequest';
const router = express.Router();


router.post('/',
    validateRequest(authController.validateUser),
    authController.login
);

export default router;
