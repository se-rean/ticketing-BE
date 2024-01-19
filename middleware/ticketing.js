const { body, param, check } = require('express-validator')
const validationWrapper = require('./validation-wrapper')
const { VALIDATION_MESSAGE } = require('./messages')

const ticketingValidation = {}

ticketingValidation.getUserById = validationWrapper([
  param('id').exists().withMessage(VALIDATION_MESSAGE.REQUIRED),
])

module.exports = ticketingValidation