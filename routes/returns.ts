import express from 'express';

import * as returnRouter from '../controllers/return'
import auth from '../Middlewares/auth';
const router = express.Router()

router.post('/', auth, returnRouter.create)

export default router;
