const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
export const log = require('debug')('app:log');
const app = require('express')()

require('./start/logging')
require('./start/routes')(app)
require('./start/db')()


if (!config.get('jwtPrivateKey')) {
    log("FATAL ERROR: jwtPrivateKey is not defined.")
    process.exit(1)
}

app.set('view engine', 'pug');
app.set('views', './views'); // default

const port = process.env.PORT || 3000;
app.listen(port, () => log('Listening on port ' + port));



