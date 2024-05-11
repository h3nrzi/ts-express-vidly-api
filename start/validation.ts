const Joi = require('joi')

function validation() {
    Joi.objectId = require('joi-objectid')(Joi)
}

module.exports = validation