const debug = require('debug')('app:startup');
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import genreRouter from './routes/genres';
import homeRouter from './routes/home';
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
    debug('Morgan enabled...');
};


////////// Routers

app.use('/api/genres', genreRouter);
app.use('/', homeRouter);

////////// Listening on the server

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port));



