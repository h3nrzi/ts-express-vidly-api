import express from 'express';
const app = express();

const logger = require('./start/logging')()
require('./start/routes')(app)
require('./start/db')()
require('./start/config')()
require('./start/validation')()

app.set('view engine', 'pug');
app.set('views', './views'); // default

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info('Listening on port ' + port));

module.exports = server



