import { Express } from 'express';

import globalErrorHandler from '../Middlewares/globalErrorHandler';
import authRouter from '../routes/auth'
import userRouter from '../routes/users'
import rentalRouter from '../routes/rentals'
import movieRouter from '../routes/movies'
import genreRouter from '../routes/genres';
import homeRouter from '../routes/home';
import customerRouter from '../routes/customers'
import returnRouter from '../routes/returns'

function appRouter(app: Express) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/rentals', rentalRouter);
    app.use('/api/genres', genreRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/returns', returnRouter);
    app.use('/', homeRouter);
    app.use(globalErrorHandler)
};

module.exports = appRouter