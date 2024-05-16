const app = require('express')()

const logger = require('./start/logging')()
require('./start/config')(app, logger)
require('./start/validation')()
require('./start/db')(logger)
require('./start/routes')(app)

app.set('view engine', 'pug');
app.set('views', './views'); // default

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info('Listening on port ' + port));

module.exports = server