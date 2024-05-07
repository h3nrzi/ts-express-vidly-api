export const serverLog = require('debug')('app:serverLog');
export const log = require('debug')('app:log');
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import genreRouter from './routes/genres';
import homeRouter from './routes/home';
import customerRouter from './routes/customers'
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

////////// Middlewares 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    log('Morgan enabled...');
};


////////// Routers

app.use('/api/genres', genreRouter);
app.use('/api/customers', customerRouter);
app.use('/', homeRouter);

////////// Listening on the server

const port = process.env.PORT || 3000;
app.listen(port, () => serverLog('Listening on port ' + port));



