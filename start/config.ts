const config = require('config')

function configuration() {
    if (!config.get('jwtPrivateKey')) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined.")
    }
}

module.exports = configuration