import express from 'express';

import * as returnRouter from '../controllers/return'
const router = express.Router()

router.post('/', returnRouter.create)

export default router;
