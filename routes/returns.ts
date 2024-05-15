import express from 'express';

import * as returnRouter from '../controllers/return'
import auth from '../Middlewares/auth';
import validateRequest from '../Middlewares/validateRequest';
const router = express.Router()

router.post('/',
    auth,
    validateRequest(returnRouter.validateReturn),
    returnRouter.create
)


export default router;
