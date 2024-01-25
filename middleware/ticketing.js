const { body, param, check } = require('express-validator')
const validationWrapper = require('./validation-wrapper')
const { VALIDATION_MESSAGE } = require('./messages')

const ticketingValidation = {}

ticketingValidation.getUserById = validationWrapper([
  param('id').exists().withMessage(VALIDATION_MESSAGE.REQUIRED),
])

ticketingValidation.createParticipants = validationWrapper([
  body("participants").exists().withMessage(VALIDATION_MESSAGE.REQUIRED)
])

ticketingValidation.createEvent = validationWrapper([
  body('performanceCode').exists().withMessage(VALIDATION_MESSAGE.REQUIRED),
  body('title').exists().withMessage(VALIDATION_MESSAGE.REQUIRED),
  body('description').exists().withMessage(VALIDATION_MESSAGE.REQUIRED),
])

ticketingValidation.createBarcode = validationWrapper([
  body('participantsIds').exists().withMessage(VALIDATION_MESSAGE.REQUIRED),
  body('performanceCode').exists().withMessage(VALIDATION_MESSAGE.REQUIRED),
  body('limit').exists().withMessage(VALIDATION_MESSAGE.REQUIRED),
])

module.exports = ticketingValidation