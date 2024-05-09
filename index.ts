import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import movieRouter from './routes/movies'
import genreRouter from './routes/genres';
import homeRouter from './routes/home';
import customerRouter from './routes/customers'
const dbLog = require('debug')('app:dbLog');
const serverLog = require('debug')('app:serverLog');
const log = require('debug')('app:log');
const app = express();

//////////// connecting to DB
mongoose
    .connect('mongodb://localhost/vidly', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => dbLog('Connected to MongoDB...'))
    .catch(() => dbLog('Could not connect to MongoDB...'));

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
app.use('/api/movies', movieRouter);
app.use('/', homeRouter);

////////// Listening on the server

const port = process.env.PORT || 3000;
app.listen(port, () => serverLog('Listening on port ' + port));



