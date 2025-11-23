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

ticketingValidation.createUser = validationWrapper([
  body('fname').exists().withMessage(VALIDATION_MESSAGE.REQUIRED).bail().trim().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  body('lname').exists().withMessage(VALIDATION_MESSAGE.REQUIRED).bail().trim().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  body('mname').exists().withMessage(VALIDATION_MESSAGE.REQUIRED).bail().trim().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  body('email').exists().withMessage(VALIDATION_MESSAGE.REQUIRED).bail().trim().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  body('phone').exists().withMessage(VALIDATION_MESSAGE.REQUIRED).bail().trim().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  body('username').exists().withMessage(VALIDATION_MESSAGE.REQUIRED).bail().trim().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  body('password').exists().withMessage(VALIDATION_MESSAGE.REQUIRED).bail().trim().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
])

ticketingValidation.updateUser = validationWrapper([
  // body('fname').exists().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  // body('lname').exists().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  // body('mname').exists().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  // body('email').exists().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  // body('phone').exists().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  // body('username').exists().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
  // body('password').exists().not().isEmpty().withMessage(VALIDATION_MESSAGE.NOT_EMPTY),
])

module.exports = ticketingValidation